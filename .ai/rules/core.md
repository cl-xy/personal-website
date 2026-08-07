---
inclusion: always
---

# Core Rules: Portfolio Website

## GitHub Access

- **Repo**: `cl-xy/personal-website` (owned by `cl-xy`)
- **PAT**: In `.envrc` (overrides the global junwenleong PAT). Already embedded in the git remote URL.
- **Never use the global `$GITHUB_PERSONAL_ACCESS_TOKEN`** for this repo. That belongs to `leongjunwen`.
- **Push target**: `gh-pages` branch (static export). Source stays on `master`.

## Authorship

- **Commits**: `git commit` only (no `-S`, no GPG). Author: `cl-xy <xinyilu2000@gmail.com>`.
- **No AI fingerprints**: No "AI-generated", "Claude", "Copilot", "LLM-assisted" or similar anywhere.
- **No em dashes** in user-facing text, markdown, or comments.
- **Commit style**: Short, lowercase conventional commits. e.g. `feat: add education room`, `fix: photo alignment`.

## Architecture

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| Routing | Single route group `(four-rooms)` serving at `/` |
| Styling | Tailwind 3 + custom CSS properties |
| Animation | Framer Motion + CSS transitions |
| Icons | None (text-based) |
| Deploy | GitHub Pages (static export, push to `gh-pages` branch) |
| Export | `output: 'export'` with `basePath: '/personal-website'` |
| Live URL | https://cl-xy.github.io/personal-website/ |

## Design

- **Concept**: Four rooms (About, Work, Projects, Education) as interactive cards
- **Style**: Warm, minimal, spatial. Cream/paper background, serif numerals, colored accents per room
- **Photo**: Circular headshot (Grand Canyon, `gallery/img3.jpg`) in header
- **No "AI Engineer" tag** - just "Cornell Tech MEng incoming"
- **Tone**: Plain language, first person, conversational. Not too technical.

## Deploy Process

1. `npm run build` (produces `out/` directory with static HTML)
2. Copy `out/` contents to `gh-pages` branch
3. Push `gh-pages` to origin (force push is fine, it's a deploy artifact branch)
4. GitHub Pages serves from `gh-pages` branch root (legacy "Deploy from a branch" mode)

**Critical:** Pages MUST be set to "Deploy from a branch" (not "GitHub Actions") in repo Settings > Pages. The `.nojekyll` file must be an empty file (no trailing newline). Never add a `.github/workflows/` directory to gh-pages.

```bash
# Quick deploy (from project root):
git worktree add /tmp/gh-pages-deploy origin/gh-pages
cd /tmp/gh-pages-deploy && git checkout gh-pages
rm -rf * && cp -r /path/to/xywebsite/out/* . && printf '' > .nojekyll
PRE_COMMIT_ALLOW_NO_CONFIG=1 git add -A && git commit -m "deploy: <description>" --author="cl-xy <xinyilu2000@gmail.com>"
git push --force origin gh-pages
cd - && git worktree remove /tmp/gh-pages-deploy
```

## Structure

```
src/app/(four-rooms)/layout.js      - Root layout (html/body, Inter font, metadata)
src/app/(four-rooms)/globals.css    - Full design system (warm palette, room colors, typography)
src/app/(four-rooms)/page.js        - Single page with 4 interactive rooms
src/lib/data.js                     - Shared site config (name, location, links)
public/gallery/img3.jpg             - Profile photo (Grand Canyon)
```

## Content

| Room | Content |
|------|---------|
| About | Personal intro, moving to NYC, looking for roles |
| Work | Citi AI/ML (LLM retrieval agents, SAS-to-PySpark), GIC, A*STAR |
| Projects | AI Investment Analyst (live demo), Climate Disclosure (NUS capstone) |
| Education | Cornell Tech MEng (2025), NUS Business Analytics (Honours) |

## Constraints

- Image paths must be absolute (`/personal-website/gallery/img3.jpg`) due to basePath
- Single page, no routing between pages
- `'use client'` required (useState for room selection, Framer Motion)
- Work projects stay in the Work room, personal projects in the Projects room

## Accessibility

- `prefers-reduced-motion`: respected via Framer Motion `useReducedMotion` + CSS media query
- Focus-visible styles on all interactive elements
- Keyboard: rooms navigable via tab, activatable via Enter/Space
- ARIA labels on room buttons and back button
