import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getNoteBySlug, getNoteSlugs, getAllNotes } from '@/lib/content'
import { renderMdx } from '@/lib/mdx'
import { LayoutArticle } from '@/components/custom/note-layouts/layout-article'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getNoteSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params
  const note = getNoteBySlug(slug)
  if (!note) return {}
  return {
    title: note.frontmatter.title,
    description: note.frontmatter.abstract,
  }
}

export default async function NotePage(props: Props) {
  const { slug } = await props.params
  const data = getNoteBySlug(slug)

  if (!data) {
    notFound()
  }

  const { frontmatter, content: rawContent } = data
  const mdxContent = await renderMdx(rawContent)

  // Get more notes for footer (up to 4, excluding current)
  const allNotes = getAllNotes()
  const moreNotes = allNotes
    .filter((n) => n.slug !== slug)
    .slice(0, 3)
    .map((n) => ({ title: n.title, slug: n.slug, date: n.date }))

  return (
    <LayoutArticle
      post={{
        title: frontmatter.title,
        slug: frontmatter.slug,
        date: frontmatter.date,
        abstract: frontmatter.abstract,
        category: frontmatter.category,
        rawContent: rawContent,
        content: mdxContent,
      }}
      moreNotes={moreNotes}
    />
  )
}
