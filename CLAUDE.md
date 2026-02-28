# CLAUDE.md — ridwan-portfolio-v2

## Overview

Monorepo (npm workspaces) with two packages:
- **`frontend/`** — Next.js 16 portfolio site (App Router, TypeScript)
- **`studio/`** — Sanity 5 headless CMS for content management

Features live visual editing, Framer Motion animations, and Sanity-powered content.

---

## Commands

Run from the **repo root** unless noted.

```bash
npm run dev              # Start both frontend + studio dev servers in parallel
npm run dev:next         # Frontend only (Next.js + Turbopack)
npm run dev:studio       # Studio only (Sanity)
npm run format           # Prettier (uses @sanity/prettier-config)
npm run lint             # ESLint (frontend)
npm run type-check       # TypeScript check across both workspaces
```

Run from **`frontend/`**:

```bash
npm run typegen          # Regenerate Sanity schema TypeScript types (run after schema changes)
npm run build            # Production build
```

> `predev` and `prebuild` hooks auto-run `typegen` before dev/build.

---

## Architecture

### Directory Structure

```
frontend/
├── app/                        # Next.js App Router pages (server components by default)
│   ├── about/
│   ├── notes/
│   ├── posts/
│   ├── projects/
│   ├── [slug]/                 # Dynamic routes
│   ├── api/
│   ├── layout.tsx              # Root layout (ThemeProvider, TransitionProvider, SanityLive)
│   ├── page.tsx                # Home/hero page
│   ├── globals.css             # CSS vars, OKLch theme tokens
│   └── template.tsx            # Page transitions
├── components/
│   ├── ui/                     # Shadcn/Radix UI primitives
│   ├── visual/                 # FadeIn, FadeInStagger, ScaleIn motion primitives
│   ├── motion-primitives/      # Text animation effects
│   ├── project-layouts/        # Project detail page layouts
│   └── note-layouts/           # Note/article page layouts
├── lib/
│   ├── utils.ts                # Shared utilities (cn, etc.)
│   └── transition-context.tsx  # Page transition state
├── sanity/lib/
│   ├── client.ts               # Sanity client setup
│   ├── queries.ts              # All GROQ queries
│   ├── live.ts                 # Sanity Live Content API
│   └── utils.ts                # Sanity helpers
├── next.config.ts              # Image remote patterns, styled-components
├── tailwind.config.ts          # Custom palette, fonts, dark mode
└── tsconfig.json               # Strict mode, path alias @/* → root

studio/                         # Sanity Studio (schema definitions, desk config)
```

---

## Key Conventions

### Components
- **Server components by default** — only add `"use client"` where truly needed (event handlers, hooks, browser APIs)
- **Shadcn/ui pattern** — Radix UI primitives styled with Tailwind classes; components live in `components/ui/`

### Styling
- **Tailwind CSS v4** with PostCSS
- **Dark mode** — class-based via `next-themes` (`.dark` selector)
- **CSS custom properties** — OKLch color system, radius, and fonts as CSS vars
- **Fonts** — `--font-public-sans` (Public Sans), `--font-plus-jakarta` (Plus Jakarta Sans)

### Animations
- **Framer Motion** — viewport-triggered with `once: true, margin: "0px 0px -50px 0px"`
- **Motion primitives** (`components/visual/motion-primitives.tsx`) — use `FadeIn`, `FadeInStagger`, `ScaleIn`
- Always respect `prefers-reduced-motion`
- Easing: `[0.25, 0.1, 0.25, 1.0]`

### Images
- Use Next.js `<Image>` component
- Allowed remote patterns: `cdn.sanity.io`, `pexels.com`, `vercel-storage.com`

### Types
- Sanity schema types are **auto-generated** — run `typegen` after any schema changes
- Generated types live in `frontend/sanity/types.ts` (do not edit manually)

---

## Critical Files

| File | Purpose |
|------|---------|
| `frontend/next.config.ts` | Remote image patterns, styled-components config |
| `frontend/tailwind.config.ts` | Custom palette, fonts, dark mode class |
| `frontend/app/globals.css` | CSS vars, OKLch theme tokens |
| `frontend/components/visual/motion-primitives.tsx` | FadeIn, FadeInStagger, ScaleIn |
| `frontend/sanity/lib/queries.ts` | All GROQ queries for content fetching |
| `frontend/lib/utils.ts` | Shared utilities (`cn`, etc.) |
| `frontend/lib/transition-context.tsx` | Page transition state management |
