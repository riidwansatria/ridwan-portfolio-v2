import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { type PortableTextBlock } from 'next-sanity'
import { Suspense } from 'react'

import { sanityFetch } from '@/sanity/lib/live'
import { postPagesSlugs, postQuery, morePostsQuery, adjacentPostsQuery } from '@/sanity/lib/queries'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import { LayoutFigma } from '@/components/note-layouts/layout-figma'

type Props = {
  params: Promise<{ slug: string }>
}

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: postPagesSlugs,
    // Use the published perspective in generateStaticParams
    perspective: 'published',
    stega: false,
  })
  return data
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const { data: post } = await sanityFetch({
    query: postQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  })
  const previousImages = (await parent).openGraph?.images || []
  const ogImage = resolveOpenGraphImage(post?.coverImage)

  return {
    authors:
      post?.author?.firstName && post?.author?.lastName
        ? [{ name: `${post.author.firstName} ${post.author.lastName}` }]
        : [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata
}

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
    <LayoutFigma
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
