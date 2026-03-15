'use client'

import { useState } from 'react'
import { BookCard } from '@/components/app/book-card'
import { AnimatedBackground } from '@/components/app/motion/animated-background'
import type { Book } from '@/lib/bookshelf'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'Reading', label: 'Reading' },
  { key: 'Completed', label: 'Completed' },
  { key: 'Want to Read', label: 'Want to Read' },
]

type BookshelfContentProps = {
  books: Book[]
}

export function BookshelfContent({ books }: BookshelfContentProps) {
  const [active, setActive] = useState('all')

  const filtered = active === 'all' ? books : books.filter((b) => b.status === active)

  const counts: Record<string, number> = { all: books.length }
  for (const b of books) {
    counts[b.status] = (counts[b.status] ?? 0) + 1
  }

  return (
    <div className="border-t border-border space-y-4 pt-4 px-6 overflow-hidden">
      <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
        <AnimatedBackground
          defaultValue={active}
          onValueChange={(id) => { if (id) setActive(id) }}
          className="rounded-full bg-foreground"
          transition={{ type: 'spring', bounce: 0.15, duration: 0.3 }}
        >
          {FILTERS.map((f) => (
            <button
              key={f.key}
              data-id={f.key}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors data-[checked=true]:text-background text-muted-foreground hover:text-foreground"
            >
              {f.label}
              <span className="ml-1.5 text-[10px] tabular-nums opacity-50">
                {counts[f.key] ?? 0}
              </span>
            </button>
          ))}
        </AnimatedBackground>
      </nav>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8">Nothing here yet.</p>
      ) : (
        <div className="-mx-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-y-4">
          <AnimatedBackground
            enableHover
            className="rounded-xl bg-accent/70"
            transition={{ type: 'spring', bounce: 0.15, duration: 0.3 }}
          >
            {filtered.map((book) => (
              <div key={book.id} data-id={book.id} className="flex-col w-full p-3">
                <BookCard book={book} />
              </div>
            ))}
          </AnimatedBackground>
        </div>
      )}
    </div>
  )
}
