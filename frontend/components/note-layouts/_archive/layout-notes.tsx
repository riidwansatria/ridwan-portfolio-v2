"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Clock, Share2, ArrowUp, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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

interface NotesLayoutProps {
    post: Post
    relatedPosts?: {
        title: string
        slug: string
        date: string
        excerpt?: string
        coverImage?: any
        category?: string
    }[]
    prevPost?: { title: string; slug: string } | null
    nextPost?: { title: string; slug: string } | null
}

// Estimate reading time (rough: 200 words per minute)
function estimateReadingTime(content: PortableTextBlock[]): number {
    const text = content
        ?.filter(block => block._type === 'block')
        .map(block => (block.children as any[])?.map(child => child.text || '').join(' '))
        .join(' ') || ''
    const wordCount = text.split(/\s+/).filter(Boolean).length
    return Math.max(1, Math.ceil(wordCount / 200))
}

export function LayoutNotes({ post, relatedPosts, prevPost, nextPost }: NotesLayoutProps) {
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    }).toUpperCase()

    const readingTime = estimateReadingTime(post.content)
    const coverImageUrl = post.coverImage ? urlForImage(post.coverImage)?.url() : null

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const copyLink = async () => {
        await navigator.clipboard.writeText(window.location.href)
    }

    const share = async () => {
        if (navigator.share) {
            await navigator.share({ title: post.title, url: window.location.href })
        } else {
            copyLink()
        }
    }

    return (
        <article className="min-h-screen bg-background">
            {/* Back Navigation - Full Width */}
            <nav className="max-w-7xl mx-auto px-6 pt-8">
                <Link
                    href="/notes"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    <span className="font-mono text-xs">Back to Notes</span>
                </Link>
            </nav>

            {/* Main Layout: Sidebar + Content */}
            <div className="max-w-7xl mx-auto px-6 pt-12 lg:grid lg:grid-cols-[200px_1fr] lg:gap-16 xl:grid-cols-[240px_1fr] xl:gap-24">

                {/* Left Sidebar - Sticky Metadata */}
                <aside className="hidden lg:block">
                    <div className="sticky top-24 space-y-8">
                        {/* Date */}
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-mono">Published</span>
                            <div className="font-mono text-sm text-foreground">{formattedDate}</div>
                        </div>

                        {/* Reading Time */}
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-mono">Read Time</span>
                            <div className="flex items-center gap-1.5 font-mono text-sm text-foreground">
                                <Clock className="h-3.5 w-3.5" />
                                {readingTime} min
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-border" />

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="space-y-2">
                                <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-mono">Topics</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {post.tags.map(tag => (
                                        <Badge key={tag} variant="outline" className="font-mono text-[10px] px-2 py-0.5">
                                            #{tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Category */}
                        {post.category && (
                            <div className="space-y-1">
                                <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-mono">Category</span>
                                <Badge variant="secondary" className="font-mono text-xs uppercase tracking-wider">
                                    {post.category}
                                </Badge>
                            </div>
                        )}

                        {/* Divider */}
                        <div className="border-t border-border" />

                        {/* Actions */}
                        <div className="space-y-2">
                            <button
                                onClick={share}
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full"
                            >
                                <Share2 className="h-4 w-4" />
                                <span className="font-mono text-xs uppercase tracking-wider">Share</span>
                            </button>
                            <button
                                onClick={copyLink}
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full"
                            >
                                <Link2 className="h-4 w-4" />
                                <span className="font-mono text-xs uppercase tracking-wider">Copy Link</span>
                            </button>
                            <button
                                onClick={scrollToTop}
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full"
                            >
                                <ArrowUp className="h-4 w-4" />
                                <span className="font-mono text-xs uppercase tracking-wider">Back to Top</span>
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Right Content Area */}
                <div className="max-w-2xl">
                    {/* Header */}
                    <header className="pb-8">
                        {/* Mobile-only metadata */}
                        <div className="flex flex-wrap items-center gap-3 mb-6 lg:hidden">
                            {post.category && (
                                <Badge variant="secondary" className="font-mono text-xs uppercase tracking-wider">
                                    {post.category}
                                </Badge>
                            )}
                            <span className="text-xs text-muted-foreground font-mono">{formattedDate}</span>
                            <span className="text-border">•</span>
                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                                <Clock className="h-3.5 w-3.5" />
                                {readingTime} min read
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.1] mb-4">
                            {post.title}
                        </h1>

                        {/* Excerpt */}
                        {post.excerpt && (
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {post.excerpt}
                            </p>
                        )}

                        {/* Author */}
                        {post.author && (
                            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
                                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                                    {post.author.firstName[0]}{post.author.lastName[0]}
                                </div>
                                <div>
                                    <div className="text-sm font-medium">
                                        {post.author.firstName} {post.author.lastName}
                                    </div>
                                    <div className="text-xs text-muted-foreground">Author</div>
                                </div>
                            </div>
                        )}
                    </header>

                    {/* Cover Image - Breaks out wider */}
                    {coverImageUrl && (
                        <div className="mb-12 -mx-6 lg:mx-0 lg:-mr-24 xl:-mr-32">
                            <div className="relative aspect-video w-full overflow-hidden rounded-none lg:rounded-lg border-y lg:border border-border bg-muted">
                                <Image
                                    src={coverImageUrl}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    )}

                    {/* Article Content */}
                    <div className="article-content">
                        {post.content && (
                            <PortableText value={post.content} />
                        )}
                    </div>

                    {/* Mobile Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-12 lg:hidden">
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map(tag => (
                                    <Badge key={tag} variant="outline" className="font-mono text-xs">
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Article Footer */}
                    <div className="mt-16">
                        <div className="border-t border-border pt-8 flex flex-wrap justify-between items-center gap-4">
                            <span className="text-sm text-muted-foreground">End of Article</span>
                            <div className="flex gap-4 lg:hidden">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-muted-foreground hover:text-foreground gap-2"
                                    onClick={share}
                                >
                                    <Share2 className="h-4 w-4" />
                                    <span className="font-mono text-xs uppercase tracking-wider">Share</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-muted-foreground hover:text-foreground gap-2"
                                    onClick={scrollToTop}
                                >
                                    <ArrowUp className="h-4 w-4" />
                                    <span className="font-mono text-xs uppercase tracking-wider">Top</span>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Post Navigation */}
                    {(prevPost || nextPost) && (
                        <div className="mt-12">
                            <div className="grid grid-cols-2 gap-4">
                                {prevPost ? (
                                    <Link
                                        href={`/posts/${prevPost.slug}`}
                                        className="group flex flex-col gap-1 p-4 rounded-lg border border-border bg-card hover:bg-secondary/50 transition-colors"
                                    >
                                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono flex items-center gap-1">
                                            <ArrowLeft className="h-3 w-3" />
                                            Previous
                                        </span>
                                        <span className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                                            {prevPost.title}
                                        </span>
                                    </Link>
                                ) : <div />}
                                {nextPost && (
                                    <Link
                                        href={`/posts/${nextPost.slug}`}
                                        className="group flex flex-col gap-1 p-4 rounded-lg border border-border bg-card hover:bg-secondary/50 transition-colors text-right"
                                    >
                                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono flex items-center gap-1 justify-end">
                                            Next
                                            <ArrowRight className="h-3 w-3" />
                                        </span>
                                        <span className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                                            {nextPost.title}
                                        </span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Related Posts */}
                    {relatedPosts && relatedPosts.length > 0 && (
                        <section className="mt-16 pb-20">
                            <h2 className="text-lg font-semibold mb-6">Related Posts</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {relatedPosts.slice(0, 2).map(related => {
                                    const relatedImageUrl = related.coverImage ? urlForImage(related.coverImage)?.url() : null
                                    return (
                                        <Link
                                            key={related.slug}
                                            href={`/posts/${related.slug}`}
                                            className="group flex flex-col rounded-lg border border-border bg-card overflow-hidden hover:border-primary/30 transition-colors"
                                        >
                                            {relatedImageUrl && (
                                                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                                                    <Image
                                                        src={relatedImageUrl}
                                                        alt={related.title}
                                                        fill
                                                        className="object-cover transition-transform group-hover:scale-105"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-4 flex flex-col gap-2">
                                                {related.category && (
                                                    <span className="text-[10px] uppercase tracking-widest text-primary font-mono">
                                                        {related.category}
                                                    </span>
                                                )}
                                                <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                                                    {related.title}
                                                </h3>
                                                <span className="text-xs text-muted-foreground font-mono">
                                                    {new Date(related.date).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </section>
                    )}

                    {/* Bottom Padding when no related */}
                    {(!relatedPosts || relatedPosts.length === 0) && (
                        <div className="pb-20" />
                    )}
                </div>
            </div>
        </article>
    )
}
