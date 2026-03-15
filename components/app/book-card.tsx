import { BookCover } from '@/components/app/book-cover'
import type { Book } from '@/lib/bookshelf'

const STATUS_CONFIG: Record<string, { label: string; bg: string }> = {
  Reading: { label: 'Reading', bg: 'bg-blue-600' },
  Completed: { label: 'Done', bg: 'bg-green-600' },
  'Want to Read': { label: 'Want', bg: 'bg-zinc-500' },
}

type BookCardProps = {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  const config = STATUS_CONFIG[book.status] ?? { label: book.status, bg: 'bg-zinc-500' }
  const progress =
    book.progress != null && book.pages
      ? Math.min(100, Math.round((book.progress / book.pages) * 100))
      : null

  const badgeLabel = progress != null && progress > 0 ? `${progress}%` : config.label

  return (
    <div className="flex flex-col group w-full">
      <div className="relative w-full aspect-[2/3] rounded-md bg-muted overflow-hidden border border-border/40 group-hover:border-foreground/20 transition-all">
        <BookCover src={book.coverUrl} title={book.title} fill />
        <div className={`absolute top-0 right-0 ${config.bg} text-white text-[10px] font-medium px-1.5 py-0.5 rounded-bl-md z-10 tabular-nums`}>
          {badgeLabel}
        </div>
      </div>
      <div className="mt-2.5 flex flex-col px-0.5">
        <h3 className="text-[13px] font-heading font-medium text-foreground leading-snug line-clamp-2">
          {book.title}
        </h3>
        <p className="mt-0.5 text-[11px] text-muted-foreground truncate">{book.author}</p>
      </div>
    </div>
  )
}
