# ridwansatria.com

Personal portfolio site. Transport planning, spatial analytics, policy.

Built with Next.js App Router, React 19, and Tailwind CSS v4. 

## Stack

- **Framework:** Next.js (App Router, Turbopack)
- **Styling:** Tailwind CSS v4, OKLCH color tokens
- **Content:** `next-mdx-remote/rsc` + `gray-matter`, files in `content/`
- **Rich embeds:** MapLibre GL, Recharts, Scrollama
- **UI primitives:** shadcn/ui (Radix)
- **Theme:** `next-themes`, dark mode via class toggle

## Commands

```bash
npm run dev          # dev server (localhost:3000)
npm run build        # production build
npm run type-check   # TypeScript check
npm run lint         # ESLint
npm run format       # Prettier
```

## Content

Projects live in `content/projects/*.mdx`, notes in `content/notes/*.mdx`.

Set `status: draft` to hide in production. Set `status: published` to show.

See `docs/TEMPLATES.md` for frontmatter starters and `docs/WORKFLOWS.md` for step-by-step guides.

