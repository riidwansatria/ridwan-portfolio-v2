'use client'

import Link from 'next/link'
import { AnimatedBackground } from '@/components/app/visual/animated-background'

type NoteItem = {
  slug: string
  title: string
  date: string
}

type Variant = 'default' | 'compact' | 'archive'

export function NotesList({ posts, variant = 'default' }: { posts: NoteItem[]; variant?: Variant }) {
  return (
    <AnimatedBackground
      enableHover
      className="rounded-lg bg-accent/70"
      transition={{ type: 'spring', bounce: 0.15, duration: 0.3 }}
    >
      {posts.map((post, i) => (
        <Link
          key={post.slug}
          data-id={post.slug}
          href={`/notes/${post.slug}`}
          className={`block -mx-3 px-3 py-3 ${variant === 'default' && i > 0 ? 'border-t border-border/60' : ''}`}
        >
          {variant === 'archive' ? (
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4">
              <h2 className="text-lg font-medium text-foreground leading-snug">{post.title}</h2>
              <time className="text-sm text-muted-foreground shrink-0">
                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </time>
            </div>
          ) : variant === 'compact' ? (
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-sm font-medium text-foreground leading-snug">{post.title}</p>
              <p className="text-xs text-muted-foreground shrink-0">{post.date}</p>
            </div>
          ) : (
            <>
              <p className="text-base font-medium text-foreground leading-snug">{post.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{post.date}</p>
            </>
          )}
        </Link>
      ))}
    </AnimatedBackground>
  )
}
