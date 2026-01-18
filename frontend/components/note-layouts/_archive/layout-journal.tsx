"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type PortableTextBlock } from "next-sanity"
import PortableText from "@/app/components/PortableText"
import CoverImage from "@/app/components/CoverImage"

interface JournalLayoutProps {
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

export function LayoutJournal({ post }: JournalLayoutProps) {
    // Format date nicely
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    })

    return (
        <article className="min-h-screen bg-[#fdfbf7] dark:bg-[#1a1a1e] text-foreground pb-24 transition-colors duration-500">
            {/* Background color is a subtle off-white/cream for paper feel */}

            {/* Navigation - Minimal and blended */}
            <nav className="fixed top-0 left-0 w-full p-6 z-50 pointer-events-none mix-blend-difference text-primary-foreground">
                <div className="max-w-screen-xl mx-auto flex justify-between">
                    <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="pointer-events-auto hover:bg-transparent -ml-3 text-muted-foreground hover:text-foreground"
                    >
                        <Link href="/notes" className="flex items-center gap-2 group">
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            <span className="font-serif italic text-lg">Index</span>
                        </Link>
                    </Button>
                </div>
            </nav>

            <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_minmax(auto,65ch)_1fr] gap-8 pt-32 md:pt-48">

                {/* Left Margin: Metadata "Sidenote" */}
                <aside className="hidden lg:block text-right pt-2 relative">
                    <div className="sticky top-32 space-y-6 opacity-60 hover:opacity-100 transition-opacity duration-500">
                        <div className="flex flex-col items-end gap-1">
                            <span className="font-serif italic text-sm text-muted-foreground">Published</span>
                            <div className="font-mono text-xs uppercase tracking-widest">{formattedDate}</div>
                        </div>

                        {post.category && (
                            <div className="flex flex-col items-end gap-1">
                                <span className="font-serif italic text-sm text-muted-foreground">Subject</span>
                                <div className="font-mono text-xs uppercase tracking-widest">{post.category}</div>
                            </div>
                        )}

                        <div className="flex flex-col items-end gap-1">
                            <span className="font-serif italic text-sm text-muted-foreground">Reading Time</span>
                            <div className="font-mono text-xs uppercase tracking-widest flex items-center justify-end gap-2">
                                5 min <Clock className="h-3 w-3" />
                            </div>
                        </div>
                    </div>
                </aside>

                <main>
                    {/* Header Section */}
                    <header className="mb-16 md:mb-24 text-center lg:text-left">
                        <div className="lg:hidden mb-8 flex justify-center gap-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                            <span>{formattedDate}</span>
                            <span>•</span>
                            <span>{post.category || 'Note'}</span>
                        </div>

                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground leading-[1.1] mb-8">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground font-sans tracking-wide uppercase">
                            {post.author && (
                                <div className="flex items-center gap-2">
                                    <span className="h-px w-8 bg-border"></span>
                                    <span>{post.author.firstName} {post.author.lastName}</span>
                                </div>
                            )}
                        </div>
                    </header>

                    {/* Optional Cover Image */}
                    {post.coverImage && (
                        <div className="mb-16 -mx-6 md:mx-0 shadow-sm relative group">
                            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-sm">
                                <CoverImage image={post.coverImage} priority />
                            </div>
                            <div className="absolute -bottom-8 left-0 w-full text-center lg:text-left text-xs text-muted-foreground font-serif italic opacity-0 group-hover:opacity-100 transition-opacity">
                                {post.coverImage.alt || 'Figure 1. Cover Illustration'}
                            </div>
                        </div>
                    )}

                    {/* Prose Content */}
                    <div className="prose prose-lg prose-stone dark:prose-invert max-w-none 
                        font-serif
                        prose-headings:font-medium prose-headings:font-serif prose-headings:tracking-tight prose-headings:text-foreground
                        prose-p:leading-loose prose-p:text-lg prose-p:text-foreground/90
                        prose-a:text-primary prose-a:no-underline prose-a:border-b prose-a:border-primary/30 hover:prose-a:border-primary hover:prose-a:bg-primary/5 prose-a:transition-all
                        prose-blockquote:border-l-2 prose-blockquote:border-primary/50 prose-blockquote:pl-6 prose-blockquote:font-normal prose-blockquote:italic
                        prose-code:font-mono prose-code:text-primary prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-code:before:content-none prose-code:after:content-none
                        prose-li:marker:text-primary/50
                        first-letter:float-left first-letter:text-6xl first-letter:pr-4 first-letter:font-serif first-letter:font-medium first-letter:leading-none first-letter:text-foreground
                    ">
                        {post.content && (
                            <PortableText value={post.content} />
                        )}
                    </div>
                </main>

                {/* Right Margin: Empty for balance or potential future use */}
                <aside className="hidden lg:block pt-2">
                    {/* Could add a subtle TOC here later */}
                </aside>
            </div>

            {/* Footer / Signature */}
            <div className="max-w-screen-xl mx-auto px-6 mt-32 pt-12 border-t border-border/10">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(auto,65ch)_1fr] gap-8 text-center lg:text-left">
                    <div className="hidden lg:block"></div>
                    <div className="flex flex-col md:flex-row justify-between items-center font-serif text-sm text-muted-foreground italic gap-4">
                        <div>
                            End of Entry
                        </div>
                        <div className="flex gap-6 font-sans not-italic text-xs tracking-widest uppercase">
                            <Link href="#" className="hover:text-foreground transition-colors">Share</Link>
                            <Link href="#" className="hover:text-foreground transition-colors">Top</Link>
                        </div>
                    </div>
                    <div className="hidden lg:block"></div>
                </div>
            </div>
        </article>
    )
}
