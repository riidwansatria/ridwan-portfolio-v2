# Content Model

Three content types: projects have deliverables, notes have arguments, and the bookshelf tracks reading.

## The differentiation rule

- `/projects` → Has a **deliverable** (artifact). You interact with it, not read it.
  No traditional prose body — text exists only as short annotations, captions, scroll steps, or UI labels.
- `/notes` → Has an **argument**. Text-first with optional inline interactive components.
  If you removed the component, the article should still make sense as text.
- `/bookshelf` → **Reading log**. Data lives in a Notion database, not in local files.

Every project can link to a companion note ("Read the write-up →") explaining methodology.

## Project frontmatter

```yaml
title: string
slug: string
date: YYYY-MM-DD
status: draft | published
tags: string[]
tools: string[]
accentColors: string[]   # 2–3 hex values, used for tag pill colors
heroImage: string        # URL or /public path (16:9 aspect expected)
abstract: string         # State the finding, not the topic
layout: showcase | case-study  # default: showcase
featured: boolean
github: string           # Optional — shows GitHub button in ProjectCard dialog
demo: string             # Optional — shows Live Demo button in ProjectCard dialog
```

## Note frontmatter

```yaml
title: string
slug: string
date: YYYY-MM-DD
status: draft | published
tags: string[]
category: city-read | method-note | policy-read
abstract: string
```

## Draft filtering

Items with `status: "draft"` are hidden in production, visible in dev. Implemented in both `lib/content.ts` and `app/page.tsx`:

```js
const items = allItems.filter(
  p => process.env.NODE_ENV === 'development' || p.status !== 'draft'
)
```

No branches for WIP content. Everything lives on `main`.

## Project layouts

| Layout | Frontmatter value | Status | Use for |
|---|---|---|---|
| Showcase | `layout: showcase` (default) | ✅ Built | Bento-style interactive with motion wrappers |
| Case Study | `layout: case-study` | ✅ Built | Longform + scrollytelling (Scrollama) |
| Explorer | `layout: explorer` | 🚧 Planned | Full-page interactive map/data tool |
| Split | `layout: split` | 🚧 Planned | Side-by-side text + visualization |
| Compare | `layout: compare` | 🚧 Planned | Before/after or A/B comparison view |
| Storymap | `layout: storymap` | 🚧 Planned | Full-page scroll-driven spatial narrative |

New layouts should be thin wrappers that arrange MDX-registered components, not monolithic templates.

## Note categories

- **City reads** — short essays reading a transport system or policy. Core differentiator.
- **Method notes** — technical how-I-did-it posts. Can use side-by-side layout (text + code/viz).
- **Policy document reads** — summarize and comment on published government/multilateral reports.

## Bookshelf data model

The bookshelf is not file-driven. Data lives in a Notion database, fetched via `@notionhq/client` v5's `dataSources.query` API in `lib/bookshelf.ts`.

### Notion database properties

| Property | Notion type | Maps to |
|---|---|---|
| `Title` | title | `book.title` |
| `Author` | rich_text | `book.author` |
| `Status` | select | `book.status` — one of `Reading`, `Completed`, `Want to Read` |
| `Rating` | select | `book.rating` |
| `ISBN` | rich_text | `book.isbn` — used to resolve cover art |
| `Genre` | multi_select | `book.genres` |
| `Date Finished` | date | `book.dateFinished` |
| `Note` | rich_text | `book.note` |
| `Featured` | checkbox | `book.featured` |
| `Progress` | number | `book.progress` — current page number |
| `Pages` | number | `book.pages` — total pages |

### Book type

```ts
type Book = {
  id: string
  title: string
  author: string
  status: string
  rating: string | null
  isbn: string | null
  genres: string[]
  dateFinished: string | null
  note: string | null
  featured: boolean
  coverUrl: string | null
  progress: number | null
  pages: number | null
}
```

### Cover art resolution

Cover images are resolved at build/revalidation time using the ISBN:
1. **OpenLibrary** — `covers.openlibrary.org/b/isbn/{isbn}-L.jpg` (HEAD check, 1h revalidate)
2. **Google Books** fallback — uses `GOOGLE_BOOKS_KEY` env var if set, otherwise unauthenticated

If both fail, `coverUrl` is `null` and `BookCover` renders a muted placeholder.

### Sorting rules

Books are sorted by status group order (Reading → Completed → Want to Read), then:
- **Reading:** by progress percentage descending (furthest along first)
- **Completed:** by `dateFinished` descending (most recent first)
- **Want to Read:** no secondary sort

### Environment variables

| Variable | Required | Description |
|---|---|---|
| `NOTION_TOKEN` | Yes | Notion integration token (shared with other Notion integrations) |
| `NOTION_BOOKSHELF_DB_ID` | Yes | Notion database ID for the bookshelf |
| `GOOGLE_BOOKS_KEY` | No | Google Books API key for cover fallback (works without, but rate-limited) |

### ISR

The bookshelf page uses `revalidate = 3600` (1 hour). Cover art fetches also cache for 1 hour.

## Content guidelines

- Tone: technical-but-approachable. Write like a research brief.
- Titles: short and declarative. Abstracts state the finding, not the topic.
- No marketing speak, no hedging.
- Publishing guardrails for consulting work: never publish client data, methods, or identifiable project details without written clearance.
