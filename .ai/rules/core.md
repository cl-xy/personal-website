---
inclusion: always
---

# Core Rules: Portfolio Website

## Authorship

- **Commits**: `git commit` only (no `-S`, no GPG). Author: `cl-xy <xinyilu2000@gmail.com>`.
- **No AI fingerprints**: No "AI-generated", "Claude", "Copilot", "LLM-assisted" or similar anywhere.
- **No em dashes** in user-facing text, markdown, or comments.
- **Commit style**: Short, lowercase conventional commits. e.g. `feat: add case-file version`, `fix: spread overlapping objects`.

## Architecture

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| Routing | Route groups with independent root layouts |
| Styling | Tailwind 3 (single unified config) + CSS per route group |
| Animation | Framer Motion + CSS keyframes |
| Icons | Lucide React |
| Deploy | Vercel (auto-deploy on push to master) |
| Export | Static (can use `output: 'export'` for GitHub Pages) |

## Structure

```
src/app/(landing)/    → / (index, links to versions)
src/app/(trace)/      → /agent-trace (terminal eval trace)
src/app/(greenhouse)/ → /evidence-atlas (organism map)
src/app/(bench)/      → /case-file (workshop bench)
```

Each route group has its own `layout.js` (root layout with `<html>`/`<body>`) and `globals.css`.
Shared components live in `src/components/`, shared data in `src/lib/`.

## Constraints

- No top-level `src/app/layout.js` (route groups each define their own root layout)
- Image paths must be absolute (`/gallery/img3.jpg`) since pages render at different URL depths
- Internal nav between versions uses `<Link>` from `next/link`
- Navigating between route groups triggers full page reload (by design, different root layouts)
- Each version is self-contained: different body class, theme color, font stack, CSS
- All Tailwind color tokens (trace-*, greenhouse-*, bench-*) live in one `tailwind.config.mjs`

## Accessibility

- `prefers-reduced-motion`: respected via Framer Motion `useReducedMotion` + CSS media query
- Focus management: `inert` on background when overlays open, focus restore on close
- Keyboard: Escape closes overlays, Enter/Space activates interactive elements
- ARIA: `role="dialog"` + `aria-modal` on overlays, `aria-live` for dynamic content
