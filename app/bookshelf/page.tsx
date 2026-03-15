import { getBooks } from '@/lib/bookshelf'
import { BookshelfContent } from '@/components/app/bookshelf-tabs'

export const revalidate = 3600

export default async function BookshelfPage() {
  const books = await getBooks()

  return (
    <div className="pb-20">
      <div className="space-y-8">
        <BookshelfContent books={books} />
      </div>
    </div>
  )
}
