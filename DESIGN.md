# Xinyi Lu — Personal Portfolio: Design Brief

## Concept: "Curious Builder's Fieldbook"

The site's spine is Xinyi's way of working (observe, build, ship, reflect), not any single project. Projects are specimens/experiments proving a repeatable habit. The AI Investment Analyst gets premium treatment as the best current proof, but the identity survives project turnover.

---

## Visual Identity

### Palette

| Role | Hex | Feeling |
|------|-----|---------|
| Background | `#FAF7F2` | Warm paper, approachable canvas |
| Ink/text | `#1F2933` | Deep charcoal, rigorous not harsh |
| Accent (CTA, live states) | `#C96F4A` | Terracotta — warm intelligence, human-made |
| Systems/trust | `#7A9E7E` | Sage moss — calm analytical precision |
| Highlights/discovery | `#F2CC8F` | Saffron — curiosity, live metrics |
| Secondary text | `#8B8680` | Warm gray, human not clinical |
| Code background | `#F5F0EA` | Warm off-white, not cold gray |

### Typography

- **Headings:** Fraunces 600-700 (editorial serif with personality)
- **Body:** Inter 400/500, 16px/1.6 line-height
- **Code/telemetry:** JetBrains Mono 400, 13-14px
- **Margin annotations:** JetBrains Mono 400, 12-13px, terracotta color

### Emotional Register

**Warm. Precise. Alive.**

Feels like reading a well-annotated lab notebook where experiments run in front of you. Approachable but technically serious, dynamic but not chaotic.

---

## Page Structure

Single scroll, sticky minimal nav.

### 1. Hero (first 3 seconds)

```
Xinyi Lu
AI Engineer · Singapore

I build agentic systems, then write down what broke.

[View field notes]  [Resume]
```

**Proof chips** (visible near hero):
- `LLM agents saving 7,000 hrs/yr at Citi`
- `3 production systems deployed`
- `LangGraph · FastMCP · SSE`
- `NUS Honors · Ex-Data Scientist`

### 2. Field Entries (Projects)

Each project is a "field entry" with the observe/build/ship/reflect structure.

**AI Investment Analyst (premium, full-width):**
- Pre-recorded SSE trace replay (streaming tokens, architecture nodes highlighting)
- Architecture diagram with annotations
- "What broke / what I'd do differently" margin annotations
- Impact metrics: latency, token costs, deployment status
- Deep-dive link to postmortem page

**Other projects (half-width cards):**
- Banking Web App: tech stack, one key learning annotation
- AI Decarbonization Analysis: NLP method, research outcome
- Citi work entries: LLM agents (7000hrs), SAS-to-PySpark converter

### 3. About (brief, warm)

Not a generic "About Me." Instead, a short passage weaving curiosity + rigor + personal (hiking, yoga, volunteering) into the builder identity.

### 4. Contact/CTA

"I respond faster to architecture questions than compliments."
Email + LinkedIn + GitHub links.

---

## The Fieldbook Signature (screenshot moment)

**Margin annotations** — terracotta-colored, JetBrains Mono asides pinned to the left or right of project content. Real observations like:

- "SSE kept dropping under load — switched to heartbeat pings"
- "LangGraph was overkill for v1, but paid off when adding debate step"
- "This took 3 weeks longer than planned. Worth it."

These are the ONE thing that makes people say "that's cool." They surface honest process notes visually rather than burying them in prose. They scale from 2 to 10 projects without redesign.

**Mobile:** Annotations collapse into inline callout blocks (no margin space on mobile).

---

## The Demo Moment

**Default:** Pre-recorded SSE trace replay from a real production run of the AI Investment Analyst. Streaming tokens, highlighting architecture nodes, updating latency/cost counters. Feels live but is deterministic and zero-cost.

**Opt-in:** "Run Live" button (secondary, clearly labeled). Warms the Fly.io instance on hover. Streams a real analysis with `LIVE` badge (pulsing terracotta dot).

**Fallback:** If JS fails, shows annotated architecture diagram with static metrics. Site always works as a readable document.

---

## 30-Second Mental Model

After half a minute, the visitor thinks:

> "Xinyi is a rigorous AI engineer who ships production systems and is unusually honest about how they break."

---

## What's NOT on the site

- No skill percentage bars or dot ratings
- No generic "passionate developer" copy
- No stock hero photos or cover images
- No testimonial carousels
- No heavy timeline/career path visualization
- No certificate clutter (Neo4j cert woven into project context, not listed separately)
- No blog posts list (the field entries ARE the writing)
- No live API dependency for the main experience

---

## Tech Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS (design tokens via CSS custom properties)
- Framer Motion (subtle, purposeful animations only)
- Google Fonts: Fraunces, Inter, JetBrains Mono
- Pre-recorded trace data as static JSON
- Deployed via Vercel (or GitHub Pages)

---

## Implementation Order

1. Strip current site, set up design tokens (palette, type, spacing)
2. Build hero + nav + proof chips
3. Build field entry component (observe/build/ship/reflect structure)
4. Build margin annotation component
5. Build AI Investment Analyst premium entry with trace replay
6. Build secondary project cards
7. Build about + contact sections
8. Mobile responsive pass
9. Trace replay animation (pre-recorded SSE frames)
10. Optional: "Run Live" integration with Fly.io backend
