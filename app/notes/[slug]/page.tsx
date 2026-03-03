import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getNoteBySlug, getNoteSlugs, getAllNotes } from '@/lib/content'
import { renderMdx } from '@/lib/mdx'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

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
    description: note.frontmatter.excerpt,
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

  const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  // Get adjacent notes for navigation
  const allNotes = getAllNotes()
  const currentIndex = allNotes.findIndex((n) => n.slug === slug)
  const prevNote = currentIndex < allNotes.length - 1 ? allNotes[currentIndex + 1] : null
  const nextNote = currentIndex > 0 ? allNotes[currentIndex - 1] : null

  return (
    <article className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="pt-12 pb-8 md:pt-16 md:pb-16 px-4 md:px-12 border-b bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 md:mb-8">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-foreground/60">
              {formattedDate}
              {frontmatter.category && ` · ${frontmatter.category}`}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            {frontmatter.title}
          </h1>
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full border border-border text-xs font-medium tracking-wide text-muted-foreground bg-background"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Excerpt */}
      {frontmatter.excerpt && (
        <div className="py-8 md:py-16 px-4 md:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-foreground font-semibold leading-relaxed">
              {frontmatter.excerpt}
            </p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="px-4 md:px-8 lg:px-12 pb-20">
        <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary prose-a:underline prose-a:underline-offset-4">
          {mdxContent}
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-border">
        <div className="max-w-3xl mx-auto px-4 py-12 flex justify-between items-center">
          {prevNote ? (
            <Link
              href={`/notes/${prevNote.slug}`}
              className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider">Previous</span>
                <span className="font-medium text-foreground">{prevNote.title}</span>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextNote ? (
            <Link
              href={`/notes/${nextNote.slug}`}
              className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-right"
            >
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider">Next</span>
                <span className="font-medium text-foreground">{nextNote.title}</span>
              </div>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </nav>
    </article>
  )
}
