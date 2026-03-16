export const revalidate = 3600

import { Suspense } from 'react'
import { getBooks } from '@/lib/bookshelf'
import { BookshelfContent } from '@/components/app/bookshelf-tabs'
import BookshelfLoading from './loading'

async function BookshelfData() {
  const books = await getBooks()
  return <BookshelfContent books={books} />
}

export default function BookshelfPage() {
  return (
    <div className="pb-20">
      <div className="space-y-8">
        <Suspense fallback={<BookshelfLoading />}>
          <BookshelfData />
        </Suspense>
      </div>
    </div>
  )
}
