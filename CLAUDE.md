# CLAUDE.md — ridwan-portfolio-v2

## Overview

Single-package Next.js 16 portfolio site using **file-based MDX** for content management.
- **`frontend/`** — Next.js 16 (App Router, TypeScript, Turbopack)
- **`content/`** — MDX content files (projects & notes) inside `frontend/`

All content lives as `.mdx` files with YAML frontmatter. No external CMS.

---

## Commands

Run from the **repo root** unless noted.

```bash
npm run dev              # Start Next.js dev server (Turbopack)
npm run format           # Prettier
npm run lint             # ESLint (frontend)
npm run type-check       # TypeScript check
```

Run from **`frontend/`**:

```bash
npm run build            # Production build
npm run dev              # Dev server
```

---

## Architecture

### Directory Structure

```
frontend/
├── app/                        # Next.js App Router pages (server components by default)
│   ├── about/
│   ├── notes/
│   │   └── [slug]/             # Note detail (MDX rendered)
│   ├── projects/
│   │   └── [slug]/             # Project detail (MDX rendered)
│   ├── components/             # Page-level components (Header, Footer, etc.)
│   ├── layout.tsx              # Root layout (ThemeProvider, TransitionProvider)
│   ├── page.tsx                # Home/hero page
│   ├── globals.css             # CSS vars, OKLch theme tokens
│   ├── sitemap.ts              # Auto-generates sitemap from MDX files
│   └── template.tsx            # Page transitions
├── content/
│   ├── projects/               # Project MDX files (*.mdx)
│   └── notes/                  # Note MDX files (*.mdx)
├── components/
│   ├── ui/                     # Shadcn/Radix UI primitives
│   ├── visual/                 # FadeIn, FadeInStagger, ScaleIn motion primitives
│   ├── motion-primitives/      # Text animation effects
│   ├── project-layouts/        # Project detail page layouts
│   └── note-layouts/           # Note/article page layouts
├── lib/
│   ├── content.ts              # File-system content reader (getAllProjects, getAllNotes, etc.)
│   ├── mdx.tsx                 # MDX compilation & custom components
│   ├── site-config.ts          # Site metadata (title, description, author, social links)
│   ├── utils.ts                # Shared utilities (cn, etc.)
│   └── transition-context.tsx  # Page transition state
├── next.config.ts              # Image remote patterns
├── tailwind.config.ts          # Custom palette, fonts, dark mode
└── tsconfig.json               # Strict mode, path alias @/* → root
```

---

## Content Management (MDX)

### Adding a New Project

Create `frontend/content/projects/<slug>.mdx`:

```mdx
---
title: "Project Title"
slug: "project-slug"
description: "Short description for cards and meta"
subtitle: "Longer subtitle for detail page"
image: "/images/project-hero.jpg"
year: "2024"
role: "Lead Developer"
tags: ["React", "TypeScript"]
featured: true
order: 1
github: "https://github.com/..."
demo: "https://..."
nextProject: "other-project-slug"
---

Your project content in MDX here...
```

### Adding a New Note

Create `frontend/content/notes/<slug>.mdx`:

```mdx
---
title: "Note Title"
slug: "note-slug"
date: "2024-01-15"
excerpt: "Brief summary for listings"
category: "Development"
tags: ["React", "Performance"]
published: true
---

Your note content in MDX here...
```

### Content Utilities (`lib/content.ts`)

| Function | Purpose |
|----------|---------|
| `getAllProjects()` | Returns all projects sorted by `order` field |
| `getProjectBySlug(slug)` | Returns single project frontmatter + raw MDX |
| `getProjectSlugs()` | Returns all project slugs (for `generateStaticParams`) |
| `getAllNotes()` | Returns all published notes sorted by date (newest first) |
| `getNoteBySlug(slug)` | Returns single note frontmatter + raw MDX |
| `getNoteSlugs()` | Returns all note slugs (for `generateStaticParams`) |
| `getAllContentSlugs()` | Returns all slugs with type prefix (for sitemap) |

### MDX Components (`lib/mdx.tsx`)

Custom components available in MDX files:
- `<Callout type="info|warning|tip">` — styled callout boxes
- `<ImageGallery images={[{src, alt, caption}]}>` — responsive image grid
- Images auto-wrapped in `<figure>` with optional `<figcaption>`
- Internal links auto-use Next.js `<Link>`

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
- Allowed remote patterns: `pexels.com`, `vercel-storage.com`

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
| `frontend/app/page.tsx` | Homepage — vertical sections, content from MDX utils |
| `frontend/app/components/Header.tsx` | Sticky nav, h-12, max-w-4xl |
| `frontend/app/components/Footer.tsx` | Footer, max-w-4xl |
| `frontend/components/project-card.tsx` | Shared project card component |
| `frontend/app/projects/page.tsx` | Projects listing — reads from `content/projects/` |
| `frontend/app/projects/[slug]/page.tsx` | Project detail — renders MDX via ShowcaseLayout |
| `frontend/app/notes/page.tsx` | Notes listing — reads from `content/notes/` |
| `frontend/app/notes/[slug]/page.tsx` | Note detail — renders MDX via ArticleLayout |
| `frontend/lib/content.ts` | File-system content reader (replaces all CMS queries) |
| `frontend/lib/mdx.tsx` | MDX compilation with custom components |
| `frontend/lib/site-config.ts` | Site metadata and author info |
| `frontend/next.config.ts` | Remote image patterns (pexels.com, vercel-storage.com) |
| `frontend/app/globals.css` | CSS vars, OKLch theme tokens (`--radius: 0.625rem`) |
| `frontend/lib/utils.ts` | Shared utilities (`cn`, etc.) |
