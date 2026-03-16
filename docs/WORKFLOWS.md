# Workflows

Step-by-step patterns for common multi-file operations. Follow these exactly to avoid missing a step.

---

## Add a new project

1. Create `content/projects/SLUG.mdx` using the template in `docs/TEMPLATES.md`
2. Set `status: draft` until ready to publish
3. Add `heroImage` — either a remote URL (must be from allowed domains in `next.config.ts`) or a local file under `public/images/projects/`
4. Set `accentColors` — 2–3 hex values from the palette in `docs/TEMPLATES.md`
5. Set `layout: showcase` or `layout: case-study`
6. If `featured: true`, the project appears in the featured group on `/projects`
7. To publish: change `status: published`

No code changes needed. `lib/content.ts` picks up new MDX files automatically.

---

## Add a new note

1. Create `content/notes/SLUG.mdx` using the template in `docs/TEMPLATES.md`
2. Set `status: draft` until ready
3. Set `category` to one of: `city-read`, `method-note`, `policy-read`
4. To publish: change `status: published`

No code changes needed.

---

## Add a new MDX component

MDX components must be registered before they can be used in `.mdx` files.

1. Create the component in `components/mdx/` or `components/custom/`
2. Open `lib/mdx.tsx`
3. Import the component at the top
4. Add it to the `components` object passed to `compileMDX`
5. Add it to the component inventory in `docs/COMPONENTS.md`
6. Use it in MDX files with `<ComponentName />`

---

## Add a new project layout

1. Create `components/custom/project-layouts/layout-NAME.tsx`
   - Accept `{ frontmatter: ProjectFrontmatter; content: React.ReactNode }` as props
   - Keep it a thin wrapper — arrange MDX-registered components, don't duplicate logic
2. Open `app/projects/[slug]/page.tsx`
3. Import the new layout
4. Add a branch to the layout selection logic:
   ```ts
   if (frontmatter.layout === 'NAME') return <NameLayout ... />
   ```
5. Add the new layout value to the `layout` union type in `lib/content.ts`:
   ```ts
   layout?: 'showcase' | 'case-study' | 'NAME'
   ```
6. Update the layout table in `docs/CONTENT-MODEL.md`

---

## Add a shadcn/ui component

```bash
npx shadcn@latest add COMPONENT-NAME
```

Components install to `components/ui/`. Import from `@/components/ui/COMPONENT-NAME`.

Do not hand-write shadcn components — always use the CLI to get the correct version.

---

## Add a book to the bookshelf

Books are managed in Notion, not in code. No code changes needed.

1. Open the Notion bookshelf database (ID in `NOTION_BOOKSHELF_DB_ID` env var)
2. Add a new row with at minimum: `Title`, `Author`, `Status`
3. Set `ISBN` if you want a cover image to resolve automatically
4. Set `Progress` and `Pages` for reading-progress display
5. The bookshelf page revalidates every hour (ISR). To force a refresh, redeploy or wait.

The homepage reading section automatically picks up books with status `Reading` and books completed in the last 30 days.

---

## Change homepage sections

Homepage sections are all inline in `app/page.tsx`. The section order is:
`Intro → Projects → Notes → Reading → Connect`

- To reorder: move the `<section>` blocks
- To add a section: add a `<section>` with a muted label header (`text-xs text-muted-foreground uppercase tracking-widest mb-5`)
- Reading section is powered by Notion via `ReadingSection` server component — it shows currently reading + recently completed books
- Connect is hardcoded — update directly in `app/page.tsx`

---

## Publish to production

```bash
git add -p          # stage selectively
git commit -m "..."
git push            # Vercel auto-deploys from main
```

Draft content (`status: draft`) is automatically hidden in production without any code change.

---

## Update the remote image allowlist

If a new image host is needed (e.g. a new CDN domain):

1. Open `next.config.ts`
2. Add the hostname to the `images.remotePatterns` array
3. Commit and redeploy — this requires a server restart to take effect

Current allowed remote hosts:
- `images.pexels.com`
- `k8boaqmtfy4jtiib.public.blob.vercel-storage.com`
- `covers.openlibrary.org` (book covers)
- `books.google.com` (book covers)
- `books.googleusercontent.com` (book covers)
