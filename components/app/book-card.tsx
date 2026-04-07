'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { BookDetailDialog } from '@/components/app/book-dialog'
import type { Book } from '@/lib/bookshelf'

const STATUS_CONFIG: Record<string, { label: string; bg: string }> = {
  Reading: { label: 'Reading', bg: 'bg-blue-600' },
  Completed: { label: 'Done', bg: 'bg-green-600' },
  'Want to Read': { label: 'Want', bg: 'bg-zinc-500' },
}

function Cover({ src, title }: { src: string | null; title: string }) {
  if (!src) return <div className="absolute inset-0 bg-muted border border-border/30" />
  return (
    <Image
      src={src}
      alt={`Cover of ${title}`}
      fill
      className="object-cover"
      sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
    />
  )
}

type BookCardProps = {
  book: Book
  variant?: 'card' | 'list'
}

export function BookCard({ book, variant = 'card' }: BookCardProps) {
  const [open, setOpen] = useState(false)
  const [origin, setOrigin] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLButtonElement>(null)

  const config = STATUS_CONFIG[book.status] ?? { label: book.status, bg: 'bg-zinc-500' }
  const progress =
    book.progress != null && book.pages
      ? Math.min(100, Math.round((book.progress / book.pages) * 100))
      : null

  const handleOpen = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setOrigin({
        x: rect.left + rect.width / 2 - window.innerWidth / 2,
        y: rect.top + rect.height / 2 - window.innerHeight / 2,
      })
    }
    setOpen(true)
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button ref={triggerRef} onClick={handleOpen} className="w-full text-left cursor-pointer">
          {variant === 'card' ? (
            <CardLayout book={book} config={config} progress={progress} />
          ) : (
            <ListLayout book={book} progress={progress} />
          )}
        </button>
      </DialogPrimitive.Trigger>

      <BookDetailDialog book={book} open={open} origin={origin} />
    </DialogPrimitive.Root>
  )
}

/* ── Card variant (grid) ──────────────────────────────────── */

function CardLayout({
  book,
  config,
  progress,
}: {
  book: Book
  config: { label: string; bg: string }
  progress: number | null
}) {
  const badgeLabel =
    book.status === 'Completed'
      ? config.label
      : progress != null && progress > 0
        ? `${progress}%`
        : config.label

  return (
    <div className="flex flex-col group w-full">
      <div className="relative w-full aspect-2/3 rounded-md bg-muted overflow-hidden border border-border/40 group-hover:border-foreground/20 transition-all">
        <Cover src={book.coverUrl} title={book.title} />
        <div
          className={`absolute top-0 right-0 ${config.bg} text-white text-[10px] font-medium px-1.5 py-0.5 rounded-bl-md z-10 tabular-nums`}
        >
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

/* ── List variant (reading section) ───────────────────────── */

function ListLayout({ book, progress }: { book: Book; progress: number | null }) {
  const isFinished = book.status === 'Completed'

  return (
    <div className="px-3 py-3">
      <div
        className={`flex gap-4 items-center transition-opacity ${isFinished ? 'opacity-50 hover:opacity-70' : ''}`}
      >
        <div className="relative shrink-0 w-12 h-18 rounded-sm overflow-hidden bg-muted border border-border/40">
          <Cover src={book.coverUrl} title={book.title} />
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
              style={{ width: `${isFinished ? 100 : (progress ?? 0)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
