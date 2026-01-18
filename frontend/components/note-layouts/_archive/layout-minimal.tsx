"use client"

import Link from "next/link"
import { ArrowLeft, Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type PortableTextBlock } from "next-sanity"
import PortableText from "@/app/components/PortableText"
import CoverImage from "@/app/components/CoverImage"

interface MinimalLayoutProps {
    post: {
        title: string
        date: string
        author?: {
            firstName: string
            lastName: string
            picture?: any
        }
        coverImage?: any
        content: PortableTextBlock[]
        tags?: string[]
        category?: string
    }
}

export function LayoutMinimal({ post }: MinimalLayoutProps) {
    // Format date nicely
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    })

    return (
        <article className="min-h-screen bg-background text-foreground pb-24">
            {/* Navigation Header - Minimal */}
            <nav className="w-full py-6 md:py-12">
                <div className="max-w-2xl mx-auto px-6 flex items-center justify-between">
                    <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground -ml-2 p-0 hover:bg-transparent font-mono">
                        <Link href="/notes" className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            <span>back</span>
                        </Link>
                    </Button>
                </div>
            </nav>

            <main className="max-w-2xl mx-auto px-6">
                {/* Header */}
                <header className="mb-12 md:mb-16">
                    <div className="flex flex-col gap-4">
                        {/* Meta Top */}
                        <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground uppercase tracking-wider">
                            <span>{formattedDate}</span>
                            <span>•</span>
                            <span className="text-primary">{post.category || 'Note'}</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                            {post.title}
                        </h1>

                        {/* Author & Read Time Inline */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono mt-2">
                            {post.author && (
                                <span>{post.author.firstName} {post.author.lastName}</span>
                            )}
                            <span>/</span>
                            <span>5 min read</span>
                        </div>
                    </div>

                    {/* Optional Cover Image */}
                    {post.coverImage && (
                        <div className="mt-8 md:mt-12 rounded-lg overflow-hidden border border-border/50 bg-muted">
                            <div className="relative aspect-[2/1] w-full">
                                <CoverImage image={post.coverImage} priority />
                            </div>
                        </div>
                    )}
                </header>

                {/* Prose Content */}
                <div className="prose prose-lg prose-gray dark:prose-invert max-w-none 
                    prose-headings:font-bold prose-headings:tracking-tight
                    prose-p:leading-relaxed
                    prose-blockquote:border-l-primary prose-blockquote:font-normal prose-blockquote:not-italic
                    prose-code:font-mono prose-code:text-primary prose-code:bg-secondary prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sm prose-code:before:content-none prose-code:after:content-none
                ">
                    {post.content && (
                        <PortableText value={post.content} />
                    )}
                </div>

                {/* Footer / Signature */}
                <div className="mt-16 md:mt-24 pt-8 border-t border-border flex justify-between items-center font-mono text-xs text-muted-foreground">
                    <div>
                        Thanks for reading.
                    </div>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Bluesky</Link>
                    </div>
                </div>
            </main>
        </article>
    )
}
