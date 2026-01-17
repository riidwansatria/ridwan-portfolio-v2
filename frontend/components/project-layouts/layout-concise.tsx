"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ExternalLink, Github, LayoutGrid } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ProjectData } from "./layout-split"

export function ConciseLayout({ project }: { project: ProjectData }) {
    return (
        <div className="w-full min-h-[calc(100vh-5rem)] bg-background text-foreground px-4 py-8 md:px-6 lg:px-8 md:fixed md:inset-x-0 md:bottom-0 md:top-20 md:z-40 md:overflow-hidden md:flex md:flex-col md:py-6 lg:py-8">

            {/* Bento Grid Container */}
            <main className="flex flex-col gap-6 md:grid md:grid-cols-12 md:grid-rows-12 md:gap-4 md:min-h-0 md:flex-1">

                {/* 1. Main Visual (Large) */}
                <div className="relative rounded-2xl overflow-hidden border border-border bg-muted group aspect-video md:aspect-auto md:h-full md:col-span-8 md:row-span-12 flex flex-col">
                    {/* Window Frame Header */}
                    <div className="absolute top-0 inset-x-0 h-8 bg-black/20 backdrop-blur-md z-10 flex items-center px-4 border-b border-white/10">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        </div>
                        <div className="mx-auto text-[10px] font-mono text-white/50 tracking-wider">
                            {project.slug} — Preview
                        </div>
                    </div>

                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* 2. Right Column: Control Panel (Flex Container) */}
                <div className="flex flex-col gap-4 md:h-full md:min-h-0 md:col-span-4 md:row-span-12">

                    {/* 2a. Navigation & Metadata */}
                    <div className="shrink-0 flex items-center justify-between px-1">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors group"
                        >
                            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                            <span>Back to Projects</span>
                        </Link>
                    </div>

                    {/* 2b. Title & Metadata Card */}
                    <div className="shrink-0 bg-card border border-border rounded-2xl p-4 flex flex-col justify-between">
                        <div>
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tighter text-foreground leading-[1.1]">
                                {project.title}
                            </h1>
                        </div>

                        <div className="flex justify-between items-end pt-4">
                            <div className="space-y-1.5">
                                <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-mono">Toolkit</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.techStack.map(t => (
                                        <Badge
                                            key={t.name}
                                            variant="outline"
                                            className="font-mono text-[10px] px-2 py-0.5"
                                            style={{
                                                backgroundColor: t.color ? `${t.color}15` : undefined,
                                                color: t.color,
                                                borderColor: t.color ? `${t.color}30` : undefined
                                            }}
                                        >
                                            {t.name}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-1.5 text-right">
                                <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-mono">Year</span>
                                <div className="font-mono text-sm">{project.year}</div>
                            </div>
                        </div>
                    </div>

                    {/* 2c. Links (Fixed Height) */}
                    <div className="shrink-0 bg-muted/30 border border-border rounded-2xl p-4">
                        <div className="space-y-2">
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-mono block">Project Links</span>
                            <div className="flex flex-wrap gap-2">
                                {project.links?.github && (
                                    <a
                                        href={project.links.github}
                                        target="_blank"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 hover:bg-secondary text-secondary-foreground text-xs font-medium rounded-full transition-colors border border-border/50"
                                    >
                                        <Github className="h-3.5 w-3.5" />
                                        <span>Notebook</span>
                                    </a>
                                )}
                                {project.links?.demo && (
                                    <a
                                        href={project.links.demo}
                                        target="_blank"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 hover:bg-secondary text-secondary-foreground text-xs font-medium rounded-full transition-colors border border-border/50"
                                    >
                                        <span>Dashboard</span>
                                        <ArrowRight className="h-3 w-3 opacity-50 -mr-1" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 2d. Description / Brief */}
                    <div className="bg-muted/20 border border-border rounded-2xl p-5 md:flex-1 md:overflow-y-auto md:min-h-[120px] flex flex-col gap-3">
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-mono">About</span>
                        <div className="prose prose-sm prose-neutral dark:prose-invert leading-relaxed text-muted-foreground max-w-none text-pretty">
                            <p>{project.description}</p>
                        </div>
                    </div>

                    {/* 2e. Navigation (Next Project) */}
                    {project.nextProject && (
                        <Link
                            href={`/projects/${project.nextProject.slug}`}
                            className="shrink-0 border border-border rounded-xl flex items-center justify-between p-1 pl-4 gap-2 bg-card hover:bg-secondary/50 transition-all group"
                        >
                            <div className="flex flex-col gap-0.5 overflow-hidden">
                                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Next Project</span>
                                <span className="text-xs font-medium truncate group-hover:text-foreground transition-colors">
                                    {project.nextProject.title}
                                </span>
                            </div>
                            <div className="shrink-0 h-10 w-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-background transition-colors border border-border/50">
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                            </div>
                        </Link>
                    )}

                </div>

            </main>
        </div>
    )
}
