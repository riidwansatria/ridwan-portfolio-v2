# Design System

Visual language for ridwansatria.com. "A document, not an app."

## Design principles

1. **"A document, not an app."** — Read like a research brief with visual evidence. Craft felt, not seen.
2. **The map IS the content.** — For spatial projects, the viz is the deliverable, not decoration.
3. **Achromatic until it matters.** — Chrome stays neutral. Color only in illustrations and data viz.
4. **Progressive disclosure.** — Strongest visual first. Details expandable.
5. **Workbench, not marketing site.** — No testimonials, client logos, or construction banners.

## Typography

| Element | Font | Treatment |
|---|---|---|
| Headings (article) | Plus Jakarta Sans | Bold, `font-stretch: extra-condensed`, `letter-spacing: -0.02em` |
| Body (articles) | Public Sans | 18px, `line-height: 1.75` |
| Body (UI) | Public Sans | 14–15px |
| Meta labels | Public Sans muted | `text-xs text-muted-foreground uppercase tracking-widest` |

No font-mono in site chrome. `font-mono` is only used inside `.article-content code` and `.article-content pre`.

## Color

### Semantic palette (OKLCH, zero chroma — achromatic)

| Token | Light | Dark |
|---|---|---|
| `--background` | `oklch(1 0 0)` | `oklch(0.145 0 0)` |
| `--foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `--muted-foreground` | `oklch(0.556 0 0)` | `oklch(0.708 0 0)` |
| `--border` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 10%)` |

Default to light mode. Dark mode via `next-themes` class toggle.

### Accent palette (illustrations and data viz only)

| Color | Hex | Usage |
|---|---|---|
| Cyan | `#04b8be` | Primary — spatial/network visuals, maps |
| Orange | `#e57322` | Secondary — highlights, heat, performance |
| Green | `#3ab564` | Tertiary — growth, completion, land use |
| Purple | `#727892` | Accent — policy, governance, abstract |
| Red | `#ef4434` | Accent — risk, displacement, loss |

Rules:
- Each illustration uses **2–3 colors max**
- Color does NOT appear in semantic tokens or site chrome
- Tag pills on `ProjectCard` use `accentColors` from frontmatter (inline `style` prop, not Tailwind)

## Motion

Restrained but not absent.

- **Route transitions:** Fade via framer-motion (`app/template.tsx`). Forces scroll-to-top on navigation.
- **Showcase pages:** Viewport-triggered animations via `components/motion-primitives/`.
- **Hover:** Project cards `border-foreground/25` on hover, 200ms. Link arrows translate 0.5px.

Hard rules:
- No scroll hijacking or parallax
- No continuous/looping animations
- Respect `prefers-reduced-motion`

## Layout

- **Homepage container:** `max-w-4xl mx-auto px-4 sm:px-6`
- **Section spacing:** `space-y-16`, with `mt-24` before the Projects section
- **Project grid (homepage):** `grid-cols-1 sm:grid-cols-3 gap-4`
- **Notes list:** `border-t first:border-t-0 border-border/60`, hover on `-mx-2 px-2` wrapper
- **Border radius base:** `0.625rem` (`--radius`), rounded-2xl on cards
- **Header:** Fixed top bar, `backdrop-blur`, fullscreen menu overlay
- **Footer:** Hidden on `/projects/[slug]` detail pages

## Article Typography (.article-content)

Applied by `CaseStudyLayout` and note pages. Key values:
- Body: 18px / 1.75 line-height
- H1: 3rem, bold, extra-condensed, -0.02em tracking
- H2: 2.5rem, bold, extra-condensed
- H3/H4: 2rem / 1.5rem, semibold, extra-condensed
- Links: underline via `border-bottom`, not `text-decoration`
- Blockquote: `border-left: 2px solid primary`, italic, muted

### Image breakout classes (in article content)

| Class | Mobile | Desktop (lg+) |
|---|---|---|
| `.img-inline` | contained | contained |
| `.img-wide` | contained | `-4rem` each side |
| `.img-container` / `.img-full` | contained | bleeds to 1fr column edge (calc -33% - 2rem) |

## What not to do

- ❌ Brand/accent colors in semantic tokens or Tailwind classes
- ❌ Scroll hijacking or parallax
- ❌ Continuous/looping animations
- ❌ Testimonials, client logos, construction banners
- ❌ Contact form (mailto + LinkedIn is sufficient)
- ❌ Long personal philosophy sections
- ❌ Additional font families
- ❌ font-mono in UI labels, nav, or section headers
- ❌ Dynamic Tailwind class generation (use hardcoded variants)
