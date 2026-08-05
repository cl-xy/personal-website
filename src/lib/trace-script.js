export const traceSteps = [
  {
    id: 1,
    timestamp: "00:00.000",
    agent: "system",
    type: "system",
    content: "TARGET ACQUIRED: xinyi_lu",
    delay: 0,
  },
  {
    id: 2,
    timestamp: "00:00.064",
    agent: "system",
    type: "system",
    content: "Initializing career_analyst_v1... 14 tools loaded. Beginning full-spectrum assessment.",
    delay: 80,
  },
  {
    id: 3,
    timestamp: "00:00.391",
    agent: "career_analyst_v1",
    type: "tool_call",
    tool: "fetch_employment_history",
    args: '(target="xinyi_lu")',
    content: `→ Current: Software Engineer @ Citi (AI/ML Platform team)
→ Previous: Data Scientist @ Citi (Analytics)
→ Education: NUS Business Analytics (Hons), Distinction capstone
→ Location: Singapore
→ Trajectory: analyst → data scientist → software engineer (2 yrs)`,
    delay: 160,
  },
  {
    id: 4,
    timestamp: "00:00.922",
    agent: "career_analyst_v1",
    type: "reasoning",
    content: "Two promotions in two years at the same firm. Stayed to compound context, not because she was stuck. Interesting. Let me see what she builds outside the day job.",
    delay: 700,
  },
  {
    id: 5,
    timestamp: "00:02.104",
    agent: "career_analyst_v1",
    type: "tool_call",
    tool: "fetch_projects",
    args: "(filter=deployed, include_dead=true)",
    content: `Found 4 deployed systems:
  [0] AI Investment Analyst .. multi-agent stock analysis, live in prod
  [1] LLM Policy Retrieval Agents .. production RAG at Citi, 7000 hrs/yr saved
  [2] SAS-to-PySpark Converter .. LLM-powered code migration, ~20% efficiency gain
  [3] Portfolio Decarbonization .. NLP research, NUS Distinction

Dead projects: 0. Everything she started shipped.`,
    delay: 220,
  },
  {
    id: 6,
    timestamp: "00:02.891",
    agent: "career_analyst_v1",
    type: "reasoning",
    content: "Zero dead projects. That's unusual. Most builders have a graveyard. Either she only starts things she'll finish, or she has uncommonly high follow-through. Both are good signals. The AI Investment Analyst is the crown jewel here. Self-directed, full-stack, deployed. Drilling in.",
    delay: 900,
  },
  {
    id: 7,
    timestamp: "00:04.447",
    agent: "career_analyst_v1",
    type: "tool_call",
    tool: "inspect_architecture",
    args: '("ai-investment-analyst", depth=full)',
    content: `Architecture (non-trivial):
  • Orchestration: LangGraph StateGraph, astream_events v2
  • Core: 3-agent debate system (bull analyst, bear analyst, moderator)
  • Tool layer: 4x FastMCP servers (market data, news, portfolio, SEC filings)
  • Streaming: SSE with 15s heartbeat, survives proxy buffering
  • Backend: FastAPI + asyncpg + Docker on Fly.io
  • Frontend: React 19 + Zustand + Recharts on Vercel
  • Cache: PostgreSQL stale-while-revalidate (no Redis, no extra infra)
  • Auth: demo gate with env-based secrets

Note: This is not a wrapper around an API. This is a system.`,
    delay: 180,
  },
  {
    id: 8,
    timestamp: "00:05.221",
    agent: "career_analyst_v1",
    type: "tool_call",
    tool: "fetch_incident_log",
    args: '("ai-investment-analyst")',
    content: `4 production incidents documented (voluntarily, publicly):

  [CRIT] SSE connections dropping silently after 30s
    root cause: Vercel proxy buffering responses, flushing only on close
    fix: 15s heartbeat pings. Made keepalive louder than the buffer timeout.

  [HIGH] yfinance returning None for any field without raising
    root cause: Library swallows errors on partial data
    fix: Defensive None checks on every field, data_gaps array in final report

  [MED] OpenRouter 429s cascading through 3-agent chains
    root cause: No caching, every debate re-fetches identical market data
    fix: Per-ticker Postgres cache with stale-while-revalidate

  [LOW] "LangGraph is premature for a sequential pipeline"
    root cause: Self-identified over-engineering for v1
    fix: Kept it anyway. Paid off when she added the debate step later.
    lesson: "Premature abstraction exception: acceptable when you know the roadmap"`,
    delay: 280,
  },
  {
    id: 9,
    timestamp: "00:06.337",
    agent: "career_analyst_v1",
    type: "reasoning",
    content: "She publishes her failures. That last incident is remarkable. Most engineers hide premature abstractions or rip them out. She documented the bet, then proved it right. That's someone who thinks in systems, not tickets.",
    delay: 1000,
  },
  {
    id: 10,
    timestamp: "00:08.104",
    agent: "career_analyst_v1",
    type: "tool_call",
    tool: "quantify_impact",
    args: "(scope=all_projects)",
    content: `Measurable production impact:
  • 7,000 hours/year eliminated (Citi policy retrieval agents)
  • 4 systems shipped to production, 0 abandoned
  • Multi-agent debate running live (not a demo, not a notebook)
  • ~20% efficiency gain on legacy SAS-to-PySpark migration
  • Built infra to survive: rate limits, proxy buffering, flaky APIs`,
    delay: 160,
  },
  {
    id: 11,
    timestamp: "00:08.801",
    agent: "career_analyst_v1",
    type: "tool_call",
    tool: "analyze_technical_range",
    args: "()",
    content: `Operates across the full stack:
  AI/ML: LangGraph, LangChain, FastMCP, RAG, TruLens, NLP, scikit-learn
  Backend: FastAPI, Python, asyncpg, PostgreSQL, Docker, Fly.io
  Frontend: React, TypeScript, Zustand, Tailwind, Vite, Vercel
  Infra: SSE streaming, Neon Postgres, CI/CD pipelines, OpenRouter
  Methods: Agentic architectures, structured LLM output, eval frameworks

Note: Not a "full-stack" who can do both poorly.
She chose Zustand over Redux. PostgreSQL over Redis.
Minimal tooling, maximum leverage. Good taste.`,
    delay: 200,
  },
  {
    id: 12,
    timestamp: "00:09.501",
    agent: "career_analyst_v1",
    type: "tool_call",
    tool: "fetch_education",
    args: "()",
    content: `NUS Business Analytics (Honours)
  • Capstone: AI Portfolio Decarbonization, awarded Distinction
  • Career path: Data Science → Software Engineering → AI Engineering
  • Each transition self-initiated, not lateral moves forced by reorgs`,
    delay: 140,
  },
  {
    id: 13,
    timestamp: "00:10.001",
    agent: "career_analyst_v1",
    type: "tool_call",
    tool: "assess_culture_signals",
    args: "(include_soft_evidence=true)",
    content: `Non-technical signals:
  • Hikes regularly across SEA (not "I like nature" on a resume, actual trails)
  • Yoga practitioner
  • Volunteers with youth and elderly community programs
  • Self-described: "learns quickly, gets curious easily"
  • Publishes incident logs alongside shipped work (ego-free documentation)`,
    delay: 180,
  },
  {
    id: "13b",
    timestamp: "00:10.502",
    agent: "career_analyst_v1",
    type: "evidence",
    tool: "fetch_human_context",
    args: "(non_work=true)",
    content: "Verifying non-work signals. Attached evidence:",
    images: [
      { src: "/gallery/img4.jpg", caption: "community event: Singapore", meta: "social_signal" },
      { src: "/gallery/img3.jpg", caption: "off-grid mode: Grand Canyon, AZ", meta: "recharge_cycle" },
      { src: "/gallery/img2.jpg", caption: "outdoor operating environment", meta: "default_state" },
    ],
    delay: 300,
  },
  {
    id: 14,
    timestamp: "00:11.201",
    agent: "career_analyst_v1",
    type: "reasoning",
    content: "Pattern clear. This is someone who builds real systems, documents what went wrong, and does it again better. The portfolio isn't a collection of tutorials repackaged. Every project solves a problem she actually had. Compiling final assessment.",
    delay: 1400,
  },
  {
    id: 15,
    timestamp: "00:13.401",
    agent: "career_analyst_v1",
    type: "recommendation",
    highlight: true,
    content: `▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

  RECOMMENDATION: STRONG HIRE

  Role fit: AI Engineer / ML Engineer / Applied AI
  Confidence: 0.94

  Why:
  • Ships production systems end-to-end, not prototypes
  • Zero abandoned projects. Uncommon completion rate.
  • Documents failures publicly. Most engineers won't.
  • Systematic debugger: root cause, fix, lesson, every time
  • Full-stack with opinions (Zustand > Redux, Postgres > Redis)
  • Self-directed growth: data science → SWE → AI engineering

  Differentiator:
  The incident logs. Publishing what broke, why, and how you
  fixed it signals more engineering maturity than any clean
  portfolio ever could. This is how senior engineers think.
  Most candidates show you the highlight reel.
  She shows you the whole game.

▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓`,
    delay: 500,
  },
  {
    id: 16,
    timestamp: "00:14.801",
    agent: "system",
    type: "system",
    content: "Assessment complete. 11 tools called, 4 reasoning cycles. Confidence threshold exceeded.",
    delay: 200,
  },
];
