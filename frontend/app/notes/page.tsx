import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { getAllNotes } from "@/lib/content"

export default function NotesPage() {
  const allNotes = getAllNotes()

  const blogPosts = allNotes.map((note, i) => ({
    id: String(i + 1),
    date: new Date(note.date).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }).toUpperCase(),
    title: note.title,
    category: note.category || '',
    slug: note.slug,
  }))

  return (
    <>
      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Notes</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Updates and occasional thoughts on cities, transport, and everyday design.
        </p>
      </div>

      {/* Posts List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
        {blogPosts.map((post) => (
          <article key={post.id}>
            <Link
              href={`/notes/${post.slug}`}
              className="group block border-b border-border md:px-2 py-8 transition-colors hover:bg-accent/30 md:py-10"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-12">
                {/* Date */}
                <time className="shrink-0 text-xs font-medium uppercase tracking-widest text-muted-foreground md:w-32 md:text-sm md:pt-0.5">
                  {post.date}
                </time>

                {/* Content */}
                <div className="flex-1">
                  <h2 className="mb-3 text-xl font-medium leading-tight text-foreground transition-colors group-hover:text-foreground/80 md:text-2xl">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground md:text-base">{post.category}</p>
                </div>

                {/* Arrow Icon */}
                <div className="hidden md:flex shrink-0 items-center justify-end md:w-12">
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
