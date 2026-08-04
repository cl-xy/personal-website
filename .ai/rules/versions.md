# Portfolio Versions

## Live

| Version | Branch | URL | Status |
|---------|--------|-----|--------|
| Agent Trace | `master` | https://xinyi-lu-website.vercel.app | Production (Vercel) |
| All 3 comparison | `gh-pages` | https://cl-xy.github.io/personal-website/ | GitHub Pages |
| Original MUI site | `archive/v1-current-site` | Not deployed | Archive |

## GitHub Pages (version comparison)

Static exports of all three versions served from `gh-pages` branch:
- https://cl-xy.github.io/personal-website/agent-trace/
- https://cl-xy.github.io/personal-website/fieldbook/
- https://cl-xy.github.io/personal-website/incident-report/

To rebuild: `bash deploy-pages.sh` from repo root (builds all 3 branches with `output: 'export'` + basePath, pushes to gh-pages).

Setup: GitHub repo Settings > Pages > Source: "Deploy from branch" > Branch: `gh-pages` / `/ (root)`.

### How deploy-pages.sh works

1. Builds `master` in-place (swaps next.config temporarily), other branches via git worktrees
2. Each build uses `output: 'export'` + `basePath: '/personal-website/<subfolder>'` + `images: { unoptimized: true }`
3. Post-processes JS/HTML to rewrite absolute image paths (`/gallery/`, `/logos/`, `/cover.`, etc.) to include the full GitHub Pages prefix (`/personal-website/<subfolder>/`)
4. Combines all three into a single gh-pages branch with an index page, force-pushes

### Gotchas (things that broke and why)

- `basePath` alone doesn't fix image paths in data files (e.g., `src/lib/trace-script.js` has `/gallery/img2.jpg`). `next/image` with `unoptimized: true` does NOT auto-prepend basePath to src props. Sed post-processing is required.
- GitHub Pages serves at `/personal-website/...` (repo name prefix), so basePath must be `/personal-website/<subfolder>`, not just `/<subfolder>`.
- Can't create a git worktree for the current branch (master). Script builds master in-place with a config swap.
- Vercel deployment protection "Only Preview Deployments" still locks previews. We abandoned Vercel previews and went with GitHub Pages instead.

## Vercel (production)

Vercel Deployment Protection is disabled (set to "Only Preview Deployments" so previews are also public).

## Authorship (HARD RULE)

- Everything must appear as cl-xy. Zero trace of junwenleong anywhere.
- Git config: user.name="cl-xy", user.email="xinyilu2000@gmail.com"
- Git remote has cl-xy PAT embedded in URL for push access
- PAT is in `.envrc`: same one used in ai-investment-analyst project
- Never use default shell `$GITHUB_PERSONAL_ACCESS_TOKEN` (that's leongjunwen's)
- If commits accidentally go out as junwenleong, rewrite with filter-branch and force-push

## Deploy

- Auto-deploys from `master` via Vercel
- Force-pushes sometimes don't trigger deploy; follow up with a normal commit if needed
- Project: `xinyi-lu-website` on Vercel under cl-xy's account
- Branch deploys are behind Vercel deployment protection by default

## Git Tags

- `v2-fieldbook-hardened` — fieldbook with hard visual rules (before failure content)

---

## Design Decisions (from ideation rounds)

### Target persona

Xinyi Lu: AI Engineer / DS / MLE job search. Warm, outdoorsy (hikes, yoga, volunteers with youth/elderly), technically rigorous (ships production LLM agents, saved 7000hrs at Citi). Singapore-based, NUS Business Analytics (Hons).

### What we learned across 7+ brainstorm rounds

1. **Standard scroll pages don't differentiate.** Two visual skins (fieldbook, incident report) still felt "the same" because the interaction model was identical: scroll down, read text, scroll more.

2. **Memorability comes from the interaction paradigm, not visual styling.** The panel (8 models) unanimously agreed: break from passive scrolling toward active interactive exploration.

3. **"What broke" should be the spine, not decoration.** Failure narratives (symptom, root cause, fix, lesson) demonstrate engineering judgment better than polished project descriptions.

4. **Show, don't tell — taken to its extreme.** The site should PROVE she builds AI agents by literally being one. The medium is the message.

5. **Photos as agent-discovered evidence.** Personal photos appear as tool call results from `fetch_human_context()` — maintains terminal metaphor while revealing warmth.

6. **Opening must hook in 1 second.** "TARGET ACQUIRED: xinyi_lu" not "Initializing career_analyst_v1..."

7. **Variable pacing matters.** Fast bursts for tool calls (150ms), longer pauses for reasoning (600-800ms), dramatic 1200ms beat before recommendation. Uniform timing feels robotic/fake.

8. **Always provide an escape hatch.** "Skip" button during trace, "recruiter view" button always visible. Busy hiring managers need the 10-second path.

### Design directions explored

**Fieldbook (v2):** "Curious Builder's Fieldbook." Warm editorial typography (Fraunces serif), terracotta accent (#C96F4A), margin annotations showing "what broke," section numbers, square bracket proof chips. 7 hard visual rules. Verdict: too polished, feels like nice paint on a standard portfolio.

**Incident Report (v3):** Space Grotesk (geometric sans), amber incident blocks (#D47A2A), teal fix blocks (#4A9B8E), failure-first content structure (Objective → What Broke → Fix → Shipped). Verdict: content structure is right but visual is still a scroll page.

**Agent Trace (v4, current):** The portfolio IS a running agent trace. Dark theme (#0D1117), JetBrains Mono, color-coded step types (blue=tool_call, orange=reasoning, purple=result, green=recommendation). Command input after trace. Photos as evidence. Recruiter overlay. Verdict: most daring, most memorable, the one we're pushing.

### Panel critique of Agent Trace (things to potentially improve)

- Visual could have more spatial drama (side panels, confidence meters, dependency graphs)
- Could add more commands / easter eggs to the command input
- Recruiter view could be warmer (currently feels like dark-mode card layout)
- The "who built this" response could be wittier
- Could add sound effects or typing sounds (controversial)
- Could animate text streaming character-by-character for key moments (recommendation)

### Content: Xinyi's projects

1. **AI Investment Analyst** (premium) — LangGraph, FastMCP, FastAPI, React, SSE, Fly.io, Neon. 3-agent debate. Live at ai-investment-analyst-iota.vercel.app
2. **LLM Policy Retrieval Agents** — Production RAG at Citi. 7000 hrs/yr saved. LangChain, TruLens.
3. **SAS-to-PySpark Converter** — LLM code migration. ~20% efficiency gain. Validation layer catching 40% silent failures.
4. **Portfolio Decarbonization** — NLP research on climate finance. NUS Distinction capstone.

### Content: Key failures documented

- SSE silent drop (proxy buffering, 15s heartbeat fix)
- yfinance None fields (defensive parsing, data_gaps array)
- OpenRouter 429 cascades (Postgres stale-while-revalidate cache)
- LangGraph overkill for v1 (kept it, paid off for debate step)
- RAG eval lies (TruLens scores high but users unsatisfied, added task-completion metric)
- SAS edge cases (validation layer catching semantically wrong PySpark)
- Corporate disclosure boilerplate (subtract template to find signal)

### Photos available

- `cover.jpg` — personal cover photo
- `gallery/img2.jpg` — outdoors
- `gallery/img3.jpg` — Grand Canyon, AZ
- `gallery/img4.jpg` — community event, Singapore
- `portfolio_decarbonization.png` — research project screenshot
- `bank_app.jpg` — banking app screenshot
