export const siteConfig = {
  name: "Xinyi Lu",
  role: "AI Engineer",
  location: "Singapore",
  email: "xinyilu2000@gmail.com",
  linkedin: "https://www.linkedin.com/in/xinyi-lu-35b72917a/",
  github: "https://github.com/cl-xy",
  tagline: "I build agentic systems, then write down what broke.",
  cover: "/cover.jpg",
};

export const gallery = [
  { src: "/gallery/img2.jpg", alt: "Outdoors" },
  { src: "/gallery/img3.jpg", alt: "Travel" },
  { src: "/gallery/img4.jpg", alt: "Hiking" },
];

export const proofChips = [
  "LLM agents saving 7,000 hrs/yr at Citi",
  "AI Investment Analyst: deployed end-to-end",
  "LangGraph · FastMCP · SSE",
  "NUS Honors · Ex-Data Scientist",
];

export const projects = [
  {
    id: "ai-investment-analyst",
    title: "AI Investment Analyst",
    subtitle: "Agentic stock analysis with observable reasoning",
    tier: "premium",
    image: "/bank_app.jpg",
    stack: ["LangGraph", "FastMCP", "FastAPI", "React", "SSE", "Fly.io", "Neon"],
    description:
      "Full-stack AI system that orchestrates multiple LLM agents to produce bull/bear investment analyses with live streaming traces, tool-call observability, and cost tracking.",
    impact: [
      "End-to-end deployed: Fly.io backend + Vercel frontend + Neon Postgres",
      "3-agent debate architecture (bull, bear, moderator) via LangGraph StateGraph",
      "Real-time SSE streaming with heartbeat keep-alive through proxy layers",
      "4 FastMCP tool servers: market data, news, portfolio, SEC filings",
    ],
    annotations: [
      "SSE kept dropping under corporate proxies — added 15s heartbeat pings",
      "LangGraph was overkill for v1, but paid off immediately when adding the debate step",
      "OpenRouter free tier rate limits taught me aggressive caching early",
      "The hardest bug: yfinance returning None for any field, silently",
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
    description:
      "Built LLM agents that assist users with policy retrieval across Citi's Private Bank, replacing manual search across thousands of documents.",
    impact: [
      "Estimated 7,000 hours/year of manual effort eliminated",
      "RAG pipeline with evaluation via TruLens metrics",
      "Deployed internally to compliance and operations teams",
    ],
    annotations: [
      "Evaluation was harder than building — TruLens metrics kept disagreeing with user satisfaction",
      "Chunking strategy changed 3 times before settling on semantic boundaries",
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
    description:
      "Web application automating conversion of SAS codes to PySpark, enhancing migration efficiency by ~20% for analytics teams.",
    impact: [
      "~20% efficiency improvement in code migration workflows",
      "ReactJS frontend with Python/FastAPI backend",
      "Used by data engineering teams for legacy modernization",
    ],
    annotations: [
      "SAS has edge cases that no LLM handles perfectly — built a validation layer that caught ~40% of silent failures",
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
    description:
      "Research project analyzing decarbonization strategies across Asian financial institutions using NLP techniques on corporate disclosures.",
    impact: [
      "Analyzed disclosure patterns across major Asian financial institutions",
      "NUS capstone — earned Distinction",
    ],
    annotations: [
      "Corporate climate disclosures are 80% boilerplate — the signal extraction problem was the real challenge",
    ],
    links: {
      github: "https://github.com/cl-xy/bt4103_esg",
    },
  },
];

export const about = {
  intro:
    "I started in data science — building dashboards, running regressions, writing SQL. Then I built my first LLM agent and realized I wanted to be closer to the systems that make AI actually work in production.",
  current:
    "Now at Citi as a software engineer, I work across the stack: Java/Spring Boot for trade systems, Python/FastAPI for AI services, React for interfaces. The thread connecting it all is making complex AI capabilities reliable enough to ship.",
  personal:
    "Outside work, I hike (usually somewhere green in Singapore or SEA), practice yoga, and volunteer with youth and elderly programs. I learn quickly, get curious easily, and care about building things that matter.",
};
