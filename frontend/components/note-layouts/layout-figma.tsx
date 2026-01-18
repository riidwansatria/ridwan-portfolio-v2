"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { type PortableTextBlock } from "next-sanity"
import PortableText from "@/app/components/PortableText"
import { urlForImage } from "@/sanity/lib/utils"

interface Post {
    title: string
    slug: string
    date: string
    excerpt?: string
    coverImage?: any
    author?: {
        firstName: string
        lastName: string
        picture?: any
    } | null
    content: PortableTextBlock[]
    tags?: string[]
    category?: string
}

interface FigmaLayoutProps {
    post: Post
    relatedPosts?: {
        title: string
        slug: string
        date: string
        excerpt?: string
        coverImage?: any
        category?: string
    }[]
}

export function LayoutFigma({ post, relatedPosts }: FigmaLayoutProps) {
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    })

    const [showAllTags, setShowAllTags] = useState(false)

    return (
        <article className="min-h-screen bg-background text-foreground">
            <header className="text-foreground pt-16 pb-16 px-6 md:px-12 relative overflow-hidden border-b bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="mx-auto relative z-10 flex flex-col justify-between">
                    <div>
                        {/* Date and Category */}
                        <div className="mb-8">
                            <span className="font-mono text-xs tracking-[0.2em] uppercase text-foreground/60">
                                {formattedDate}
                                {post.category && ` • ${post.category}`}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight leading-[1.05] max-w-5xl">
                            {post.title}
                        </h1>
                    </div>

                    {/* Bottom Meta */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-4 pt-8">
                        {/* Author */}
                        <div className="flex items-center gap-4">
                            {post.author && (
                                <>
                                    <div className="h-10 w-10 relative overflow-hidden rounded-full ring-2 ring-white/10">
                                        {post.author.picture ? (
                                            <Image
                                                src={urlForImage(post.author.picture)?.url() || ''}
                                                alt={post.author.firstName}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                                                {post.author.firstName[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm tracking-wide">
                                            {post.author.firstName} {post.author.lastName}
                                        </span>
                                        <span className="text-xs text-foreground/50 uppercase tracking-wider">
                                            Author
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Tags + Share */}
                        <div className="flex items-center gap-4">
                            {post.tags && (
                                <div className="flex flex-wrap gap-2 items-center">
                                    <AnimatePresence mode="popLayout" initial={false}>
                                        {(showAllTags ? post.tags : post.tags.slice(0, 3)).map(tag => (
                                            <motion.span
                                                key={tag}
                                                layout
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                transition={{ duration: 0.2 }}
                                                className="px-4 py-1.5 rounded-full border border-border text-xs font-medium tracking-wide text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-default bg-background"
                                            >
                                                {tag}
                                            </motion.span>
                                        ))}
                                        {post.tags.length > 3 && (
                                            <motion.button
                                                layout
                                                key="toggle-button"
                                                onClick={() => setShowAllTags(!showAllTags)}
                                                className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors bg-background"
                                                title={showAllTags ? "Show less" : `Show ${post.tags.length - 3} more tags`}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <span className="sr-only">{showAllTags ? "Show less" : "More tags"}</span>
                                                <AnimatePresence mode="wait" initial={false}>
                                                    {showAllTags ? (
                                                        <motion.svg
                                                            key="close"
                                                            initial={{ rotate: -90, opacity: 0 }}
                                                            animate={{ rotate: 0, opacity: 1 }}
                                                            exit={{ rotate: 90, opacity: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                                        >
                                                            <path d="M12 4L4 12" />
                                                            <path d="M4 4L12 12" />
                                                        </motion.svg>
                                                    ) : (
                                                        <motion.svg
                                                            key="more"
                                                            initial={{ rotate: 90, opacity: 0 }}
                                                            animate={{ rotate: 0, opacity: 1 }}
                                                            exit={{ rotate: -90, opacity: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            width="16" height="16" viewBox="0 0 16 16" fill="currentColor"
                                                        >
                                                            <circle cx="2" cy="8" r="1.5" />
                                                            <circle cx="8" cy="8" r="1.5" />
                                                            <circle cx="14" cy="8" r="1.5" />
                                                        </motion.svg>
                                                    )}
                                                </AnimatePresence>
                                            </motion.button>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Excerpt Section */}
            <div className="py-16 px-6 md:px-12 lg:px-24">
                <div className="max-w-3xl mx-auto">
                    <p className="text-2xl md:text-3xl text-foreground font-semibold font-stretch-extra-condensed">
                        {post.excerpt}
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="px-6 md:px-12 pb-40">
                {/* Article Text */}
                <div className="max-w-3xl mx-auto">
                    <main className="article-content">
                        {post.content && (
                            <PortableText value={post.content} />
                        )}
                    </main>
                </div>
            </div>


            {/* Related Articles */}
            {relatedPosts && relatedPosts.length > 0 && (
                <section className="border-t border-border bg-muted/30">
                    <div className="max-w-7xl mx-auto px-6 py-16">
                        <h2 className="text-2xl font-bold mb-8">Related articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedPosts.slice(0, 3).map(related => {
                                const relatedImageUrl = related.coverImage ? urlForImage(related.coverImage)?.url() : null
                                return (
                                    <Link
                                        key={related.slug}
                                        href={`/posts/${related.slug}`}
                                        className="group flex flex-col rounded-xl overflow-hidden bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all"
                                    >
                                        {relatedImageUrl && (
                                            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                                                <Image
                                                    src={relatedImageUrl}
                                                    alt={related.title}
                                                    fill
                                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </div>
                                        )}
                                        <div className="p-5 flex flex-col gap-3 flex-1">
                                            {related.category && (
                                                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                                                    {related.category}
                                                </span>
                                            )}
                                            <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                                                {related.title}
                                            </h3>
                                            {related.excerpt && (
                                                <p className="text-sm text-muted-foreground line-clamp-2">
                                                    {related.excerpt}
                                                </p>
                                            )}
                                            <div className="mt-auto pt-3">
                                                <span className="text-xs text-muted-foreground">
                                                    {new Date(related.date).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </section>
            )}
        </article>
    )
}
