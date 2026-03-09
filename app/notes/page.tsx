import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { getAllNotes } from "@/lib/content"

function formatCategory(category: string) {
  return category.replace(/-/g, " ")
}

export default function NotesPage() {
  const allNotes = getAllNotes()
  const notesForIndex = allNotes.filter(
    (note) => process.env.NODE_ENV === 'development' || note.status !== 'draft'
  )

  const blogPosts = notesForIndex.map((note, i) => ({
    id: String(i + 1),
    date: new Date(note.date).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }).toUpperCase(),
    title: note.title,
    category: note.category,
    abstract: note.abstract,
    slug: note.slug,
  }))

  return (
    <>
      {/* Page Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-10">
        <div className="grid gap-6 border-b border-border pb-8 md:grid-cols-[120px_minmax(0,1fr)]">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Notes</p>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Prose first, with the interaction kept inline.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Essays, method notes, and policy reads. The writing should still stand on its own
              even if every interactive enhancement fails to load.
            </p>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-16">
        {blogPosts.map((post) => (
          <article key={post.id}>
            <Link
              href={`/notes/${post.slug}`}
              className="group block border-b border-border py-8 transition-colors hover:bg-accent/20 md:px-2 md:py-10"
            >
              <div className="grid gap-3 md:grid-cols-[120px_minmax(0,1fr)_40px] md:gap-12">
                {/* Date */}
                <time className="shrink-0 pt-0.5 text-xs font-medium uppercase tracking-widest text-muted-foreground md:text-sm">
                  {post.date}
                </time>

                {/* Content */}
                <div className="flex-1">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {formatCategory(post.category)}
                    </span>
                  </div>
                  <h2 className="mb-3 text-xl font-medium leading-tight text-foreground transition-colors group-hover:text-foreground/80 md:text-2xl">
                    {post.title}
                  </h2>
                  <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    {post.abstract}
                  </p>
                </div>

                {/* Arrow Icon */}
                <div className="hidden shrink-0 items-center justify-end md:flex">
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 md:h-6 md:w-6" />
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </>
  )
}
