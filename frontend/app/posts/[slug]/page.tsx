import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { type PortableTextBlock } from 'next-sanity'
import { Suspense } from 'react'

import { sanityFetch } from '@/sanity/lib/live'
import { postPagesSlugs, postQuery, morePostsQuery, adjacentPostsQuery } from '@/sanity/lib/queries'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import { LayoutArticle } from '@/components/note-layouts/layout-article'

type Props = {
  params: Promise<{ slug: string }>
}

// ... existing code ...

export default async function PostPage(props: Props) {
  const params = await props.params

  const [{ data: post }, { data: relatedPosts }] = await Promise.all([
    sanityFetch({ query: postQuery, params }),
    sanityFetch({ query: morePostsQuery, params: { skip: '', limit: 4 } }),
  ])

  if (!post?._id) {
    return notFound()
  }

  // Filter out current post from related and limit to 3 for the grid
  const filteredRelated = relatedPosts
    ?.filter((p: any) => p._id !== post._id)
    .slice(0, 3)
    .map((p: any) => ({
      title: p.title,
      slug: p.slug,
      date: p.date,
      excerpt: p.excerpt,
      coverImage: p.coverImage,
      category: p.category,
    }))

  return (
    <LayoutArticle
      post={{
        title: post.title,
        slug: post.slug,
        date: post.date,
        excerpt: post.excerpt || undefined,
        coverImage: post.coverImage,
        author: post.author,
        content: (post.content || []) as PortableTextBlock[],
        tags: (post as any).tags,
        category: (post as any).category,
      }}
      relatedPosts={filteredRelated}
    />
  )
}
