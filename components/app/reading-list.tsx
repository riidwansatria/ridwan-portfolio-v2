'use client'

import { AnimatedBackground } from '@/components/app/motion/animated-background'
import { BookCard } from '@/components/app/book-card'
import type { Book } from '@/lib/bookshelf'

export function ReadingList({ books }: { books: Book[] }) {
  return (
    <AnimatedBackground
      className="rounded-lg bg-muted/50"
      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
      enableHover
    >
      {books.map((book) => (
        <div key={book.id} data-id={book.id} className="block -mx-3">
          <BookCard book={book} variant="list" />
        </div>
      ))}
    </AnimatedBackground>
  )
}
