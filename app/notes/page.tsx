import Link from "next/link"
import { getAllNotes } from "@/lib/content"
import { NotesList } from "@/components/app/notes-list"

export default function NotesPage() {
  const allNotes = getAllNotes()
  const notesForIndex = allNotes.filter(
    (note) => process.env.NODE_ENV === 'development' || note.status !== 'draft'
  )

  // Featured: latest 2 notes with featured: true in frontmatter
  const featured = notesForIndex.filter((note) => note.featured).slice(0, 2)

  // Group all notes by year
  const notesByYear = notesForIndex.reduce<Record<string, typeof notesForIndex>>((acc, note) => {
    const year = new Date(note.date).getFullYear().toString()
    if (!acc[year]) acc[year] = []
    acc[year].push(note)
    return acc
  }, {})

  const years = Object.keys(notesByYear).sort((a, b) => Number(b) - Number(a))

  return (
    <div className="max-w-4xl mx-auto px-6 pt-20 pb-16">
      {/* Page Header */}
      <div className="mb-20">
        <h1 className="text-3xl md:text-4xl font-heading font-semibold tracking-tight text-foreground leading-tight">
          Notes
        </h1>
        <p className="mt-4 text-xl leading-relaxed text-muted-foreground">
          Updates and occasional thoughts on cities, transport, and everyday design.
        </p>
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="mb-20">
          <h2 className="text-xs text-muted-foreground uppercase tracking-widest mb-6">Featured</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featured.map((note) => (
              <Link
                key={note.slug}
                href={`/notes/${note.slug}`}
                className="group block rounded-2xl border bg-card p-4 transition-all hover:bg-accent/70 hover:border-foreground/20"
              >
                <h2 className="text-lg font-semibold text-foreground leading-snug mb-3 transition-colors">
                  {note.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-5">
                  {note.abstract}
                </p>
                <time className="text-xs text-muted-foreground">
                  {new Date(note.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                  })}
                </time>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Year-grouped archive */}
      <section>
        {featured.length === 0 && (
          <hr className="border-t border-border mb-10" />
        )}
        <h2 className="text-xs text-muted-foreground uppercase tracking-widest mb-6">All Notes</h2>
        {years.map((year, i) => (
          <div key={year}>
            <div className="flex flex-col md:flex-row md:gap-12">
              {/* Year label */}
              <div className="md:w-15 shrink-0 mb-4 md:mb-0 md:pt-3">
                <span className="text-sm font-medium text-muted-foreground">{year}</span>
              </div>

              {/* Posts list */}
              <div className="flex-1 flex flex-col gap-1">
                <NotesList posts={notesByYear[year]} variant="archive" />
              </div>
            </div>

            {i < years.length - 1 && (
              <hr className="border-t border-dashed border-border my-10" />
            )}
          </div>
        ))}
      </section>
    </div>
  )
}
