# CLAUDE.md — ridwan-portfolio-v2

## Overview

Monorepo (npm workspaces) with two packages:
- **`frontend/`** — Next.js 16 portfolio site (App Router, TypeScript)
- **`studio/`** — Sanity 5 headless CMS for content management

Content is currently hardcoded in page files. Sanity CMS is wired up but not yet actively driving homepage/projects/notes content.

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
- **No scroll-triggered animations on public pages** (homepage, projects, notes, about) — all FadeIn/FadeInStagger have been stripped
- Motion primitives (`components/visual/`) are kept and still used in project detail layouts only
- Framer Motion: `once: true, margin: "0px 0px -50px 0px"`, easing `[0.25, 0.1, 0.25, 1.0]`
- Always respect `prefers-reduced-motion`

### Images
- Use Next.js `<Image>` component
- Allowed remote patterns: `cdn.sanity.io`, `pexels.com`, `vercel-storage.com`

### Types
- Sanity schema types are **auto-generated** — run `typegen` after any schema changes
- Generated types live in `frontend/sanity/types.ts` (do not edit manually)

---

## Design System

### Layout
- Content width: `max-w-5xl mx-auto px-4 sm:px-6` on all pages (homepage, projects, notes, header, footer)
- Homepage uses **vertical sections** with `space-y-16` — no bento grid, no card wrappers around sections
- Whitespace creates section separation; borders/backgrounds are only on interactive elements (ProjectCard, photo strip)
- Border radius: `rounded-2xl` on ProjectCard and photo strip

### Homepage section order
1. Intro — avatar + name + bio + roles/location inline + social links
2. Projects — label + 3-col ProjectCard grid
3. Photo strip — horizontal scroll, city photos
4. Notes — label + text list with hover
5. Reading — label + book cover placeholder + title/author

### No font-mono
- All UI labels, navigation, year displays, and section headers use default sans (not font-mono)

### Navigation
- Header: `h-12`, sticky, `max-w-4xl` inner nav
- Nav links: [Ridwan Satria] [Projects] [Research] [CV → /about]
- `/research` does not exist yet (returns 404 until scaffolded)

---

## Critical Files

| File | Purpose |
|------|---------|
| `frontend/app/page.tsx` | Homepage — bento grid layout, hardcoded content |
| `frontend/app/components/Header.tsx` | Sticky nav, h-12, max-w-4xl |
| `frontend/app/components/Footer.tsx` | Footer, max-w-4xl |
| `frontend/components/project-card.tsx` | Shared project card component |
| `frontend/app/projects/page.tsx` | Projects listing — hardcoded |
| `frontend/app/notes/page.tsx` | Notes listing — hardcoded |
| `frontend/next.config.ts` | Remote image patterns (cdn.sanity.io, pexels.com, vercel-storage.com) |
| `frontend/app/globals.css` | CSS vars, OKLch theme tokens (`--radius: 0.625rem`) |
| `frontend/sanity/lib/queries.ts` | All GROQ queries for content fetching |
| `frontend/lib/utils.ts` | Shared utilities (`cn`, etc.) |
