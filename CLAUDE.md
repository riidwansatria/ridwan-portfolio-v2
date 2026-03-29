# CLAUDE.md — ridwan-portfolio-v2

## Overview

Personal portfolio built with Next.js App Router, React 19, and Tailwind CSS v4.
The site is mostly file-driven: projects and notes come from local `.mdx` files in `content/`, while the bookshelf pulls from a Notion database and some pages like `/about` and the homepage connect section are hardcoded in React.

This is a single-app repo rooted at the project root. There is no traditional CMS or database — Notion is used only as a bookshelf data source via `@notionhq/client`.

---

## Commands

```bash
npm run dev         # Next.js dev server with Turbopack
npm run build       # Production build
npm run start       # Start production server
npm run lint        # next lint
npm run format      # Prettier write
npm run type-check  # TypeScript check without emit
```

---

## Stack

- Next.js `^16.1.3`
- React / React DOM `^19.2.3`
- Tailwind CSS v4 via `@import "tailwindcss"` in `app/globals.css`
- MDX rendered with `next-mdx-remote/rsc`
- `gray-matter` for frontmatter parsing
- Radix UI + custom shadcn-style components in `components/ui/`
- `framer-motion` and `motion`
- `next-themes` for dark mode
- `maplibre-gl`, `recharts`, and `scrollama` for rich project/article embeds
- `@notionhq/client` v5 for bookshelf data (Notion database)

---

## Actual Project Structure

```text
app/
  about/page.tsx                 # Static resume-style about page
  bookshelf/page.tsx             # Bookshelf page (Notion-backed, ISR 1h)
  bookshelf/loading.tsx          # Skeleton loading state for bookshelf
  notes/page.tsx                 # Notes index
  notes/[slug]/page.tsx          # Note detail page from MDX
  projects/page.tsx              # Projects index
  projects/[slug]/page.tsx       # Project detail page from MDX
  layout.tsx                     # Root layout, fonts, theme, header/footer, dev tools
  template.tsx                   # Page fade transition + scroll reset
  globals.css                    # Tailwind v4 imports, tokens, article styles
  sitemap.ts                     # Sitemap from static routes + content slugs

content/
  notes/*.mdx                    # Notes content
  projects/*.mdx                 # Projects content

components/
  custom/                        # App-specific components and page sections
  mdx/                           # Custom MDX embeds (maps, charts, diagrams)
  motion-primitives/             # Text animation primitive(s)
  ui/                            # Shared UI primitives

lib/
  bookshelf.ts                   # Notion bookshelf loader + cover resolver
  content.ts                     # Local filesystem MDX loader/sorter
  mdx.tsx                        # MDX compiler + component mapping
  site-config.ts                 # Global metadata and author links
  transition-context.tsx         # Transition state context

public/
  images/                        # Static images
  data/tod-equity/               # GeoJSON / JSON for scrollytelling project
  Resume_2026_01.pdf             # Public resume asset
```

---

## Routing And Page Behavior

### `/`

- Server component homepage.
- Pulls latest projects and notes from `lib/content.ts`.
- Only the first 3 projects and first 3 notes are shown.
- Reading section uses `ReadingSection` (server component) which fetches currently-reading books and books completed in the last 30 days from Notion.
- Intro and connect sections are hardcoded in `app/page.tsx`.

### `/projects`

- Server component listing page.
- Splits projects into `featured` and non-featured groups.
- Uses `components/custom/project-card.tsx` for featured cards.

### `/projects/[slug]`

- Static params generated from MDX filenames.
- Reads project content from `content/projects/<slug>.mdx`.
- Renders one of two layouts based on frontmatter:
  - `layout: "showcase"` or unset -> `ShowcaseLayout`
  - `layout: "case-study"` -> `CaseStudyLayout`

### `/notes`

- Server component notes index.
- Lists all published notes sorted newest-first.

### `/notes/[slug]`

- Static params generated from note filenames.
- Reads note content from `content/notes/<slug>.mdx`.
- Renders inline page structure directly in the route file.
- Adjacent note navigation is computed from the sorted note list.

### `/bookshelf`

- Server component page backed by Notion database via `lib/bookshelf.ts`.
- ISR with `revalidate = 3600` (1 hour).
- Client-side tab filtering (All, Reading, Completed, Want to Read) via `BookshelfContent`.
- Cover images resolved at build time: OpenLibrary first, Google Books fallback.
- Has a skeleton loading state (`app/bookshelf/loading.tsx`).
- Requires env vars: `NOTION_TOKEN`, `NOTION_BOOKSHELF_DB_ID`. Optional: `GOOGLE_BOOKS_KEY`.

### `/about`

- Fully hardcoded page in [`app/about/page.tsx`](/Users/ridwansatria/Projects/ridwan-portfolio-v2/app/about/page.tsx).
- Education, experience, awards, skills, and interests are not MDX-backed.

---

## Content System

Projects and notes are loaded from the local filesystem with synchronous `fs` reads in [`lib/content.ts`](/Users/ridwansatria/Projects/ridwan-portfolio-v2/lib/content.ts).

Bookshelf data is fetched from a Notion database via [`lib/bookshelf.ts`](/Users/ridwansatria/Projects/ridwan-portfolio-v2/lib/bookshelf.ts) using `@notionhq/client` v5's `dataSources.query` API (not the older `databases.query`).

### Project Frontmatter

Current shape expected by the code:

```ts
type ProjectFrontmatter = {
  title: string
  slug: string
  description: string
  subtitle: string
  image: string
  year: string
  role: string
  tags: Array<{ name: string; color: string }>
  featured?: boolean
  github?: string
  demo?: string
  nextProject?: { slug: string; title: string }
  order?: number
  layout?: 'showcase' | 'case-study'
}
```

Important:
- `tags` is an array of objects, not strings.
- `nextProject` is an object with `slug` and `title`, not a bare slug string.
- `github` and `demo` are optional. They only appear as buttons in the `ProjectCard` expanded dialog — there is no fallback "View Project" button when both are absent.

### Note Frontmatter

```ts
type NoteFrontmatter = {
  title: string
  slug: string
  date: string
  excerpt?: string
  category?: string
  tags?: string[]
  coverImage?: string
  author?: { name: string; avatar?: string }
  published?: boolean
}
```

Important:
- Notes are filtered out only when `published: false`.
- If `published` is omitted, the note is included.

### Sorting Rules

- Projects sort by ascending `order`, defaulting to `99`.
- Notes sort by descending `date`.

---

## MDX Rendering

MDX is compiled in [`lib/mdx.tsx`](/Users/ridwansatria/Projects/ridwan-portfolio-v2/lib/mdx.tsx) using `compileMDX` from `next-mdx-remote/rsc` with `remark-gfm`.

### Available MDX Components

- `Image` / `img`
- `a`
- `Callout`
- `ImageGallery`
- `NPPDiagram`
- `VariableTable`
- `StationMap`
- `ClusterRadar`
- `ScatterPlot`
- `PolicyMatrix`
- `Wide`
- `TodScrollytelling`

Important implementation notes:
- Internal links use Next.js `Link`.
- External links automatically get `target="_blank"` and `rel="noopener noreferrer"`.
- `ImageGallery` currently builds Tailwind classes dynamically with ``md:grid-cols-${columns}``, which may not be safe for static Tailwind extraction.

---

## Layout, Theme, And UI Conventions

### Root Layout

[`app/layout.tsx`](/Users/ridwansatria/Projects/ridwan-portfolio-v2/app/layout.tsx) provides:

- `ThemeProvider`
- `TransitionProvider`
- global `Header`
- global `Footer`
- `Toaster` from `sonner`
- `SpeedInsights`
- development-only `Agentation` dev tools
- Google fonts:
  - `Public Sans` -> `--font-public-sans`
  - `Plus Jakarta Sans` -> `--font-plus-jakarta`

### Header

[`components/custom/Header.tsx`](/Users/ridwansatria/Projects/ridwan-portfolio-v2/components/custom/Header.tsx):

- is a fixed top bar with a fullscreen menu overlay
- explicit `h-16` (4rem / 64px) — layout main uses `pt-16` to offset
- uses breadcrumbs on non-home routes
- current nav items are `Home`, `About`, `Projects`, `Notes`, `Bookshelf`

### Footer

[`components/custom/Footer.tsx`](/Users/ridwansatria/Projects/ridwan-portfolio-v2/components/custom/Footer.tsx):

- explicit `h-10` (2.5rem / 40px)
- shows a live Tokyo clock
- includes the theme toggle
- is hidden on individual project detail pages (`/projects/[slug]`)

### Page Height Calculation

Header (`h-16` = 4rem) + Footer (`h-10` = 2.5rem) = **6.5rem** total offset.
Pages that need viewport-fitted layouts (e.g. about page) use `calc(100dvh - 6.5rem)`.

### Theme Tokens

[`app/globals.css`](/Users/ridwansatria/Projects/ridwan-portfolio-v2/app/globals.css) defines:

- OKLCH color tokens
- `--radius: 0.625rem`
- dark mode via `@custom-variant dark (&:is(.dark *))`
- custom `.article-content` typography rules
- MapLibre popup overrides

### Tailwind Class Style

Always use canonical Tailwind CSS v4 classes instead of arbitrary value brackets when an equivalent exists. For example:
- `min-h-80` not `min-h-[320px]`
- `w-100` not `w-[400px]`
- `h-18` not `h-[72px]`
- `aspect-2/3` not `aspect-[2/3]`
- `z-60` not `z-[60]`
- `bg-size-[14px_24px]` not `bg-[size:14px_24px]`

Only use arbitrary values (`[...]`) when there is no canonical class available.

---

## Motion And Transitions

- Route-level fade transition lives in [`app/template.tsx`](/Users/ridwansatria/Projects/ridwan-portfolio-v2/app/template.tsx).
- `template.tsx` also forces scroll-to-top on pathname changes.
- Project showcase pages still use motion wrappers from `components/custom/visual/motion-primitives.tsx`.
- The current codebase does use animated interactions on public pages, so the previous "no scroll-triggered animations on public pages" rule is stale.

---

## Images And Assets

Next.js remote images are currently allowed only for:

- `images.pexels.com`
- `k8boaqmtfy4jtiib.public.blob.vercel-storage.com`
- `covers.openlibrary.org` (book covers)
- `books.google.com` (book covers)
- `books.googleusercontent.com` (book covers)

Configured in [`next.config.ts`](/Users/ridwansatria/Projects/ridwan-portfolio-v2/next.config.ts).

---

## Important Files

- [`app/page.tsx`](/Users/ridwansatria/Projects/ridwan-portfolio-v2/app/page.tsx): homepage composition
- [`app/bookshelf/page.tsx`](/Users/ridwansatria/Projects/ridwan-portfolio-v2/app/bookshelf/page.tsx): bookshelf page (Notion-backed)
- [`app/about/page.tsx`](/Users/ridwansatria/Projects/ridwan-portfolio-v2/app/about/page.tsx): hardcoded about/resume page
- [`app/projects/[slug]/page.tsx`](/Users/ridwansatria/Projects/ridwan-portfolio-v2/app/projects/[slug]/page.tsx): project detail routing + layout selection
- [`app/notes/[slug]/page.tsx`](/Users/ridwansatria/Projects/ridwan-portfolio-v2/app/notes/[slug]/page.tsx): note detail rendering + prev/next nav
- [`lib/bookshelf.ts`](/Users/ridwansatria/Projects/ridwan-portfolio-v2/lib/bookshelf.ts): Notion bookshelf loader + cover art resolver
- [`lib/content.ts`](/Users/ridwansatria/Projects/ridwan-portfolio-v2/lib/content.ts): content loading and sorting
- [`lib/mdx.tsx`](/Users/ridwansatria/Projects/ridwan-portfolio-v2/lib/mdx.tsx): MDX compiler and component map
- [`lib/site-config.ts`](/Users/ridwansatria/Projects/ridwan-portfolio-v2/lib/site-config.ts): site metadata and social links
- [`components/custom/project-layouts/layout-showcase.tsx`](/Users/ridwansatria/Projects/ridwan-portfolio-v2/components/custom/project-layouts/layout-showcase.tsx): interactive bento-style project layout
- [`components/custom/project-layouts/layout-case-study.tsx`](/Users/ridwansatria/Projects/ridwan-portfolio-v2/components/custom/project-layouts/layout-case-study.tsx): longform case-study layout
- [`components/custom/case-study/TodScrollytelling.tsx`](/Users/ridwansatria/Projects/ridwan-portfolio-v2/components/custom/case-study/TodScrollytelling.tsx): scrollama-powered sticky map narrative

---

## Current Caveats

- [`components/custom/note-layouts/layout-article.tsx`](/Users/ridwansatria/Projects/ridwan-portfolio-v2/components/custom/note-layouts/layout-article.tsx) exists but is not currently used by the active note route.
- `ImageGallery` uses a dynamic Tailwind class pattern that may need hardcoded variants if styling becomes inconsistent.
- Bookshelf requires `NOTION_TOKEN` and `NOTION_BOOKSHELF_DB_ID` env vars. If missing, the bookshelf page and homepage reading section silently return empty lists.

---

## Reference docs

- Content model (layouts, frontmatter, /projects vs /notes): docs/CONTENT-MODEL.md
- Design system (typography, color, motion, layout): docs/DESIGN-SYSTEM.md
- Component inventory and usage: docs/COMPONENTS.md
- Content templates (frontmatter starters, palette reference): docs/TEMPLATES.md
- Common workflows (add project/note/component/layout): docs/WORKFLOWS.md
