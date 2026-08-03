export const traceSteps = [
  {
    id: 1,
    timestamp: "00:00.000",
    agent: "system",
    type: "system",
    content: "Initializing career_analyst_v1...",
    delay: 0,
  },
  {
    id: 2,
    timestamp: "00:00.142",
    agent: "career_analyst_v1",
    type: "reasoning",
    content: "Parsing target profile: xinyi_lu. Cross-referencing employment history, deployed systems, incident logs.",
    delay: 300,
  },
  {
    id: 3,
    timestamp: "00:01.208",
    agent: "career_analyst_v1",
    type: "tool_call",
    tool: "fetch_employment_history",
    args: '(target="xinyi_lu")',
    content: `→ Current: Software Engineer @ Citi (AI/ML Platform)
→ Previous: Data Scientist @ Citi (Analytics)
→ Education: NUS Business Analytics (Hons), Distinction capstone
→ Location: Singapore`,
    delay: 400,
  },
  {
    id: 4,
    timestamp: "00:02.891",
    agent: "career_analyst_v1",
    type: "tool_call",
    tool: "fetch_projects",
    args: "(deployed=true)",
    content: `Found 4 deployed systems:
  [0] AI Investment Analyst — agentic stock analysis, 3-agent debate
  [1] LLM Policy Retrieval Agents — production RAG at Citi, 7000 hrs/yr saved
  [2] SAS-to-PySpark Converter — LLM-powered legacy code migration
  [3] Portfolio Decarbonization — NLP research on climate finance`,
    delay: 350,
  },
  {
    id: 5,
    timestamp: "00:04.103",
    agent: "career_analyst_v1",
    type: "reasoning",
    content: "Primary signal: AI Investment Analyst. Full-stack, self-directed, deployed. Inspecting architecture depth...",
    delay: 300,
  },
  {
    id: 6,
    timestamp: "00:05.447",
    agent: "career_analyst_v1",
    type: "tool_call",
    tool: "inspect_architecture",
    args: '("ai-investment-analyst")',
    content: `Architecture breakdown:
  • Orchestration: LangGraph StateGraph with astream_events v2
  • Agents: 3-agent debate (bull analyst, bear analyst, moderator)
  • Tool servers: 4x FastMCP (market data, news, portfolio, SEC filings)
  • Streaming: SSE with 15s heartbeat keep-alive through proxy layers
  • Backend: FastAPI + asyncpg (Postgres) + Docker on Fly.io
  • Frontend: React + Zustand + Recharts on Vercel
  • Caching: PostgreSQL stale-while-revalidate (no Redis)`,
    delay: 400,
  },
  {
    id: 7,
    timestamp: "00:07.221",
    agent: "career_analyst_v1",
    type: "tool_call",
    tool: "fetch_incident_log",
    args: '("ai-investment-analyst")',
    content: `4 documented incidents:
  [CRIT] SSE connections dropping silently — proxy buffering payloads, flushing only on disconnect
    → Fix: 15s heartbeat pings. Keepalive louder than buffer timeout.
  [HIGH] yfinance returning None for any field, silently
    → Fix: Explicit None checks on every field, data_gaps array surfaced in report.
  [MED] OpenRouter 20 req/min rate limits causing cascading 429s
    → Fix: Aggressive per-ticker Postgres caching with stale-while-revalidate.
  [LOW] LangGraph overkill for v1 sequential pipeline
    → Fix: Kept it. Paid off when adding bull/bear/moderator debate step.`,
    delay: 450,
  },
  {
    id: 8,
    timestamp: "00:09.084",
    agent: "career_analyst_v1",
    type: "result",
    content: "Engineering judgment: strong. Identifies root causes before patching. Ships through infrastructure constraints. Documents failures openly rather than hiding them.",
    delay: 350,
  },
  {
    id: 9,
    timestamp: "00:10.337",
    agent: "career_analyst_v1",
    type: "tool_call",
    tool: "fetch_production_metrics",
    args: "()",
    content: `Verified production impact:
  • 7,000 hours/year manual effort eliminated (Citi policy agents)
  • 4 systems deployed to production
  • 3-agent debate architecture shipping live
  • ~20% efficiency gain on SAS-to-PySpark migration workflows`,
    delay: 350,
  },
  {
    id: 10,
    timestamp: "00:11.892",
    agent: "career_analyst_v1",
    type: "tool_call",
    tool: "analyze_technical_depth",
    args: "()",
    content: `Stack coverage:
  AI/ML: LangGraph, LangChain, FastMCP, RAG, TruLens, NLP, scikit-learn
  Backend: FastAPI, Python, asyncpg, PostgreSQL, Docker, Fly.io
  Frontend: React, TypeScript, Zustand, Tailwind, Vite, Vercel
  Infra: SSE streaming, Neon Postgres, CI/CD, OpenRouter
  Methods: Agentic architectures, structured output, eval frameworks`,
    delay: 300,
  },
  {
    id: 11,
    timestamp: "00:13.104",
    agent: "career_analyst_v1",
    type: "reasoning",
    content: "Cross-referencing incident patterns... Evidence of systematic debugging: each failure has root cause identified, fix implemented, and lesson extracted. Not patching symptoms.",
    delay: 350,
  },
  {
    id: 12,
    timestamp: "00:14.558",
    agent: "career_analyst_v1",
    type: "tool_call",
    tool: "fetch_education",
    args: "()",
    content: `National University of Singapore (NUS)
  • Bachelor of Science, Business Analytics (Honours)
  • Capstone: AI Portfolio Decarbonization Analysis — Distinction
  • Transition: Data Science → Software Engineering → AI Engineering`,
    delay: 300,
  },
  {
    id: 13,
    timestamp: "00:15.801",
    agent: "career_analyst_v1",
    type: "tool_call",
    tool: "assess_culture_fit",
    args: "()",
    content: `Signals:
  • Hikes regularly (Singapore, SEA)
  • Practices yoga
  • Volunteers with youth and elderly programs
  • Self-described: "learns quickly, gets curious easily"
  • Publishes failure logs alongside shipped work`,
    delay: 300,
  },
  {
    id: 14,
    timestamp: "00:17.223",
    agent: "career_analyst_v1",
    type: "result",
    highlight: true,
    content: `RECOMMENDATION: Strong hire for AI Engineer / MLE roles.

Evidence:
  • Ships production systems end-to-end (not just prototypes)
  • Documents failures openly — sign of engineering maturity
  • Debugs systematically: root cause → fix → lesson pattern
  • Full-stack capability: infra to frontend
  • Growth trajectory: data science → software eng → AI engineering

Confidence: HIGH. Evidence-based builder with production instincts.`,
    delay: 400,
  },
  {
    id: 15,
    timestamp: "00:18.001",
    agent: "system",
    type: "system",
    content: "Analysis complete. 14 tools called, 0 failures. Awaiting queries.",
    delay: 300,
  },
];
