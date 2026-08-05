// Greenhouse terrarium data: organisms, scars, roots, atmosphere

export const organisms = [
  {
    id: 'ai-investment-analyst',
    name: 'AI Investment Analyst',
    color: '#0ff5e8',
    colorClass: 'organism-cyan',
    position: { x: 45, y: 60 },
    size: 'large',
    branches: [
      { label: 'Market Data', angle: -40 },
      { label: 'News Feed', angle: -10 },
      { label: 'Portfolio', angle: 20 },
      { label: 'SEC Filings', angle: 50 },
    ],
    debateTriangle: true,
    stack: ['LangGraph', 'FastMCP', 'FastAPI', 'React', 'SSE', 'Fly.io', 'Neon'],
    description: 'Multi-agent investment analysis platform with 3-agent debate (bull, bear, moderator). Real-time SSE streaming, 4 MCP tool servers, PostgreSQL caching.',
    links: {
      live: 'https://ai-investment-analyst-iota.vercel.app',
      github: 'https://github.com/cl-xy/ai-investment-analyst',
    },
    scars: [
      {
        id: 'sse-drop',
        label: 'SSE Silent Drop',
        position: { branch: 0, offset: 0.6 },
        detail: {
          broke: 'SSE connections dying silently after 30s. No error, no event, just gone.',
          cause: 'Reverse proxy buffering. Fly.io and Vercel both buffer responses by default, killing idle SSE streams.',
          fix: 'Added 15s heartbeat pings, X-Accel-Buffering: no header, Cache-Control: no-cache. Connection now survives 120s+ analysis runs.',
          lesson: 'Never trust that a persistent connection will stay alive through infrastructure you don\'t control. Always heartbeat.',
        },
      },
      {
        id: 'yfinance-none',
        label: 'yfinance None Fields',
        position: { branch: 1, offset: 0.4 },
        detail: {
          broke: 'Analysis crashing on certain tickers. NoneType has no attribute "get" errors in production.',
          cause: 'yfinance returns None for any field without warning. Market cap, PE ratio, sector: all nullable. No schema contract.',
          fix: 'Defensive parsing with data_gaps array. Every field access wrapped. Missing data noted in output instead of crashing.',
          lesson: 'External APIs lie about their contracts. Parse defensively, surface gaps to the user, never assume a field exists.',
        },
      },
      {
        id: 'openrouter-429',
        label: 'OpenRouter 429 Cascade',
        position: { branch: 2, offset: 0.7 },
        detail: {
          broke: 'Rate limit cascade. One 429 triggers EventSource reconnect, which fires a new analysis, which hits another 429.',
          cause: 'Free tier: 20 req/min. Debate step alone uses 3 calls. Reconnection without backoff amplifies the problem.',
          fix: 'PostgreSQL stale-while-revalidate cache. Serve stale data during rate limit windows. Exponential backoff on reconnect.',
          lesson: 'Cache is not optimization, it is reliability. When your upstream has hard limits, cache is your circuit breaker.',
        },
      },
      {
        id: 'langgraph-choice',
        label: 'LangGraph: Intentional Complexity',
        position: { branch: 3, offset: 0.5 },
        isScar: false,
        detail: {
          context: 'LangGraph felt like overkill for v1. Simple function chain would have shipped faster.',
          decision: 'Kept it. StateGraph with checkpointing enabled the debate step later without rewriting orchestration.',
          outcome: 'What felt like over-engineering became the foundation for the most differentiated feature.',
          lesson: 'Sometimes the "too complex" choice is the right one if you can see where the problem is heading.',
        },
      },
    ],
  },
  {
    id: 'policy-retrieval',
    name: 'LLM Policy Retrieval Agents',
    color: '#fbbf24',
    colorClass: 'organism-amber',
    position: { x: 65, y: 38 },
    size: 'medium',
    branches: [
      { label: 'Document Ingestion', angle: -50 },
      { label: 'Chunking', angle: -20 },
      { label: 'Retrieval', angle: 10 },
      { label: 'Generation', angle: 40 },
      { label: 'Evaluation', angle: 65 },
    ],
    stack: ['Python', 'LangChain', 'RAG', 'FastAPI', 'PostgreSQL', 'TruLens'],
    description: 'Production RAG system at Citi automating policy retrieval for compliance teams. 7,000 hours/year saved across the organization.',
    links: {},
    scars: [
      {
        id: 'rag-eval-lies',
        label: 'RAG Eval Lies',
        position: { branch: 4, offset: 0.5 },
        detail: {
          broke: 'TruLens showing 0.92 faithfulness scores, but users reporting wrong answers. Metrics green, reality red.',
          cause: 'Automated eval measures surface similarity, not task completion. An answer can be faithful to context and still miss the user\'s actual question.',
          fix: 'Added task-completion metric: does the answer actually let the user do what they need? Scores dropped to 0.71, exposed real gaps.',
          lesson: 'Eval metrics that always pass are not measuring the right thing. If your score never drops below 0.9, your benchmark is broken.',
        },
      },
      {
        id: 'chunking-crossrefs',
        label: 'Chunking Cross-References',
        position: { branch: 1, offset: 0.6 },
        detail: {
          broke: 'Policy documents reference other sections ("as per Section 4.2.1"). Chunks lose this context. Retrieval returns fragments without their dependencies.',
          cause: 'Naive chunking splits by token count. Cross-references span chunks. The chunk has no idea it is incomplete without its referent.',
          fix: 'Section-aware chunking with parent-child relationships. Cross-references resolved at retrieval time, pulling linked sections alongside.',
          lesson: 'Documents have structure. Treating them as flat text throws away the thing that makes them useful.',
        },
      },
    ],
  },
  {
    id: 'sas-converter',
    name: 'SAS-to-PySpark Converter',
    color: '#a78bfa',
    colorClass: 'organism-violet',
    position: { x: 28, y: 42 },
    size: 'small',
    branches: [
      { label: 'SAS Parser', angle: -30 },
      { label: 'AST Transform', angle: 0 },
      { label: 'PySpark Gen', angle: 30 },
      { label: 'Validation', angle: 60 },
    ],
    bridgeConnection: { from: 0, to: 2 },
    stack: ['Python', 'FastAPI', 'React', 'GenAI'],
    description: 'LLM-powered code migration tool converting SAS scripts to PySpark. Execution-based validation catches 40% of semantic errors that syntax checks miss.',
    links: {},
    scars: [
      {
        id: 'semantic-errors',
        label: 'Semantic Errors on the Bridge',
        position: { bridge: true, offset: 0.5 },
        detail: {
          broke: 'Converted PySpark runs without errors but produces wrong numbers. Subtly different join semantics, date handling, null propagation.',
          cause: 'LLM translates syntax correctly but misses semantic differences between SAS and Spark. SAS MERGE != Spark JOIN. SAS missing = 0, Spark missing = null.',
          fix: 'Execution-based validation: run both SAS and PySpark on sample data, compare outputs numerically. Catches 40% of "correct" translations that are actually wrong.',
          lesson: 'Code that compiles is not code that works. The only validation that matters for migration is: do the outputs match?',
        },
      },
    ],
  },
  {
    id: 'decarbonization',
    name: 'Portfolio Decarbonization',
    color: '#34d399',
    colorClass: 'organism-green',
    position: { x: 72, y: 22 },
    size: 'seedling',
    branches: [
      { label: 'Text Extraction', angle: -20 },
      { label: 'Signal Detection', angle: 20 },
      { label: 'Scoring', angle: 50 },
    ],
    stack: ['Python', 'NLP', 'scikit-learn', 'NLTK', 'Pandas'],
    description: 'NLP research extracting genuine decarbonization signals from corporate disclosures. NUS Distinction capstone separating commitment from boilerplate.',
    links: {},
    scars: [
      {
        id: 'corporate-boilerplate',
        label: 'Corporate Boilerplate',
        position: { branch: 0, offset: 0.7 },
        detail: {
          broke: 'Every company scores high on "green commitment." Model cannot distinguish genuine action from marketing language.',
          cause: 'Sustainability reports are mostly template. "We are committed to net zero by 2050" appears in 90% of reports regardless of actual action.',
          fix: 'Template subtraction: identify boilerplate phrases across corpus, weight novel/specific language higher. Concrete metrics (tonnes reduced, capex allocated) scored above vague commitments.',
          lesson: 'When everyone says the same thing, the signal is in what is different. Subtract the template to find what is real.',
        },
      },
    ],
  },
];

export const rootConnections = [
  {
    from: 'ai-investment-analyst',
    to: 'policy-retrieval',
    label: 'defensive parsing, caching architecture',
  },
  {
    from: 'sas-converter',
    to: 'ai-investment-analyst',
    label: 'execution-based validation',
  },
  {
    from: 'decarbonization',
    to: 'policy-retrieval',
    label: 'signal extraction from noisy text',
  },
];

export const pollenKeywords = [
  'StateGraph', 'heartbeat', '429', 'SSE', 'FastMCP',
  'astream', 'checkpoint', 'stale-while-revalidate',
  'faithfulness', 'chunking', 'yfinance', 'MERGE',
  'asyncpg', 'Fly.io', 'Neon', 'TruLens',
  'data_gaps', 'backoff', 'tool_call', 'debate',
];

export const specimenLabel = {
  name: 'XINYI LU',
  title: 'AI Engineer',
  location: 'Singapore',
  stats: '4 deployed systems, 7,000 hrs/yr automated',
  stack: 'LangGraph, FastMCP, SSE, Full-stack deploy',
  links: {
    email: 'xinyilu2000@gmail.com',
    linkedin: 'https://linkedin.com/in/xinyilu2000',
    github: 'https://github.com/cl-xy',
  },
};
