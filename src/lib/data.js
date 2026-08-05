export const siteConfig = {
  name: "Xinyi Lu",
  role: "AI Engineer",
  location: "Singapore",
  email: "xinyilu2000@gmail.com",
  linkedin: "https://www.linkedin.com/in/xinyi-lu-35b72917a/",
  github: "https://github.com/cl-xy",
  tagline: "I ship AI systems, then publish what broke.",
};

export const gallery = [
  { src: "gallery/img2.jpg", alt: "Outdoors" },
  { src: "gallery/img3.jpg", alt: "Travel" },
  { src: "gallery/img4.jpg", alt: "Hiking" },
];

export const proofChips = [
  "7,000 hrs/yr saved at Citi",
  "AI Investment Analyst: deployed",
  "LangGraph · FastMCP · SSE",
  "NUS Honors · Ex-Data Scientist",
];

export const projects = [
  {
    id: "ai-investment-analyst",
    title: "AI Investment Analyst",
    subtitle: "Agentic stock analysis with observable reasoning",
    tier: "premium",
    stack: ["LangGraph", "FastMCP", "FastAPI", "React", "SSE", "Fly.io", "Neon"],
    objective:
      "Build a full-stack AI system that orchestrates multiple LLM agents to produce bull/bear investment analyses with live streaming traces, tool-call observability, and cost tracking.",
    failures: [
      {
        what: "SSE connections dropping silently under corporate proxies and Fly.io's load balancer",
        symptom: "Frontend showed 'connected' but no events arrived after ~30s. No error, no timeout, just silence.",
        fix: "Added 15-second heartbeat pings. The proxy was buffering small payloads and only flushing on disconnect.",
        lesson: "Streaming through infrastructure you don't control means you need a keepalive that's louder than the buffer timeout.",
      },
      {
        what: "yfinance returning None for any field, silently",
        symptom: "Analysis would complete but with nonsensical output. No error raised, no missing data flag.",
        fix: "Wrapped every field access in explicit None checks, populated a data_gaps array, and surfaced it in the final report.",
        lesson: "Never trust external APIs to fail loudly. Defensive parsing is not optional.",
      },
      {
        what: "LangGraph felt like overkill for v1 (simple sequential pipeline)",
        symptom: "Two weeks of setup for what could have been 50 lines of async/await.",
        fix: "Kept it anyway. Paid off immediately when adding the bull/bear/moderator debate step. State graph made the branching trivial.",
        lesson: "Premature abstraction is usually wrong, but orchestration frameworks are the exception when you know the system will grow.",
      },
      {
        what: "OpenRouter free tier rate limits (20 req/min) causing cascading failures",
        symptom: "Third tool call in a chain would 429, killing the entire analysis run.",
        fix: "Aggressive per-ticker caching in Postgres with stale-while-revalidate. Most repeat analyses hit zero API calls.",
        lesson: "Rate limits teach you caching architecture faster than any tutorial.",
      },
    ],
    proof: [
      "End-to-end deployed: Fly.io backend + Vercel frontend + Neon Postgres",
      "3-agent debate architecture (bull, bear, moderator) via LangGraph StateGraph",
      "Real-time SSE streaming with heartbeat keep-alive through proxy layers",
      "4 FastMCP tool servers: market data, news, portfolio, SEC filings",
    ],
    links: {
      live: "https://ai-investment-analyst-iota.vercel.app",
      github: "https://github.com/cl-xy/ai-investment-analyst",
    },
  },
  {
    id: "citi-llm-agents",
    title: "LLM Policy Retrieval Agents",
    subtitle: "Production agents at Citi saving 7,000 hours/year",
    tier: "standard",
    logo: "/logos/citi-logo.jpg",
    stack: ["Python", "LangChain", "RAG", "FastAPI", "PostgreSQL", "TruLens"],
    objective:
      "Build LLM agents that assist users with policy retrieval across Citi's Private Bank, replacing manual search across thousands of documents.",
    failures: [
      {
        what: "Evaluation metrics disagreed with actual user satisfaction",
        symptom: "TruLens scores showed 0.9+ faithfulness, but users complained answers were 'technically correct but useless' for their actual workflow.",
        fix: "Added task-completion metrics alongside retrieval quality. Measured whether users still opened the original doc after getting the agent's answer.",
        lesson: "RAG evaluation is a lie if it only measures retrieval. Measure whether the human stopped searching.",
      },
      {
        what: "Chunking strategy broke on policy documents with nested cross-references",
        symptom: "Chunks would contain 'see Section 4.2' with no context of what Section 4.2 said. Retrieval returned dangling pointers.",
        fix: "Changed 3 times before settling on semantic boundaries with cross-reference expansion. Each chunk carries its dependency context.",
        lesson: "Enterprise documents aren't blog posts. Chunking strategy is the entire RAG system.",
      },
    ],
    proof: [
      "Estimated 7,000 hours/year of manual effort eliminated",
      "RAG pipeline with evaluation via TruLens + task-completion metrics",
      "Deployed internally to compliance and operations teams",
    ],
    links: {},
  },
  {
    id: "sas-to-pyspark",
    title: "SAS-to-PySpark Code Converter",
    subtitle: "LLM-powered legacy code migration tool",
    tier: "standard",
    logo: "/logos/citi-logo.jpg",
    stack: ["Python", "FastAPI", "React", "GenAI"],
    objective:
      "Build a web application automating conversion of SAS codes to PySpark, enhancing migration efficiency for analytics teams.",
    failures: [
      {
        what: "LLMs silently producing syntactically valid but semantically wrong PySpark",
        symptom: "Generated code would run without errors but produce different numerical results than the original SAS. Off by fractions of pennies on financial calculations.",
        fix: "Built a validation layer that ran both SAS output and PySpark output on test datasets, flagging divergence above threshold. Caught ~40% of silent failures.",
        lesson: "Code generation without execution-based validation is just sophisticated copy-paste.",
      },
    ],
    proof: [
      "~20% efficiency improvement in code migration workflows",
      "ReactJS frontend with Python/FastAPI backend",
      "Used by data engineering teams for legacy modernization",
    ],
    links: {},
  },
  {
    id: "portfolio-decarbonization",
    title: "AI Portfolio Decarbonization Analysis",
    subtitle: "NLP research on climate finance in Asia",
    tier: "compact",
    image: "/portfolio_decarbonization.png",
    stack: ["Python", "NLP", "scikit-learn", "NLTK", "Pandas"],
    objective:
      "Analyze decarbonization strategies across Asian financial institutions using NLP techniques on corporate disclosures.",
    failures: [
      {
        what: "Corporate climate disclosures are 80% boilerplate",
        symptom: "Initial keyword extraction returned near-identical 'strategies' across all institutions. Everything looked the same.",
        fix: "Built a boilerplate detector trained on the common phrases, then extracted only the residual signal. The differentiation was in what companies said differently, not what they all said.",
        lesson: "Signal extraction in corporate text means subtracting the template first.",
      },
    ],
    proof: [
      "Analyzed disclosure patterns across major Asian financial institutions",
      "NUS capstone project, earned Distinction",
    ],
    links: {
      github: "https://github.com/cl-xy/bt4103_esg",
    },
  },
];

export const about = {
  intro:
    "I started in data science, building dashboards, running regressions, writing SQL. Then I built my first LLM agent and realized I wanted to be closer to the systems that make AI actually work in production.",
  current:
    "Now at Citi as a software engineer, I work across the stack: Java/Spring Boot for trade systems, Python/FastAPI for AI services, React for interfaces. The thread connecting it all is making complex AI capabilities reliable enough to ship.",
  personal:
    "Outside work, I hike (usually somewhere green in Singapore or SEA), practice yoga, and volunteer with youth and elderly programs. I learn quickly, get curious easily, and care about building things that matter.",
};
