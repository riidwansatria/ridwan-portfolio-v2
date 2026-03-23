import { unstable_cache } from 'next/cache'
import { Client, isFullPage } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

const DB_ID = process.env.NOTION_BOOKSHELF_DB_ID ?? 'NOTION_BOOKSHELF_DB_ID'

export type BookStatus = 'Reading' | 'Completed' | 'Want to Read'

export type Book = {
  id: string
  title: string
  author: string
  status: string
  rating: string | null
  isbn: string | null
  genres: string[]
  dateFinished: string | null
  note: string | null
  featured: boolean
  coverUrl: string | null
  progress: number | null
  pages: number | null
  description: string | null
  subjects: string[]
}

type BookMeta = { coverUrl: string | null; description: string | null; subjects: string[] }

async function fetchGoogleBooksData(cleanIsbn: string): Promise<BookMeta> {
  const key = process.env.GOOGLE_BOOKS_KEY
  const url = key
    ? `https://www.googleapis.com/books/v1/volumes?q=isbn:${cleanIsbn}&key=${key}`
    : `https://www.googleapis.com/books/v1/volumes?q=isbn:${cleanIsbn}`

  let lastError: unknown = null

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url, { cache: 'no-store' })
      if (!res.ok) {
        lastError = new Error(`Google Books API returned ${res.status}`)
        if (attempt < 1) {
          await new Promise((r) => setTimeout(r, 1000))
          continue
        }
        throw lastError
      }

      const data = await res.json()
      const info = data.items?.[0]?.volumeInfo
      if (!info) return { coverUrl: null, description: null, subjects: [] }

      const raw: string | undefined = info.imageLinks?.thumbnail
      const coverUrl = raw
        ? raw
            .replace('http://', 'https://')
            .replace('&edge=curl', '')
            .replace('zoom=1', 'zoom=0')
        : null

      return {
        coverUrl,
        description: info.description ?? null,
        subjects: info.categories ?? [],
      }
    } catch (err) {
      lastError = err
      if (attempt < 1) {
        await new Promise((r) => setTimeout(r, 1000))
        continue
      }
    }
  }

  throw lastError ?? new Error('Google Books fetch failed')
}

/** Per-ISBN cache — book metadata rarely changes, so use a 7-day TTL */
const getBookMetadata = unstable_cache(
  async (isbn: string): Promise<BookMeta> => {
    return fetchGoogleBooksData(isbn.replace(/-/g, ''))
  },
  ['book-metadata'],
  { revalidate: 604800 }
)

function richText(prop: PageObjectResponse['properties'][string]): string {
  if (prop.type === 'rich_text') return prop.rich_text[0]?.plain_text ?? ''
  if (prop.type === 'title') return prop.title[0]?.plain_text ?? ''
  return ''
}

function select(prop: PageObjectResponse['properties'][string]): string | null {
  if (prop.type === 'select') return prop.select?.name ?? null
  return null
}

function multiSelect(prop: PageObjectResponse['properties'][string]): string[] {
  if (prop.type === 'multi_select') return prop.multi_select.map((g) => g.name)
  return []
}

function dateStart(prop: PageObjectResponse['properties'][string]): string | null {
  if (prop.type === 'date') return prop.date?.start ?? null
  return null
}

function checkbox(prop: PageObjectResponse['properties'][string]): boolean {
  if (prop.type === 'checkbox') return prop.checkbox
  return false
}

function number(prop: PageObjectResponse['properties'][string]): number | null {
  if (prop.type === 'number') return prop.number
  return null
}

async function pageToBook(page: PageObjectResponse): Promise<Book> {
  const p = page.properties
  const isbn = (p.ISBN ? richText(p.ISBN) : '') || null

  let meta: BookMeta = { coverUrl: null, description: null, subjects: [] }
  if (isbn) {
    try {
      meta = await getBookMetadata(isbn)
    } catch {
      // API failed after retry — this book renders without cover/description
      // but the per-ISBN cache is NOT updated with nulls, so the next
      // revalidation will try the API again instead of serving cached nulls.
    }
  }

  return {
    id: page.id,
    title: p.Title ? richText(p.Title) : '',
    author: p.Author ? richText(p.Author) : '',
    status: p.Status ? (select(p.Status) ?? '') : '',
    rating: p.Rating ? select(p.Rating) : null,
    isbn,
    genres: p.Genre ? multiSelect(p.Genre) : [],
    dateFinished: p['Date Finished'] ? dateStart(p['Date Finished']) : null,
    note: p.Note ? richText(p.Note) || null : null,
    featured: p.Featured ? checkbox(p.Featured) : false,
    coverUrl: meta.coverUrl,
    progress: p.Progress ? number(p.Progress) : null,
    pages: p.Pages ? number(p.Pages) : null,
    description: meta.description,
    subjects: meta.subjects,
  }
}

const STATUS_ORDER: Record<string, number> = {
  Reading: 0,
  Completed: 1,
  'Want to Read': 2,
}

function sortBooks(books: Book[]): Book[] {
  return books.sort((a, b) => {
    const sa = STATUS_ORDER[a.status] ?? 9
    const sb = STATUS_ORDER[b.status] ?? 9
    if (sa !== sb) return sa - sb

    // Reading: sort by progress descending (furthest along first)
    if (a.status === 'Reading') {
      const pa = a.pages ? (a.progress ?? 0) / a.pages : 0
      const pb = b.pages ? (b.progress ?? 0) / b.pages : 0
      return pb - pa
    }

    // Completed: sort by date finished descending
    if (a.status === 'Completed') {
      const da = a.dateFinished ?? ''
      const db = b.dateFinished ?? ''
      return db.localeCompare(da)
    }

    return 0
  })
}

function getClient(): Client | null {
  if (!process.env.NOTION_TOKEN) return null
  return new Client({ auth: process.env.NOTION_TOKEN })
}

export const getBooks = unstable_cache(
  async (status?: BookStatus): Promise<Book[]> => {
    const notion = getClient()
    if (!notion) return []

    try {
      const filter = status
        ? { property: 'Status', select: { equals: status } }
        : undefined

      const res = await notion.dataSources.query({
        data_source_id: DB_ID,
        ...(filter ? { filter } : {}),
      })

      const pages = res.results.filter(isFullPage)
      const books = await Promise.all(pages.map(pageToBook))
      return sortBooks(books)
    } catch {
      return []
    }
  },
  ['getBooks'],
  { revalidate: 3600 }
)

export const getFeaturedBooks = unstable_cache(
  async (): Promise<Book[]> => {
    const notion = getClient()
    if (!notion) return []

    try {
      const res = await notion.dataSources.query({
        data_source_id: DB_ID,
        filter: { property: 'Featured', checkbox: { equals: true } },
        page_size: 3,
      })

      const pages = res.results.filter(isFullPage)
      return Promise.all(pages.map(pageToBook))
    } catch {
      return []
    }
  },
  ['getFeaturedBooks'],
  { revalidate: 3600 }
)
