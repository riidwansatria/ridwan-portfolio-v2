import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface ArticlePost {
  title: string
  slug: string
  date: string
  abstract: string
  category: string
  tags: string[]
  content: React.ReactNode
}

interface AdjacentPost {
  title: string
  slug: string
}

interface ArticleLayoutProps {
  post: ArticlePost
  prevPost?: AdjacentPost | null
  nextPost?: AdjacentPost | null
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

function formatCategory(category: string) {
  return category.replace(/-/g, " ")
}

export function LayoutArticle({ post, prevPost, nextPost }: ArticleLayoutProps) {
  return (
    <article className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] px-4 pt-12 pb-10 dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] md:px-12 md:pt-16 md:pb-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[180px_minmax(0,1fr)]">
          <div className="space-y-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-foreground/50">Published</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{formatDate(post.date)}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-foreground/50">Category</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{formatCategory(post.category)}</p>
            </div>
          </div>

          <div>
            <h1 className="max-w-4xl text-3xl font-semibold leading-[1.02] tracking-tight md:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-3xl text-xl font-semibold leading-relaxed text-foreground md:text-2xl">
              {post.abstract}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-background px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 py-10 md:px-8 md:py-14 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[180px_minmax(0,1fr)]">
          <aside className="hidden md:block">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Reading Note</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                This layout is intentionally text-first. Inline components support the argument instead of replacing it.
              </p>
            </div>
          </aside>

          <div className="rounded-[1.75rem] border border-border bg-card/30 px-5 py-8 md:px-10 md:py-10">
            <div className="article-content mx-auto max-w-3xl">{post.content}</div>
          </div>
        </div>
      </div>

      <nav className="border-t border-border">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-12">
          {prevPost ? (
            <Link
              href={`/notes/${prevPost.slug}`}
              className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider">Previous</span>
                <span className="font-medium text-foreground">{prevPost.title}</span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextPost ? (
            <Link
              href={`/notes/${nextPost.slug}`}
              className="group flex items-center gap-2 text-right text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider">Next</span>
                <span className="font-medium text-foreground">{nextPost.title}</span>
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
