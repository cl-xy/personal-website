// Pre-recorded trace data representing a real AI Investment Analyst analysis run
// Simulates the SSE event stream for AAPL stock analysis

export const traceSteps = [
  {
    id: 1,
    agent: 'router',
    action: 'reasoning',
    content: 'Classifying intent: single-ticker deep analysis for AAPL',
    elapsed: 420,
    tokens: 84,
  },
  {
    id: 2,
    agent: 'router',
    action: 'tool_call',
    content: 'market_data.get_quote(ticker="AAPL")',
    elapsed: 1240,
    tokens: 156,
  },
  {
    id: 3,
    agent: 'router',
    action: 'tool_call',
    content: 'market_data.get_fundamentals(ticker="AAPL")',
    elapsed: 2180,
    tokens: 312,
  },
  {
    id: 4,
    agent: 'router',
    action: 'tool_call',
    content: 'news.search(query="AAPL earnings outlook 2026")',
    elapsed: 3450,
    tokens: 489,
  },
  {
    id: 5,
    agent: 'router',
    action: 'tool_call',
    content: 'sec.get_filing(ticker="AAPL", type="10-Q")',
    elapsed: 5120,
    tokens: 734,
  },
  {
    id: 6,
    agent: 'bull',
    action: 'reasoning',
    content: 'Analyzing: strong services revenue growth (+18% YoY), Vision Pro ecosystem expanding, India manufacturing reducing geopolitical risk',
    elapsed: 8900,
    tokens: 1847,
  },
  {
    id: 7,
    agent: 'bull',
    action: 'synthesis',
    content: 'Bull thesis: $245 PT. Services margin expansion + AI features in iOS 20 drive re-rating. Hardware cycle bottoming.',
    elapsed: 12400,
    tokens: 2653,
  },
  {
    id: 8,
    agent: 'bear',
    action: 'reasoning',
    content: 'Analyzing: iPhone unit growth flat, China market share declining (-4pp), regulatory headwinds on App Store fees',
    elapsed: 16200,
    tokens: 3891,
  },
  {
    id: 9,
    agent: 'bear',
    action: 'synthesis',
    content: 'Bear thesis: $168 PT. Multiple compression as growth decelerates. Antitrust remedies could cut services revenue 8-12%.',
    elapsed: 19800,
    tokens: 4702,
  },
  {
    id: 10,
    agent: 'moderator',
    action: 'reasoning',
    content: 'Weighing arguments: bull services narrative is data-backed, bear regulatory risk is speculative but material. Checking conviction scores.',
    elapsed: 22100,
    tokens: 5234,
  },
  {
    id: 11,
    agent: 'moderator',
    action: 'synthesis',
    content: 'Final verdict: MODERATE BUY. PT $218 (weighted). Bull case stronger on fundamentals, bear case valid on 12-18mo regulatory timeline.',
    elapsed: 24600,
    tokens: 5891,
  },
];

export const traceMetrics = {
  totalElapsed: 24600,
  totalTokens: 5891,
  estimatedCost: 0.0,
  model: 'nemotron-3-super-120b',
};

export const architectureNodes = [
  { id: 'router', label: 'Router', x: 50, y: 20 },
  { id: 'bull', label: 'Bull Agent', x: 25, y: 70 },
  { id: 'bear', label: 'Bear Agent', x: 75, y: 70 },
  { id: 'moderator', label: 'Moderator', x: 50, y: 120 },
];
