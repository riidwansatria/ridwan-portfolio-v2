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

  // Get adjacent notes for navigation
  const allNotes = getAllNotes()
  const currentIndex = allNotes.findIndex((n) => n.slug === slug)
  const prevNote = currentIndex < allNotes.length - 1 ? allNotes[currentIndex + 1] : null
  const nextNote = currentIndex > 0 ? allNotes[currentIndex - 1] : null

  return (
    <LayoutArticle
      post={{
        title: frontmatter.title,
        slug: frontmatter.slug,
        date: frontmatter.date,
        abstract: frontmatter.abstract,
        category: frontmatter.category,
        tags: frontmatter.tags,
        content: mdxContent,
      }}
      prevPost={prevNote ? { title: prevNote.title, slug: prevNote.slug } : null}
      nextPost={nextNote ? { title: nextNote.title, slug: nextNote.slug } : null}
    />
  )
}
