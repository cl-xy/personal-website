---
inclusion: always
---

# Technology Stack

## Backend

Python 3.11+, FastAPI, Uvicorn ASGI. Key libs: langgraph, langchain, langchain-openai, fastmcp, yfinance, feedparser, newsapi-python, asyncpg (Postgres async), aiosqlite, pydantic, pydantic-settings, httpx, tenacity, slowapi.

Testing: pytest + pytest-asyncio + pytest-mock. Fixtures: golden ticker responses for deterministic eval.

## Frontend

React 19 + TypeScript, Vite 8, Tailwind 3, Recharts, Zustand (streaming state), Lucide React (icons), react-router-dom v7. No MUI, custom components with CSS custom properties.

Testing: vitest + @testing-library/react + msw + playwright (e2e). Lint: oxlint.

## Data Stores

- PostgreSQL (asyncpg): analyses, ticker_analyses, predictions, cache, budget, runs tables
- SQLite: portfolio positions (`data/portfolio.db`), LangGraph checkpoints (`data/checkpointer.db`)

## LLM

- Provider: OpenRouter (OpenAI-compatible API at `https://openrouter.ai/api/v1`)
- Router model: `openai/gpt-oss-20b:free` (fast, intent classification)
- Analysis model: `nvidia/nemotron-3-super-120b-a12b:free` (deep reasoning, structured output)
- JSON mode: `response_format={"type": "json_object"}`
- Accessed via `langchain-openai` ChatOpenAI with custom base_url

## External APIs

| Provider | Use | Rate Limit | Fallback |
|----------|-----|------------|----------|
| yfinance | Quotes, fundamentals, indicators | Unlimited (scraping) | None needed |
| Alpha Vantage | Premium data (unused currently) | 20/day free (budget: 20) | Skip if budget exceeded |
| NewsAPI | Ticker news | 100/day free (dev) | RSS feeds |
| SEC EDGAR | 10-K/10-Q filings | 10 req/sec | Cache permanently |
| OpenRouter | LLM inference | 20 req/min free | Retry with backoff |

## Dev Environment

```bash
# Backend
cd backend && pip install -e ".[dev]"
uvicorn src.api.main:app --reload --port 8000

# Frontend
cd frontend && npm install && npm run dev

# Docker (full stack)
docker compose up

# Tests
cd backend && pytest
cd frontend && npm run lint
```

## Configuration

Backend: `src/config.py` (pydantic-settings, loads `.env`). All secrets via env vars.
Frontend: Vite proxy `/api` -> `http://localhost:8000` in dev. Production: `VITE_API_URL` set to Fly.io backend (direct cross-origin).

## Key Env Vars

```
OPENROUTER_API_KEY        LLM provider (required)
DATABASE_URL              PostgreSQL connection string
NEWS_API_KEY              NewsAPI.org key
ALPHA_VANTAGE_API_KEY     Alpha Vantage key (optional)
DEMO_PASSWORD             Demo auth gate (production)
```
