'use client'

import { motion, AnimatePresence } from 'motion/react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import Image from 'next/image'
import { ScrollArea } from '@/components/ui/scroll-area'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import type { Book } from '@/lib/bookshelf'

const STATUS_CONFIG: Record<string, { label: string; bg: string }> = {
  Reading: { label: 'Reading', bg: 'bg-blue-600' },
  Completed: { label: 'Done', bg: 'bg-green-600' },
  'Want to Read': { label: 'Want', bg: 'bg-zinc-500' },
}

type BookDetailDialogProps = {
  book: Book
  open: boolean
  origin: { x: number; y: number }
}

export function BookDetailDialog({ book, open, origin }: BookDetailDialogProps) {
  const config = STATUS_CONFIG[book.status] ?? { label: book.status, bg: 'bg-zinc-500' }
  const progress =
    book.progress != null && book.pages
      ? Math.min(100, Math.round((book.progress / book.pages) * 100))
      : null

  return (
    <AnimatePresence>
      {open && (
        <DialogPrimitive.Portal forceMount>
          <DialogPrimitive.Overlay asChild forceMount>
            <motion.div
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
          </DialogPrimitive.Overlay>

          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <DialogPrimitive.Content asChild forceMount>
              <motion.div
                className="relative flex flex-col md:flex-row w-[min(94vw,960px)] h-[min(90vh,820px)] md:h-[min(75vh,700px)] rounded-2xl border border-border bg-background shadow-xl overflow-hidden outline-none"
                initial={{ opacity: 0, scale: 0.4, x: origin.x, y: origin.y }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.4,
                  x: origin.x,
                  y: origin.y,
                  transition: { type: 'spring', bounce: 0.12, duration: 0.45 },
                }}
                transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
              >
                <VisuallyHidden>
                  <DialogPrimitive.Title>{book.title}</DialogPrimitive.Title>
                  <DialogPrimitive.Description>
                    Details about {book.title} by {book.author}
                  </DialogPrimitive.Description>
                </VisuallyHidden>

                {/* Left: cover panel for desktop */}
                <div className="hidden md:block relative h-full w-auto aspect-[2/3] shrink-0 bg-muted overflow-hidden border-r border-border/50">
                  {book.coverUrl ? (
                    <Image
                      src={book.coverUrl}
                      alt={`Cover of ${book.title}`}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 320px, 28vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-muted" />
                  )}
                </div>

                {/* Right: scrollable content */}
                <div className="flex-1 min-w-0 min-h-0 relative">
                  <DialogPrimitive.Close className="absolute right-3 top-3 z-20 rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors outline-none">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </DialogPrimitive.Close>

                  <ScrollArea className="h-full">
                    <div className="p-4 md:p-6 flex flex-col gap-3">
                      {/* Mobile: cover + key metadata in one row */}
                      <div className="md:hidden flex items-center gap-3 pr-8">
                        <div className="relative w-20 aspect-[2/3] shrink-0 rounded-md overflow-hidden bg-muted border border-border/40">
                          {book.coverUrl ? (
                            <Image
                              src={book.coverUrl}
                              alt={`Cover of ${book.title}`}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-muted" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1 flex flex-col gap-2 items-start">
                          <div>
                            <p className="text-base font-heading font-semibold text-foreground leading-snug">
                              {book.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">{book.author}</p>
                          </div>

                          <div className="flex flex-wrap gap-1.5 items-center">
                            <span
                              className={`${config.bg} text-white text-[10px] font-medium px-2 py-0.5 rounded-full`}
                            >
                              {config.label}
                            </span>
                            {book.status === 'Completed' && book.rating && (
                              <span className="text-[11px] text-muted-foreground">{book.rating}</span>
                            )}
                            {book.status === 'Completed' && book.dateFinished && (
                              <span className="text-[10px] text-muted-foreground">
                                {new Date(book.dateFinished).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                })}
                              </span>
                            )}
                          </div>

                          {progress != null && (
                            <div className="flex flex-col gap-1 w-full max-w-[220px]">
                              <div className="flex justify-start items-center gap-1.5">
                                <span className="text-[10px] text-muted-foreground">Progress</span>
                                <span className="text-[10px] text-muted-foreground tabular-nums">
                                  {progress}%
                                </span>
                              </div>
                              <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${config.bg}`}
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="hidden md:block">
                        <p className="text-base font-heading font-semibold text-foreground leading-snug pr-8">
                          {book.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{book.author}</p>
                      </div>

                      {/* Status + date */}
                      <div className="hidden md:flex flex-wrap gap-1.5 items-center">
                        <span
                          className={`${config.bg} text-white text-[10px] font-medium px-2 py-0.5 rounded-full`}
                        >
                          {config.label}
                        </span>
                        {book.status === 'Completed' && book.rating && (
                          <span className="text-[11px] text-muted-foreground">{book.rating}</span>
                        )}
                        {book.status === 'Completed' && book.dateFinished && (
                          <span className="text-[10px] text-muted-foreground">
                            {new Date(book.dateFinished).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                            })}
                          </span>
                        )}
                      </div>

                      {/* Progress bar */}
                      {progress != null && (
                        <div className="hidden md:flex flex-col gap-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-muted-foreground">Progress</span>
                            <span className="text-[10px] text-muted-foreground tabular-nums">
                              {progress}%
                            </span>
                          </div>
                          <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
                            <div
                              className={`h-full rounded-full ${config.bg}`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Genres */}
                      {book.genres.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {book.genres.map((g) => (
                            <span
                              key={g}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground border border-border/30"
                            >
                              {g}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Divider before long-form content */}
                      {(book.description || book.subjects.length > 0 || book.note) && (
                        <div className="border-t border-border/50 pt-3 flex flex-col gap-4">
                          {book.note && (
                            <div>
                              <p className="text-[10px] font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                                My note
                              </p>
                              <div className="rounded-lg border border-border bg-muted/50 px-3.5 py-3 flex flex-col">
                                <p className="text-sm text-foreground/80 italic leading-relaxed">
                                  "{book.note}"
                                </p>
                              </div>
                            </div>
                          )}
                          {book.description && (
                            <div>
                              <p className="text-[10px] font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                                Description
                              </p>
                              <p className="text-sm text-foreground/80 leading-relaxed">
                                {book.description}
                              </p>
                            </div>
                          )}
                          {book.subjects.length > 0 && (
                            <div>
                              <p className="text-[10px] font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                                Subjects
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {book.subjects.map((s) => (
                                  <span
                                    key={s}
                                    className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/30"
                                  >
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </div>
        </DialogPrimitive.Portal>
      )}
    </AnimatePresence>
  )
}
