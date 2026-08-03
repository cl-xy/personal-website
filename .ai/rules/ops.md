---
inclusion: always
---

# Operations Quick Reference

## Live URLs

- Website: https://xinyi-lu-website.vercel.app
- GitHub: https://github.com/cl-xy/personal-website

## AI Investment Analyst (featured project)

- Frontend: https://ai-investment-analyst-iota.vercel.app
- Backend: https://ai-investment-analyst.fly.dev
- Health: https://ai-investment-analyst.fly.dev/api/health

## Deploy

- Backend: `cd backend && fly deploy` (builds remotely, sin region, shared-cpu-1x)
- Frontend: auto-deploys on push to main via Vercel (root dir = `frontend/`)
- CI: `.github/workflows/deploy.yml` runs both on push to main

## Proxy Architecture

- `VITE_API_URL` is set in Vercel dashboard to `https://ai-investment-analyst.fly.dev`
- Frontend calls Fly.io backend directly cross-origin (no Vercel proxy in path)
- `VITE_DEMO_PASSWORD` is set in Vercel dashboard (build-time)
- `frontend/vercel.json` rewrite rules are vestigial (unused in production)
- SSE streaming goes direct to Fly.io, no intermediate proxy timeout concern

## Fly.io

- App: `ai-investment-analyst` (2 machines, auto-stop/start)
- Config: `backend/fly.toml`
- Secrets: OPENROUTER_API_KEY, DATABASE_URL, NEWS_API_KEY, DEMO_PASSWORD, FRONTEND_URL
- Manage: `fly secrets set/list --app ai-investment-analyst`
- Logs: `fly logs --app ai-investment-analyst`

## Key Constraints

- OpenRouter free tier: 20 req/min, reasoning models take 30-40s per call
- Debate step = 3 sequential LLM calls (bull, bear, moderator), total ~90-120s
- SSE heartbeat at 15s keeps connection alive through long LLM calls
- EventSource reconnection starts a NEW analysis (no resume), wastes rate limit
