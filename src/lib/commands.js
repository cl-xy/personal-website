export const commands = {
  help: {
    output: `Available commands:
  projects     — deployed systems and what they do
  stack        — full technical stack
  experience   — employment history
  failures     — what broke and how it got fixed
  hire         — the hiring recommendation
  contact      — how to reach xinyi
  resume       — download/view resume
  education    — academic background
  about        — personal interests
  clear        — replay the trace
  help         — this message`,
  },
  projects: {
    output: `Deployed systems:

  [1] AI Investment Analyst
      Agentic stock analysis with 3-agent debate (bull/bear/moderator).
      LangGraph + FastMCP + SSE streaming. Live at ai-investment-analyst-iota.vercel.app

  [2] LLM Policy Retrieval Agents
      Production RAG system at Citi. 7,000 hours/year of manual effort eliminated.
      Python + LangChain + FastAPI + PostgreSQL.

  [3] SAS-to-PySpark Code Converter
      LLM-powered legacy code migration. ~20% efficiency improvement.
      React frontend + Python/FastAPI backend.

  [4] Portfolio Decarbonization Analysis
      NLP research on climate finance disclosures across Asian institutions.
      NUS capstone, earned Distinction.`,
  },
  stack: {
    output: `Technical stack:

  AI/ML        LangGraph, LangChain, FastMCP, RAG, TruLens, NLP, scikit-learn
  Backend      FastAPI, Python, Java/Spring Boot, asyncpg, PostgreSQL, Docker
  Frontend     React, TypeScript, Zustand, Tailwind, Vite, Recharts
  Infra        Fly.io, Vercel, Neon Postgres, SSE streaming, CI/CD
  Methods      Agentic architectures, structured output, eval frameworks
  Tools        Git, Docker, pytest, vitest, ruff, oxlint`,
  },
  tech: {
    alias: "stack",
  },
  experience: {
    output: `Employment history:

  Current    Software Engineer @ Citi (AI/ML Platform)
             Java/Spring Boot for trade systems, Python/FastAPI for AI services,
             React for interfaces. Shipping LLM agents to production.

  Previous   Data Scientist @ Citi (Analytics)
             Dashboards, regressions, SQL, statistical modeling.
             Built first LLM agent here. Decided to go deeper.`,
  },
  failures: {
    output: `What broke (selected incidents):

  [SSE Silent Drop] Connections dying after 30s through corporate proxies.
    Root cause: Proxy buffering small payloads, flushing only on disconnect.
    Fix: 15-second heartbeat pings louder than the buffer timeout.

  [Silent None] yfinance returning None for any field without raising.
    Root cause: Library swallows API failures, returns None silently.
    Fix: Explicit None checks on every field, data_gaps array in output.

  [Cascade 429] OpenRouter rate limits killing multi-step analysis chains.
    Root cause: 20 req/min limit hit on 3rd tool call, no retry logic.
    Fix: Per-ticker Postgres caching with stale-while-revalidate.

  [RAG Lies] Eval metrics (0.9+ faithfulness) disagreed with user satisfaction.
    Root cause: Measuring retrieval quality, not task completion.
    Fix: Added "did the user stop searching?" as primary metric.

  All incidents documented with: symptom → root cause → fix → lesson.`,
  },
  "what broke": {
    alias: "failures",
  },
  hire: {
    output: `RECOMMENDATION: Strong hire for AI Engineer / MLE roles.

  • Ships production systems end-to-end (not just prototypes)
  • Documents failures openly — engineering maturity signal
  • Debugs systematically: root cause → fix → lesson
  • Full-stack: infrastructure to frontend
  • Growth trajectory: data science → software eng → AI engineering

  Confidence: HIGH.

  Contact: xinyilu2000@gmail.com | linkedin.com/in/xinyi-lu-35b72917a`,
  },
  recommendation: {
    alias: "hire",
  },
  contact: {
    output: `Contact:

  Email      xinyilu2000@gmail.com
  LinkedIn   linkedin.com/in/xinyi-lu-35b72917a
  GitHub     github.com/cl-xy

  She responds faster to architecture questions than compliments.`,
  },
  resume: {
    output: `I prefer you see the trace. But if you insist:

  GitHub    github.com/cl-xy
  LinkedIn  linkedin.com/in/xinyi-lu-35b72917a
  Email     xinyilu2000@gmail.com

  The trace IS the resume. Every tool call is a verified claim.`,
  },
  education: {
    output: `Education:

  National University of Singapore (NUS)
  Bachelor of Science, Business Analytics (Honours)

  Capstone: AI Portfolio Decarbonization Analysis
  Grade: Distinction

  Path: Data Science → Software Engineering → AI Engineering`,
  },
  about: {
    output: `About xinyi_lu:

  Started in data science (dashboards, regressions, SQL). Built first LLM agent,
  decided to go deeper into the systems that make AI work in production.

  Now at Citi as a software engineer across the stack: Java/Spring Boot for trade
  systems, Python/FastAPI for AI services, React for interfaces.

  Outside work: hikes (Singapore, SEA), yoga, volunteers with youth and elderly.
  Learns quickly. Gets curious easily. Cares about building things that matter.`,
  },
  "who built this": {
    output: `An agent, obviously.

  (The site is the portfolio. You're looking at it.)`,
  },
  "who made this": {
    alias: "who built this",
  },
  clear: {
    action: "clear",
  },
};

export function getCommandResponse(input) {
  const normalized = input.trim().toLowerCase();

  if (!normalized) return null;

  // Direct match
  if (commands[normalized]) {
    const cmd = commands[normalized];
    if (cmd.alias) {
      return commands[cmd.alias];
    }
    return cmd;
  }

  // Partial matches
  const partials = {
    proj: "projects",
    tech: "stack",
    fail: "failures",
    broke: "failures",
    bug: "failures",
    incident: "failures",
    rec: "hire",
    hiring: "hire",
    email: "contact",
    linkedin: "contact",
    github: "contact",
    edu: "education",
    school: "education",
    uni: "education",
    nus: "education",
    bio: "about",
    personal: "about",
    cv: "resume",
  };

  for (const [partial, cmd] of Object.entries(partials)) {
    if (normalized.includes(partial)) {
      const resolved = commands[cmd];
      if (resolved.alias) return commands[resolved.alias];
      return resolved;
    }
  }

  return {
    output: `Command not found: "${normalized}". Type 'help' for available queries.`,
  };
}
