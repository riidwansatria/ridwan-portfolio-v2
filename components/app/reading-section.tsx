import { getBooks } from '@/lib/bookshelf'
import { ReadingList } from '@/components/app/reading-list'

export async function ReadingSection() {
  const allBooks = await getBooks()

  const reading = allBooks.filter((b) => b.status === 'Reading')
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const recentlyFinished = allBooks.filter(
    (b) => b.status === 'Completed' && b.dateFinished && new Date(b.dateFinished) >= thirtyDaysAgo
  )
  const books = [...reading, ...recentlyFinished]

  if (books.length === 0) return null

  return <ReadingList books={books} />
}
