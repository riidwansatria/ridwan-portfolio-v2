import { getFeaturedBooks } from '@/lib/bookshelf'
import { BookCover } from '@/components/app/book-cover'

export async function ReadingSection() {
  const books = await getFeaturedBooks()

  if (books.length === 0) return null

  return (
    <div className="space-y-4">
      {books.map((book) => (
        <div key={book.id} className="flex gap-3 items-center">
          <BookCover src={book.coverUrl} title={book.title} width={40} height={60} />
          <div>
            <p className="text-sm font-medium font-heading text-foreground leading-snug">
              {book.title}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{book.author}</p>
            <p className="text-xs font-mono text-muted-foreground mt-0.5">{book.status}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
