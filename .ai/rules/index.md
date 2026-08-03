---
inclusion: always
---

# Manual Reference Files

Load before relevant tasks. Use `read` on the path.

## Always-Loaded (every session, ~4k tokens total)

| File | Purpose |
|------|---------|
| `.ai/rules/core.md` | Authorship, architecture decisions, coding standards, quality gates |
| `.ai/rules/anti-patterns.md` | Critical safety: LLM parsing, SSE, MCP tools, state, concurrency, security |
| `.ai/rules/tech.md` | Stack versions, data stores, external APIs, dev commands, env vars |
| `.ai/rules/ops.md` | Live URLs, deploy commands, proxy architecture, Fly/Vercel config |
| `.ai/rules/index.md` | This file - manual file index with load triggers |

## Manual (load on demand)

| File | Load when... |
|------|-------------|
| `.ai/manual/streaming.md` | SSE endpoint, event schema, EventSource, trace UI |
| `.ai/manual/structured-output.md` | Pydantic schemas, JSON mode, citation model, validation |
| `.ai/manual/caching.md` | Cache layer, TTLs, stale-while-revalidate, budget guards |
| `.ai/manual/frontend.md` | Zustand store, design tokens, component patterns, theme |
| `.ai/manual/deployment.md` | Docker, Fly.io, Vercel, Neon, CI/CD |
| `.ai/manual/evaluation.md` | Golden test set, eval metrics, LLM-as-judge, CI integration |
| `.ai/manual/debugging-workflow.md` | Diagnosing failures, tracing issues, reproducing bugs, verbose logging |
| `.ai/manual/auth-boundaries.md` | Authentication, authorization, endpoint protection, trust model |

## Commands

| Trigger | Action |
|---------|--------|
| `raa` / "run all audits" | Read `~/.ai/reference/audit-protocols.md` → full audit sweep |
| `bugfix` / "find bugs" | Read `~/.ai/manual/bugfix.md` → 16-phase bug protocol |
| `brainstorm` / "ask the panel" | Read `~/.ai/manual/brainstorm.md` → multi-model panel query |
