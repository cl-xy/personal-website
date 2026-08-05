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
    timestamp: "00:00.080",
    agent: "system",
    type: "system",
    content: "Loading career_analyst_v1... 14 tools available. Running full assessment.",
    delay: 120,
  },
  {
    id: 3,
    timestamp: "00:00.412",
    agent: "career_analyst_v1",
    type: "tool_call",
    tool: "fetch_employment_history",
    args: '(target="xinyi_lu")',
    content: `→ Current: Software Engineer @ Citi (AI/ML Platform)
→ Previous: Data Scientist @ Citi (Analytics)
→ Education: NUS Business Analytics (Hons), Distinction capstone
→ Location: Singapore`,
    delay: 180,
  },
  {
    id: 4,
    timestamp: "00:01.104",
    agent: "career_analyst_v1",
    type: "tool_call",
    tool: "fetch_projects",
    args: "(deployed=true)",
    content: `Found 4 deployed systems:
  [0] AI Investment Analyst — agentic stock analysis, 3-agent debate, live
  [1] LLM Policy Retrieval Agents — production RAG at Citi, 7000 hrs/yr saved
  [2] SAS-to-PySpark Converter — LLM code migration, ~20% efficiency gain
  [3] Portfolio Decarbonization — NLP research, NUS Distinction`,
    delay: 200,
  },
  {
    id: 5,
    timestamp: "00:01.891",
    agent: "career_analyst_v1",
    type: "reasoning",
    content: "4 deployed systems. Primary signal: AI Investment Analyst. Full-stack, self-directed, live in production. Inspecting...",
    delay: 600,
  },
  {
    id: 6,
    timestamp: "00:03.447",
    agent: "career_analyst_v1",
    type: "tool_call",
    tool: "inspect_architecture",
    args: '("ai-investment-analyst")',
    content: `Architecture:
  • Orchestration: LangGraph StateGraph, astream_events v2
  • Agents: 3-agent debate (bull, bear, moderator)
  • Tools: 4x FastMCP servers (market data, news, portfolio, SEC)
  • Streaming: SSE + 15s heartbeat through proxy layers
  • Backend: FastAPI + asyncpg + Docker on Fly.io
  • Frontend: React + Zustand + Recharts on Vercel
  • Cache: PostgreSQL stale-while-revalidate`,
    delay: 150,
  },
  {
    id: 7,
    timestamp: "00:04.221",
    agent: "career_analyst_v1",
    type: "tool_call",
    tool: "fetch_incident_log",
    args: '("ai-investment-analyst")',
    content: `4 incidents documented:
  [CRIT] SSE dropping silently — proxy buffering, flush only on disconnect
    fix: 15s heartbeat pings. Keepalive louder than buffer timeout.
  [HIGH] yfinance returning None for any field, no error raised
    fix: Explicit None checks on every field, data_gaps array in report.
  [MED] OpenRouter 429s cascading through 3-tool chains
    fix: Per-ticker Postgres cache, stale-while-revalidate.
  [LOW] LangGraph premature for v1 sequential pipeline
    fix: Kept it. Paid off adding debate step. Premature abstraction exception.`,
    delay: 250,
  },
  {
    id: 8,
    timestamp: "00:05.701",
    agent: "career_analyst_v1",
    type: "tool_call",
    tool: "fetch_production_metrics",
    args: "()",
    content: `Production impact:
  • 7,000 hours/year eliminated (Citi policy agents)
  • 4 systems live in production
  • 3-agent debate architecture running
  • ~20% efficiency gain on legacy code migration`,
    delay: 150,
  },
  {
    id: 9,
    timestamp: "00:06.337",
    agent: "career_analyst_v1",
    type: "tool_call",
    tool: "analyze_technical_depth",
    args: "()",
    content: `Stack:
  AI/ML: LangGraph, LangChain, FastMCP, RAG, TruLens, NLP, scikit-learn
  Backend: FastAPI, Python, asyncpg, PostgreSQL, Docker, Fly.io
  Frontend: React, TypeScript, Zustand, Tailwind, Vite, Vercel
  Infra: SSE streaming, Neon Postgres, CI/CD, OpenRouter
  Methods: Agentic architectures, structured output, eval frameworks`,
    delay: 200,
  },
  {
    id: 10,
    timestamp: "00:07.501",
    agent: "career_analyst_v1",
    type: "reasoning",
    content: "Cross-referencing incidents... Each has root cause identified, fix shipped, lesson extracted. Not patching symptoms. Systematic debugger.",
    delay: 800,
  },
  {
    id: 11,
    timestamp: "00:09.104",
    agent: "career_analyst_v1",
    type: "tool_call",
    tool: "fetch_education",
    args: "()",
    content: `NUS Business Analytics (Honours)
  • Capstone: AI Portfolio Decarbonization — Distinction
  • Path: Data Science → Software Engineering → AI Engineering`,
    delay: 150,
  },
  {
    id: 12,
    timestamp: "00:09.801",
    agent: "career_analyst_v1",
    type: "tool_call",
    tool: "assess_culture_signals",
    args: "()",
    content: `• Hikes regularly (Singapore, SEA trails)
  • Yoga practitioner
  • Volunteers: youth and elderly programs
  • "learns quickly, gets curious easily"
  • Publishes failure logs alongside shipped work`,
    delay: 200,
  },
  {
    id: "12b",
    timestamp: "00:10.102",
    agent: "career_analyst_v1",
    type: "evidence",
    tool: "fetch_human_context",
    args: "(non_work=true)",
    content: "Verifying non-work signals. Attached evidence:",
    images: [
      { src: "gallery/img4.jpg", caption: "community event: Singapore", meta: "social_signal" },
      { src: "gallery/img3.jpg", caption: "off-grid mode: Grand Canyon, AZ", meta: "recharge_cycle" },
      { src: "gallery/img2.jpg", caption: "outdoor operating environment", meta: "default_state" },
    ],
    delay: 300,
  },
  {
    id: 13,
    timestamp: "00:10.558",
    agent: "career_analyst_v1",
    type: "result",
    content: "Assessment complete. Compiling recommendation...",
    delay: 1200,
  },
  {
    id: 14,
    timestamp: "00:12.223",
    agent: "career_analyst_v1",
    type: "recommendation",
    highlight: true,
    content: `▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

  RECOMMENDATION: STRONG HIRE

  Role fit: AI Engineer / MLE / Applied AI
  Confidence: HIGH

  Evidence:
  • Ships production systems end-to-end (not prototypes)
  • Documents failures openly — engineering maturity signal
  • Systematic debugging: root cause → fix → lesson
  • Full-stack: infrastructure through frontend
  • Growth: data science → SWE → AI engineering

  This candidate builds and ships. The failure logs alone
  put her above 90% of portfolios I've analyzed.

▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓`,
    delay: 400,
  },
  {
    id: 15,
    timestamp: "00:13.801",
    agent: "system",
    type: "system",
    content: "Analysis complete. 11 tools called. Type a command or explore.",
    delay: 200,
  },
];
