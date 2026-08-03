---
inclusion: always
---

# Anti-Patterns: Critical Safety

Patterns that caused failures or would cause failures in this project. Never reintroduce.

## LLM Output Parsing [CRIT]

- NEVER rely solely on `extract_json()` regex: use JSON mode (`response_format={"type": "json_object"}`) + Pydantic validation as primary path
- NEVER skip `max_tokens` in LLM calls: silent truncation breaks JSON parsing
- NEVER assume LLM returns valid JSON without try/except + retry logic
- NEVER store raw LLM output as the analysis result: always validate through Pydantic schema

## SSE Streaming [CRIT]

- NEVER send raw LangGraph internal events to frontend: always map through domain event adapter
- NEVER close SSE stream silently on error: emit error event with context, then close
- NEVER skip heartbeat (15s interval): proxy buffering kills the connection
- NEVER forget `X-Accel-Buffering: no` + `Cache-Control: no-cache` headers on SSE responses
- NEVER use WebSocket for this: SSE is simpler, works through Fly.io/Vercel, reconnection is built-in

## MCP Tool Calls [CRIT]

- NEVER let a single tool failure crash the entire analysis: wrap each in try/except, populate `data_gaps`
- NEVER call Alpha Vantage without checking daily budget (25/day limit, save 5 for manual)
- NEVER trust external API responses without type checking: yfinance can return None for any field
- NEVER cache SEC filings with short TTL: filings don't change, cache permanently

## Frontend State [CRIT]

- NEVER manage streaming state in React local state: use Zustand store (shared across components)
- NEVER reconnect EventSource without exponential backoff
- NEVER render analysis cards before validation: wait for `analysis_complete` event
- NEVER use bare localStorage: namespace keys, handle quota errors

## Concurrency [CRIT]

- NEVER run unbounded asyncio.gather on tool calls: use semaphore (max 10 concurrent)
- NEVER block the event loop with synchronous DB calls: asyncpg is async, use it
- NEVER share MCP client across requests: create per-request (connection lifecycle)

## Security [CRIT]

- NEVER expose OPENROUTER_API_KEY, database URI, or any secret in frontend bundle or git history
- NEVER trust ticker input without validation: alphanumeric + dots only, max 10 chars
- NEVER skip rate limiting on analysis endpoint: OpenRouter free tier has hard limits
- NEVER serve the app without CORS properly configured for production domains

## Docker/Deploy [CRIT]

- NEVER use `latest` tag for base images: pin by digest for reproducibility
- NEVER run container as root: create non-root user
- NEVER include .env, .git, node_modules, or __pycache__ in Docker image
- NEVER skip healthcheck: Fly.io needs it for zero-downtime deploys
