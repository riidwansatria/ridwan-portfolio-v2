import { compileMDX } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import Link from 'next/link'
import remarkGfm from 'remark-gfm'
import type { ComponentPropsWithoutRef } from 'react'

// ---------------------------------------------------------------------------
// Custom MDX Components
// ---------------------------------------------------------------------------

function MdxImage(props: ComponentPropsWithoutRef<typeof Image>) {
  return (
    <figure className="my-8">
      <Image
        {...props}
        className="rounded-lg border border-border"
        sizes="(min-width: 768px) 720px, 100vw"
      />
      {props.alt && props.alt !== 'image' && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {props.alt}
        </figcaption>
      )}
    </figure>
  )
}

function MdxLink(props: ComponentPropsWithoutRef<'a'>) {
  const href = props.href ?? ''
  if (href.startsWith('/')) {
    return <Link href={href} {...props} />
  }
  if (href.startsWith('#')) {
    return <a {...props} />
  }
  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function Callout({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' | 'tip' }) {
  const styles = {
    info: 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50',
    warning: 'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/50',
    tip: 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50',
  }
  return (
    <div className={`my-6 rounded-lg border p-4 ${styles[type]}`}>
      {children}
    </div>
  )
}

function ImageGallery({ children, columns = 2 }: { children: React.ReactNode; columns?: number }) {
  return (
    <div className={`my-8 grid gap-4 grid-cols-1 md:grid-cols-${columns}`}>
      {children}
    </div>
  )
}

const mdxComponents = {
  Image: MdxImage,
  img: MdxImage as any,
  a: MdxLink,
  Callout,
  ImageGallery,
}

// ---------------------------------------------------------------------------
// Compiler
// ---------------------------------------------------------------------------

export async function renderMdx(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
      },
    },
  })
  return content
}
