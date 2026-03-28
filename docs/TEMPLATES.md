# Content Templates

Copy-paste starters for new content. Frontmatter must match the types in `lib/content.ts` exactly.

---

## New Project (Showcase layout)

```mdx
---
title: ""
slug: ""
date: "2026-03-09"
status: draft
tags:
  - ""
tools:
  - ""
accentColors:
  - "#04b8be"
  - "#e57322"
heroImage: "/images/projects/SLUG.png"
abstract: ""
layout: showcase
featured: false
# github: ""             # Optional — shows GitHub button in card dialog
# demo: ""               # Optional — shows Live Demo button in card dialog
---

Project content here.
```

## New Project (Case Study layout)

```mdx
---
title: ""
slug: ""
date: "2026-03-09"
status: draft
tags:
  - ""
tools:
  - ""
accentColors:
  - "#04b8be"
  - "#e57322"
heroImage: "/images/projects/SLUG.png"
abstract: ""
layout: case-study
featured: false
# github: ""             # Optional — shows GitHub button in card dialog
# demo: ""               # Optional — shows Live Demo button in card dialog
---

## Opening claim — state the finding, not the topic.

Body content here. Use `.article-content` typography classes automatically via `CaseStudyLayout`.
```

## New Note

```mdx
---
title: ""
slug: ""
date: "2026-03-09"
status: draft
category: method-note
tags:
  - ""
abstract: ""
---

Body content here.
```

---

## Accent color palette reference

Pick 2–3 per project. Do not mix more than 3.

| Color  | Hex       | Use for                        |
|--------|-----------|--------------------------------|
| Cyan   | `#04b8be` | Spatial/network, maps          |
| Orange | `#e57322` | Highlights, heat, performance  |
| Green  | `#3ab564` | Growth, completion, land use   |
| Purple | `#727892` | Policy, governance, abstract   |
| Red    | `#ef4434` | Risk, displacement, loss       |

## Bookshelf

No file template — books are added directly in the Notion database. See `docs/CONTENT-MODEL.md` for the Notion property schema and `docs/WORKFLOWS.md` for the step-by-step workflow.

Required Notion properties for a new book: `Title`, `Author`, `Status` (select: Reading / Completed / Want to Read). Set `ISBN` for automatic cover art. Set `Progress` and `Pages` for reading-progress display.

## Note category reference

| Value         | When to use                                        |
|---------------|----------------------------------------------------|
| `city-read`   | Essay reading a transport system or policy         |
| `method-note` | Technical how-I-did-it, code or methodology focus  |
| `policy-read` | Summary + commentary on a government/multilateral report |

## Layout reference

| Value        | Status   | Description                            |
|--------------|----------|----------------------------------------|
| `showcase`   | ✅ Built  | Bento-style, interactive               |
| `case-study` | ✅ Built  | Longform prose + scrollytelling        |
| `explorer`   | 🚧 Planned | Full-page interactive map/data tool  |
| `split`      | 🚧 Planned | Side-by-side text + visualization    |
| `compare`    | 🚧 Planned | Before/after or A/B comparison       |
