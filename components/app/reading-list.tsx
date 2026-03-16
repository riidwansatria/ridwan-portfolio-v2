'use client'

import { AnimatedBackground } from '@/components/app/motion/animated-background'
import { BookCover } from '@/components/app/book-cover'
import type { Book } from '@/lib/bookshelf'

type ReadingListProps = {
  books: Book[]
}

export function ReadingList({ books }: ReadingListProps) {
  return (
    <AnimatedBackground
      className="rounded-lg bg-muted/50"
      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
      enableHover
    >
      {books.map((book) => {
        const progress =
          book.progress != null && book.pages
            ? Math.min(100, Math.round((book.progress / book.pages) * 100))
            : null
        const isFinished = book.status === 'Completed'

        return (
          <div
            key={book.id}
            data-id={book.id}
            className={`block -mx-3 px-3 py-3 rounded-lg transition-opacity ${isFinished ? 'opacity-50 hover:opacity-70' : ''}`}
          >
            <div className="flex gap-4 items-center">
              <div className="shrink-0 w-12 h-[72px] rounded-sm overflow-hidden bg-muted border border-border/40">
                <BookCover src={book.coverUrl} title={book.title} width={48} height={72} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium font-heading text-foreground leading-snug truncate">
                      {book.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{book.author}</p>
                  </div>
                  <span className="shrink-0 text-[11px] text-muted-foreground tabular-nums">
                    {isFinished ? 'Done' : progress != null ? `${progress}%` : ''}
                  </span>
                </div>

                <div className="mt-2.5 h-1 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${isFinished ? 'bg-muted-foreground/40' : 'bg-foreground/60'}`}
                    style={{ width: `${isFinished ? 100 : progress ?? 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </AnimatedBackground>
  )
}
