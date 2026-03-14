# Component Inventory

All custom components for ridwansatria.com. Use shadcn/ui when available; custom only when no equivalent exists.

## Site chrome

| Component | Location | Description |
|---|---|---|
| `Header` | `components/app/Header.tsx` | Fixed top bar + fullscreen menu overlay + breadcrumbs. `backdrop-blur`. Nav: Home, About, Projects, Notes. |
| `Footer` | `components/app/Footer.tsx` | Live Tokyo clock + theme toggle + copyright. Hidden on `/projects/[slug]`. |
| `ProjectCard` | `components/app/project-card.tsx` | `"use client"`. Thumbnail (16/10 aspect) + title + abstract (line-clamp-2) + date + 2 tag pills styled with `accentColors`. Includes `<Spotlight>` interaction. Used on homepage (3-col grid) and projects index featured grid. |
| `ThemeToggle` | `components/app/ThemeToggle.tsx` | Dark/light mode toggle. |
| `Date` | `components/app/Date.tsx` | Formatted date display. |

Note: `Hero`, `SectionHeading`, and `TagPill` components do **not** exist. The homepage intro section is inline in `app/page.tsx`.

## Layouts

| Component | Location | Description |
|---|---|---|
| `ShowcaseLayout` | `components/app/project-layouts/layout-showcase.tsx` | Default project layout. Bento-style with motion wrappers from `motion-primitives.tsx`. |
| `CaseStudyLayout` | `components/app/project-layouts/layout-case-study.tsx` | Longform project layout. Article typography (18px/1.75). Scrollytelling support. |

Layout selection is via frontmatter `layout` field in project MDX files. See docs/CONTENT-MODEL.md.

## MDX components (registered in lib/mdx.tsx)

These are available in both `/projects` and `/notes` MDX files.

### Maps

| Component | Description |
|---|---|
| `StationMap` | MapLibre GL JS map. CARTO Positron basemap. Cluster view + individual index heatmaps with toggle. |
| `TodScrollytelling` | Scrollama-powered sticky map narrative. StationMap stays sticky while text steps scroll alongside. Each step triggers a map state change. Data loaded from `public/data/tod-equity/`. |

### Charts

| Component | Description |
|---|---|
| `ClusterRadar` | Radar chart for NPP cluster profiles. shadcn Charts / Recharts RadarChart. |
| `ScatterPlot` | Scatter plot for index correlations. shadcn Charts / Recharts ScatterChart. |

### Content

| Component | Description |
|---|---|
| `PolicyMatrix` | Policy implication matrix — cards layout for case study conclusions. |
| `NPPDiagram` | Node-Place-People framework diagram. |
| `Callout` | Styled callout block with icon. |
| `Wide` | Break out of content max-width for full-bleed visuals. |
| `ImageGallery` | Multi-image grid. **Caveat:** uses dynamic Tailwind class `` `md:grid-cols-${columns}` `` — hardcode column variants if layout breaks. |

## Motion / Visual

| Component | Location | Description |
|---|---|---|
| `Spotlight` | `components/app/motion/spotlight.tsx` | `"use client"`. Mouse-following radial glow. Attaches to its parent element via `parentElement` ref. Props: `size` (default 200), `className`, `springOptions`. Use `className="z-10 bg-foreground/5 blur-3xl"` on cards. Add `relative overflow-hidden` to the parent. |
| `AnimatedBackground` | `components/app/motion/animated-background.tsx` | Sliding hover highlight via `layoutId` spring. Used on notes lists. |
| `FadeIn` / `FadeInStagger` / `ScaleIn` | `components/app/layouts/layout-showcase.tsx` (private) | Viewport-triggered entrance animations. Local helpers, not exported. |
| `TextEffect` | `components/app/motion/text-effect.tsx` | Per-word/char/line text animations. Not currently used on public pages. |

Route-level fade transition is in `app/template.tsx`.

## Adding new components

1. If shadcn/ui has an equivalent, use it (`npx shadcn@latest add [component]`).
2. Custom components go in `components/app/`.
3. MDX components must be registered in `lib/mdx.tsx` to be available in content files.
4. Keep components composable — layouts arrange components, they don't own business logic.
