"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, Github, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { ProjectData } from "./layout-split"

export function EditorialLayout({ project }: { project: ProjectData }) {
    return (
        <article className="min-h-screen bg-background pb-20">
            {/* Editorial Header */}
            <header className="pt-24 pb-12 md:pb-20 max-w-4xl mx-auto px-6 text-center">
                <Button
                    variant="ghost"
                    asChild
                    className="mb-8 hover:bg-transparent hover:text-muted-foreground/80"
                >
                    <Link href="/projects" className="flex items-center gap-2 text-muted-foreground">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Projects
                    </Link>
                </Button>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
                    {project.title}
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    {project.subtitle}
                </p>
            </header>

            {/* Cinematic Hero - Full Bleed */}
            <div className="w-full h-[60vh] md:h-[80vh] relative bg-muted mb-16 overflow-hidden">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Metadata Strip - Horizontal */}
            <div className="max-w-4xl mx-auto px-6 mb-20">
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 py-6 border-y border-border/50">
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Year</span>
                        <span className="font-mono text-sm">{project.year}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Role</span>
                        <span className="font-mono text-sm">{project.role}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Tech Stack</span>
                        <div className="flex gap-1.5">
                            {project.techStack.map(t => (
                                <span key={t.name} className="font-mono text-sm" style={{ color: t.color }}>{t.name}</span>
                            ))}
                        </div>
                    </div>
                    {(project.links?.github || project.links?.demo) && (
                        <div className="flex items-center gap-4 pl-4 md:border-l border-border/50">
                            {project.links.github && (
                                <a href={project.links.github} target="_blank" className="p-2 hover:bg-accent rounded-full transition-colors">
                                    <Github className="h-5 w-5" />
                                </a>
                            )}
                            {project.links.demo && (
                                <a href={project.links.demo} target="_blank" className="p-2 hover:bg-accent rounded-full transition-colors">
                                    <ExternalLink className="h-5 w-5" />
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Narrative Content - Centered & Measure Controlled */}
            <div className="prose prose-lg prose-gray dark:prose-invert max-w-2xl mx-auto px-6">
                {project.content}
            </div>

            {/* Footer Navigation */}
            <div className="max-w-4xl mx-auto px-6 mt-32 border-t pt-12 flex justify-between items-center text-muted-foreground">
                <Link href="/projects" className="hover:text-foreground transition-colors">
                    ← All Projects
                </Link>
                <Link href="#" className="flex items-center gap-2 hover:text-foreground transition-colors group">
                    Next Project
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </article>
    )
}
