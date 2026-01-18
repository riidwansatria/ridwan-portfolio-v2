"use client"

import Link from "next/link"
import { ArrowLeft, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type PortableTextBlock } from "next-sanity"
import PortableText from "@/app/components/PortableText"

interface EditorialLayoutProps {
    post: {
        title: string
        date: string
        author?: {
            firstName: string
            lastName: string
            picture?: any
        } | null
        coverImage?: any
        content: PortableTextBlock[]
        tags?: string[]
        category?: string
    }
}

export function LayoutEditorial({ post }: EditorialLayoutProps) {
    // Format date nicely
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }).toUpperCase()

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <article className="min-h-screen bg-background pb-20">
            {/* Header with back button */}
            <nav className="max-w-2xl mx-auto px-6 pt-8">
                <Button
                    variant="ghost"
                    asChild
                    size="sm"
                    className="hover:bg-transparent hover:text-muted-foreground/80 -ml-3 p-0"
                >
                    <Link href="/notes" className="flex items-center gap-2 text-muted-foreground font-mono text-sm">
                        <ArrowLeft className="h-4 w-4" />
                        back
                    </Link>
                </Button>
            </nav>

            {/* Editorial Header */}
            <header className="pt-12 pb-8 max-w-2xl mx-auto px-6">
                {/* Metadata row */}
                <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground uppercase tracking-wider mb-6">
                    <span>{formattedDate}</span>
                    <span className="text-border">•</span>
                    <span className="text-primary">{post.category || 'Note'}</span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15] mb-4">
                    {post.title}
                </h1>

                {/* Author and read time */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
                    {post.author && (
                        <span>{post.author.firstName} {post.author.lastName}</span>
                    )}
                    <span className="text-border">/</span>
                    <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        5 min read
                    </span>
                </div>
            </header>

            {/* Divider */}
            <div className="max-w-2xl mx-auto px-6 mb-12">
                <div className="border-t border-border" />
            </div>

            {/* Narrative Content */}
            <div className="article-content max-w-2xl mx-auto px-6">
                {post.content && (
                    <PortableText value={post.content} />
                )}
            </div>

            {/* Footer */}
            <div className="max-w-2xl mx-auto px-6 mt-24 border-t pt-8 flex justify-between items-center text-muted-foreground">
                <span className="text-sm">End of Entry</span>
                <div className="flex gap-6 font-mono text-xs tracking-widest uppercase">
                    <Link href="#" className="hover:text-foreground transition-colors">Share</Link>
                    <button onClick={scrollToTop} className="hover:text-foreground transition-colors">Top</button>
                </div>
            </div>
        </article>
    )
}
