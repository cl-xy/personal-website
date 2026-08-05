export const candidate = {
  name: "Xinyi Lu",
  role: "AI Engineer",
  location: "Singapore",
  education: "NUS Business Analytics (Honours), Distinction Capstone",
  current: "Software Engineer @ Citi (AI/ML Platform)",
  email: "xinyilu2000@gmail.com",
  linkedin: "https://www.linkedin.com/in/xinyi-lu-35b72917a/",
  github: "https://github.com/cl-xy",
  caseNumber: "CASE-2026-XL-0087",
  filedDate: "2026-08-05",
  classification: "UNRESTRICTED",
};

export const signals = [
  { id: "impact", label: "Impact", icon: "TrendingUp", count: 4, exhibitPrefix: "A", strength: 4 },
  { id: "technical", label: "Technical Depth", icon: "Code", count: 4, exhibitPrefix: "B", strength: 3 },
  { id: "resilience", label: "Failures & Fixes", icon: "AlertTriangle", count: 7, exhibitPrefix: "C", strength: 4 },
  { id: "culture", label: "Culture Fit", icon: "Heart", count: 3, exhibitPrefix: "D", strength: 2 },
];

export const evidence = [
  // Impact cards
  { id: 1, signal: "impact", exhibit: "A-1", title: "7,000 hours/year eliminated", body: "Built LLM policy retrieval agents at Citi replacing manual search across thousands of documents. Deployed to compliance and operations teams.", project: "LLM Policy Retrieval Agents", verified: true },
  { id: 2, signal: "impact", exhibit: "A-2", title: "4 production AI systems shipped", body: "From prototype to deployment: agentic stock analysis, enterprise RAG, code migration tooling, and NLP research. Each with measurable outcomes.", project: "Multiple", verified: true },
  { id: 3, signal: "impact", exhibit: "A-3", title: "3-agent debate architecture live", body: "AI Investment Analyst uses bull/bear/moderator agents via LangGraph StateGraph. Real-time SSE streaming with observable reasoning.", project: "AI Investment Analyst", verified: true, link: "https://ai-investment-analyst-iota.vercel.app" },
  { id: 4, signal: "impact", exhibit: "A-4", title: "~20% efficiency gain in code migration", body: "LLM-powered SAS-to-PySpark converter with validation layer catching ~40% of silent semantic failures.", project: "SAS-to-PySpark Converter", verified: true },

  // Technical depth cards
  { id: 5, signal: "technical", exhibit: "B-1", title: "LangGraph + FastMCP + SSE streaming", body: "Full agentic stack: StateGraph orchestration, 4 FastMCP tool servers (market, news, portfolio, SEC), server-sent events with 15s heartbeat through proxy layers.", project: "AI Investment Analyst" },
  { id: 6, signal: "technical", exhibit: "B-2", title: "Production RAG with eval framework", body: "LangChain RAG pipeline with TruLens evaluation. Discovered faithfulness scores disagreed with user satisfaction. Added task-completion metrics.", project: "LLM Policy Retrieval Agents" },
  { id: 7, signal: "technical", exhibit: "B-3", title: "Full-stack deploy: Fly.io + Neon + Vercel", body: "Docker containers on Fly.io (auto-stop/start), Neon Postgres (asyncpg), Vercel frontend. PostgreSQL stale-while-revalidate caching. Zero Redis.", project: "AI Investment Analyst" },
  { id: 8, signal: "technical", exhibit: "B-4", title: "Execution-based code validation", body: "LLMs produce syntactically valid but semantically wrong code. Built validation running both SAS and PySpark outputs on test datasets, flagging divergence above threshold.", project: "SAS-to-PySpark Converter" },

  // Failures cards
  { id: 9, signal: "resilience", exhibit: "C-1", title: "SSE Silent Drop", severity: "critical", body: "Connections dying after 30s through proxies. No error, just silence.", rootCause: "Proxy buffering, flushing only on disconnect.", fix: "15-second heartbeat pings.", lesson: "Keepalive must be louder than the buffer timeout." },
  { id: 10, signal: "resilience", exhibit: "C-2", title: "yfinance Silent None", severity: "high", body: "Analysis completing with nonsensical output. No error raised.", rootCause: "Library swallows failures, returns None silently.", fix: "Explicit None checks, data_gaps array in report.", lesson: "Never trust external APIs to fail loudly." },
  { id: 11, signal: "resilience", exhibit: "C-3", title: "OpenRouter 429 Cascades", severity: "medium", body: "Third tool call 429s, killing entire analysis.", rootCause: "20 req/min limit, no retry.", fix: "Per-ticker Postgres cache, stale-while-revalidate.", lesson: "Rate limits teach caching architecture." },
  { id: 12, signal: "resilience", exhibit: "C-4", title: "RAG Eval Lies", severity: "high", body: "TruLens 0.9+ faithfulness but users unsatisfied.", rootCause: "Measuring retrieval, not task completion.", fix: "Added: did user stop searching?", lesson: "Measure whether the human stopped searching." },
  { id: 13, signal: "resilience", exhibit: "C-5", title: "Chunking Cross-References", severity: "medium", body: "Chunks with 'see Section 4.2' and no context.", rootCause: "Standard chunking breaks on nested refs.", fix: "Semantic boundaries with dependency expansion.", lesson: "Enterprise docs aren't blog posts." },
  { id: 14, signal: "resilience", exhibit: "C-6", title: "SAS Semantic Errors", severity: "high", body: "Code runs but produces wrong numbers. Off by pennies.", rootCause: "LLMs produce valid-looking but wrong PySpark.", fix: "Dual-execution validation layer.", lesson: "Code gen without execution validation is copy-paste." },
  { id: 15, signal: "resilience", exhibit: "C-7", title: "Corporate Boilerplate", severity: "low", body: "All institutions' disclosures looked identical.", rootCause: "80% boilerplate in climate disclosures.", fix: "Boilerplate detector, extract residual signal.", lesson: "Subtract the template to find signal." },

  // Culture fit cards
  { id: 16, signal: "culture", exhibit: "D-1", title: "Publishes failure logs alongside shipped work", body: "Documents what broke openly. Engineering maturity signal: root cause, fix, lesson for every incident.", photo: null },
  { id: 17, signal: "culture", exhibit: "D-2", title: "Active outside work", body: "Hikes regularly (Singapore, SEA, Grand Canyon). Yoga. Volunteers with youth and elderly communities.", photo: "/gallery/img3.jpg" },
  { id: 18, signal: "culture", exhibit: "D-3", title: "Growth trajectory", body: "Data Science to Software Engineering to AI Engineering. Each step driven by wanting to go deeper into the systems that make AI work in production.", photo: null },
];

export const verdict = {
  recommendation: "STRONG HIRE",
  confidence: "HIGH",
  summary: "Ships production systems end-to-end. Documents failures openly. Debugs systematically. Full-stack from infrastructure through frontend. Clear growth trajectory toward AI engineering.",
  keyFinding: "The incident logs signal more engineering maturity than any clean portfolio ever could.",
  fitFor: ["AI Engineer", "MLE", "Applied AI", "LLM Platform Engineer"],
};
