# Design System

Visual language for ridwansatria.com. "A document, not an app."

## Design principles

1. **"A document, not an app."** — Read like a research brief with visual evidence. Craft felt, not seen.
2. **The map IS the content.** — For spatial projects, the viz is the deliverable, not decoration.
3. **Achromatic until it matters.** — Chrome stays neutral. Color only in illustrations and data viz.
4. **Progressive disclosure.** — Strongest visual first. Details expandable.
5. **Workbench, not marketing site.** — No testimonials, client logos, or construction banners.

## Typography

### Font families

| Token | Font | Usage |
|---|---|---|
| `font-sans` (`--font-sans`) | Geist | Default body, UI text |
| `font-heading` (`--font-heading`) | Plus Jakarta Sans | Page titles, header/nav, reading section |

Defined in `app/globals.css` via `@theme inline`. No font-mono in site chrome — `font-mono` only inside `.article-content code` and `.article-content pre`.

### Type scale

| Element | Font | Treatment |
|---|---|---|
| Headings (article) | Plus Jakarta Sans | Bold, `letter-spacing: -0.02em` |
| Body (articles) | Geist | 18px, `line-height: 1.75` |
| Body (UI) | Geist | 14–15px |
| Page titles (index) | Plus Jakarta Sans | `text-3xl md:text-4xl font-heading font-semibold tracking-tight leading-tight` |
| Page subtitles (index) | Geist muted | `text-xl leading-relaxed text-muted-foreground` |
| Section labels | Geist muted | `text-xs text-muted-foreground uppercase tracking-widest` |
| List item titles | Geist | `text-sm md:text-lg font-medium text-foreground leading-snug` |
| Header / nav | Plus Jakarta Sans | `font-heading` on header and menu overlay |

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

- **Route transitions:** Fade + 8px upward slide, 200ms, subtle ease (`app/template.tsx`). Forces scroll-to-top on navigation.
- **Showcase pages:** Viewport-triggered animations via `components/app/visual/motion-primitives.tsx`.
- **AnimatedBackground:** Hover-sliding highlight via `layoutId` spring animation (`components/app/visual/animated-background.tsx`). Used on homepage notes list, notes archive list, article footer "more notes", and header nav overlay.
- **Spotlight:** Mouse-following radial glow (`components/app/visual/spotlight.tsx`). Drop `<Spotlight className="z-10 bg-foreground/5 blur-3xl" size={240} springOptions={{ bounce: 0.3, duration: 0.1 }} />` as first child of any `relative overflow-hidden` card. Used on all project cards (homepage, featured grid, more list).

### Hover conventions

| Element | Hover effect | Classes |
|---|---|---|
| Cards (project, note) | Background tint + border lighten + spotlight glow | `hover:bg-accent/70 hover:border-foreground/20 transition-all` + `<Spotlight>` |
| List rows (notes) | Sliding highlight | `AnimatedBackground` with `bg-accent/70`, spring transition |
| Nav menu items | Sliding highlight | `layoutId` spring with `bg-accent`, 200ms delayed close on route change |
| Link arrows | Slide right | `group-hover:translate-x-0.5 transition-transform` |
| Social/connect pills | Background fade | `bg-secondary hover:bg-secondary/70 transition-colors` (filled, no border) |

Hard rules:
- No scroll hijacking or parallax
- No continuous/looping animations
- No `hover:-translate-y` lift on cards
- Respect `prefers-reduced-motion`
- Use Tailwind default transition duration (no explicit `duration-*` unless needed)

## Layout

- **Homepage container:** `max-w-4xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28`
- **Index page container (notes, projects):** `max-w-4xl mx-auto px-6 pt-20 pb-16`
- **Index page header spacing:** `mb-20` between header and first section
- **Section spacing (homepage):** `space-y-16`, with `mt-24` before the Projects section
- **Project grid (homepage):** `grid-cols-1 sm:grid-cols-3 gap-4`
- **Notes list:** `border-t first:border-t-0 border-border/60`, hover on `-mx-2 px-2` wrapper
- **Border radius:** `rounded-2xl` on all cards (no `rounded-xl` for cards)
- **Card base:** `border bg-card p-4 rounded-2xl`
- **Header:** Fixed top bar, `backdrop-blur`, fullscreen menu overlay with `font-heading`. Menu close is delayed 200ms on navigation to prevent flash of old page content.
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
- ❌ Additional font families beyond Geist (sans) and Plus Jakarta Sans (heading)
- ❌ font-mono in UI labels, nav, or section headers
- ❌ Dynamic Tailwind class generation (use hardcoded variants)
