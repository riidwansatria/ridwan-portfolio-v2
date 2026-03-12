import Link from 'next/link'

interface ArticlePost {
  title: string
  slug: string
  date: string
  abstract?: string
  category?: string
  rawContent?: string
  content: React.ReactNode
}

interface AdjacentPost {
  title: string
  slug: string
  date: string
}

interface ArticleLayoutProps {
  post: ArticlePost
  prevPost?: AdjacentPost | null
  nextPost?: AdjacentPost | null
  moreNotes?: AdjacentPost[]
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatShortDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

function estimateReadingTime(raw: string): number {
  const words = raw.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export function LayoutArticle({ post, prevPost, nextPost, moreNotes }: ArticleLayoutProps) {
  const readingTime = post.rawContent ? estimateReadingTime(post.rawContent) : null

  return (
    <div className="min-h-screen">

      <div className="mx-auto max-w-[680px] px-4 sm:px-6 pt-24 pb-24">

        {/* Header */}
        <header className="mb-12 pb-10 border-b border-border">

          <h1 className="text-lg sm:text-4xl font-semibold leading-[1.15] tracking-tight text-foreground">
            {post.title}
          </h1>

          {post.abstract && (
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-foreground/60">
              {post.abstract}
            </p>
          )}

          <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground/40">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {readingTime && (
              <>
                <span aria-hidden>·</span>
                <span>{readingTime} min read</span>
              </>
            )}
          </div>
        </header>

        {/* Content */}
        <article className="article-content">
          {post.content}
        </article>

        {/* Footer navigation */}
        {moreNotes && moreNotes.length > 0 && (
          <>
            <hr className="border-border mt-16 mb-6" />
            <p className="mb-1 text-xs text-muted-foreground">More notes</p>
            <nav>
              {moreNotes.map((note) => (
                <article key={note.slug} className="">
                  <Link href={`/notes/${note.slug}`}>
                    <div className="-mx-2 px-2 py-2 rounded-lg transition-colors hover:bg-accent/50 flex items-baseline justify-between gap-4">
                      <p className="text-sm font-medium text-foreground leading-snug">{note.title}</p>
                      <p className="text-xs text-muted-foreground shrink-0">{formatShortDate(note.date)}</p>
                    </div>
                  </Link>
                </article>
              ))}
            </nav>
          </>
        )}
      </div>
    </div>
  )
}
