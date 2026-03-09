# Content Model

Two content types, two routes, one rule: projects have deliverables, notes have arguments.

## The differentiation rule

- `/projects` → Has a **deliverable** (artifact). You interact with it, not read it.
  No traditional prose body — text exists only as short annotations, captions, scroll steps, or UI labels.
- `/notes` → Has an **argument**. Text-first with optional inline interactive components.
  If you removed the component, the article should still make sense as text.

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

## Content guidelines

- Tone: technical-but-approachable. Write like a research brief.
- Titles: short and declarative. Abstracts state the finding, not the topic.
- No marketing speak, no hedging.
- Publishing guardrails for consulting work: never publish client data, methods, or identifiable project details without written clearance.
