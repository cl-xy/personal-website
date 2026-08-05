export const profile = {
  name: "Xinyi Lu",
  role: "AI Engineer",
  location: "Singapore",
  email: "xinyilu2000@gmail.com",
  linkedin: "https://www.linkedin.com/in/xinyi-lu-35b72917a/",
  github: "https://github.com/cl-xy",
};

export const benchObjects = [
  {
    id: "ticker-machine",
    type: "project",
    label: "AI Investment Analyst",
    sublabel: "Live",
    weight: "heavy",
    position: { x: 42, y: 35 },
    rotation: -1,
    project: {
      title: "AI Investment Analyst",
      subtitle: "Agentic stock analysis with observable reasoning",
      stack: ["LangGraph", "FastMCP", "FastAPI", "React", "SSE", "Fly.io", "Neon"],
      proof: [
        "End-to-end deployed: Fly.io + Vercel + Neon Postgres",
        "3-agent debate architecture (bull, bear, moderator)",
        "Real-time SSE streaming with heartbeat keep-alive",
        "4 FastMCP tool servers: market, news, portfolio, SEC",
      ],
      links: {
        live: "https://ai-investment-analyst-iota.vercel.app",
        github: "https://github.com/cl-xy/ai-investment-analyst",
      },
    },
    scar: {
      type: "crack",
      tooltip: "SSE connections dropping silently. Proxy buffering, flushing only on disconnect. Fix: 15-second heartbeat pings.",
    },
    back: {
      title: "Architecture",
      content: "LangGraph StateGraph → 4 FastMCP servers → SSE stream → React\n\nDebate: bull analyst + bear analyst + moderator\nCache: PostgreSQL stale-while-revalidate (no Redis)\nDeploy: Fly.io (backend) + Vercel (frontend) + Neon (db)",
    },
  },
  {
    id: "switchboard",
    type: "project",
    label: "LLM Policy Agents",
    sublabel: "7,247 hrs saved",
    weight: "heavy",
    position: { x: 18, y: 25 },
    rotation: 2,
    project: {
      title: "LLM Policy Retrieval Agents",
      subtitle: "Production agents at Citi saving 7,000 hours/year",
      stack: ["Python", "LangChain", "RAG", "FastAPI", "PostgreSQL", "TruLens"],
      proof: [
        "7,000 hours/year of manual effort eliminated",
        "RAG pipeline with TruLens + task-completion metrics",
        "Deployed to compliance and operations teams",
      ],
      links: {},
    },
    scar: {
      type: "tape",
      tooltip: "RAG eval showed 0.9+ faithfulness but users were unsatisfied. Fix: measured whether the human stopped searching.",
    },
    back: {
      title: "Maintenance Log",
      content: "2024-03: Latency spike in routing. Added caching layer. p95 back to <200ms.\n2024-01: Chunking cross-references broken. Changed strategy 3x. Settled on semantic boundaries with dependency expansion.\n2023-11: Initial deploy to compliance team.",
    },
  },
  {
    id: "specimen-jar",
    type: "meta",
    label: "v4.2",
    sublabel: "the one that shipped",
    weight: "medium",
    position: { x: 62, y: 42 },
    rotation: 1.5,
    back: {
      title: "Ship the imperfect version.",
      content: "~~v1 (too generic)~~\n~~v2 (too wordy)~~\n~~v3 (too clever)~~\n~~v4.0 (too safe)~~\n~~v4.1 (still too safe)~~\nv4.2 — this one. Finally.",
    },
  },
  {
    id: "notebook",
    type: "project",
    label: "Field Notebook",
    sublabel: "decisions & failures",
    weight: "light",
    position: { x: 28, y: 55 },
    rotation: -3,
    project: {
      title: "SAS-to-PySpark Converter",
      subtitle: "LLM-powered legacy code migration",
      stack: ["Python", "FastAPI", "React", "GenAI"],
      proof: [
        "~20% efficiency improvement in migration workflows",
        "Execution-based validation catching ~40% of silent failures",
        "Used by data engineering teams",
      ],
      links: {},
    },
    scar: {
      type: "crossed-out",
      tooltip: "LLMs producing syntactically valid but semantically wrong PySpark. Off by pennies. Fix: dual-execution validation layer.",
    },
    back: {
      title: "Decision Log",
      content: "LangGraph vs CrewAI vs raw asyncio:\n\n+ LangGraph: state management, astream_events, checkpoint\n+ CrewAI: simpler API, less control\n+ asyncio: full control, no framework overhead\n\n→ LangGraph. The state graph paid off when adding the debate step.",
    },
  },
  {
    id: "topo-map",
    type: "personal",
    label: "Trails",
    weight: "feather",
    position: { x: 12, y: 70 },
    rotation: 4,
    back: {
      title: "Off-trail",
      content: "MacRitchie TreeTop Walk — 2hr loop, canopy level\nBukit Timah Summit — short but steep\nGrand Canyon rim-to-rim — bucket list, done 2024\n\nNo failures here. This is the thing with no bugs.",
    },
  },
  {
    id: "brass-weights",
    type: "personal",
    label: "Balance",
    weight: "heavy",
    position: { x: 72, y: 65 },
    rotation: -0.5,
    back: {
      title: "Calibration",
      content: "patience · breath · stillness\n\nYoga is debugging for the nervous system.\nSame process: observe, identify the tension, release it systematically.",
    },
  },
  {
    id: "seed-packets",
    type: "personal",
    label: "Community",
    weight: "feather",
    position: { x: 8, y: 45 },
    rotation: 6,
    back: {
      title: "Things planted",
      content: "Code mentoring — batch 3\nCommunity garden, Toa Payoh\nYouth program volunteer\nElderly tech literacy sessions\n\nYou plant things you might not see grow.",
    },
  },
  {
    id: "polaroid-1",
    type: "photo",
    label: "",
    weight: "feather",
    position: { x: 50, y: 72 },
    rotation: 3,
    image: "gallery/img3.jpg",
    caption: "Grand Canyon, AZ",
  },
  {
    id: "polaroid-2",
    type: "photo",
    label: "",
    weight: "feather",
    position: { x: 56, y: 78 },
    rotation: -2,
    image: "gallery/img2.jpg",
    caption: "Outdoors",
  },
  {
    id: "polaroid-3",
    type: "photo",
    label: "",
    weight: "feather",
    position: { x: 44, y: 76 },
    rotation: 5,
    image: "gallery/img4.jpg",
    caption: "Community event",
  },
];

export const drawer = {
  resume: {
    headline: "Xinyi Lu — AI Engineer",
    bullets: [
      "7,000 hrs/yr automated (Citi LLM policy agents)",
      "4 production AI systems shipped, 0 abandoned",
      "LangGraph, FastMCP, SSE, React, Fly.io, Neon",
      "NUS Business Analytics (Honours), Distinction Capstone",
      "Currently: Software Engineer @ Citi (AI/ML Platform)",
    ],
    links: {
      email: "xinyilu2000@gmail.com",
      linkedin: "https://www.linkedin.com/in/xinyi-lu-35b72917a/",
      github: "https://github.com/cl-xy",
    },
  },
};

export const tickerTexts = [
  "AAPL... bullish momentum... moderate confidence...",
  "analyzing market data... 3-agent debate...",
  "bull: strong buy signal... bear: overvalued at P/E 32...",
  "moderator: consensus hold with upside bias...",
  "streaming results... SSE heartbeat OK...",
];
