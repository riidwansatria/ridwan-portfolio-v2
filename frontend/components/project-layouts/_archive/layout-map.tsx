"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Layers, Plus, Minus, MousePointer2, Info, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { ProjectData } from "./layout-split"

export function MapLayout({ project }: { project: ProjectData }) {
    const [showInfo, setShowInfo] = useState(true)

    return (
        <article className="fixed inset-0 w-screen h-screen bg-background overflow-hidden flex flex-col">
            {/* Map Canvas Layer (Background) */}
            <div className="absolute inset-0 z-0 bg-muted/50">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-90"
                    priority
                />
                {/* Vignette Overlay for text readability if needed, but keeping it subtle for map clarity */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-black/20" />
            </div>

            {/* UI Overlay Layer (HUD) */}
            <div className="relative z-10 w-full h-full pointer-events-none p-4 md:p-6 flex flex-col justify-between">

                {/* Top Bar: Nav & Title */}
                <header className="flex justify-between items-start">
                    <div className="pointer-events-auto bg-background/80 backdrop-blur-md border border-border/50 rounded-lg p-1.5 shadow-sm">
                        <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
                            <Link href="/projects" title="Back to Projects">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    <div className="pointer-events-auto bg-background/80 backdrop-blur-md border border-border/50 rounded-lg py-2 px-4 shadow-sm max-w-xl text-center md:text-left hidden md:block">
                        <h1 className="font-semibold text-sm tracking-tight">{project.title}</h1>
                    </div>

                    <div className="pointer-events-auto bg-background/80 backdrop-blur-md border border-border/50 rounded-lg p-1.5 shadow-sm flex gap-1">
                        <Button
                            variant={showInfo ? "secondary" : "ghost"}
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setShowInfo(!showInfo)}
                            title="Toggle Project Details"
                        >
                            {showInfo ? <X className="h-4 w-4" /> : <Info className="h-4 w-4" />}
                        </Button>
                    </div>
                </header>

                {/* Center/Main Area - reserved for map interaction */}

                {/* Bottom Bar: Interactive Controls & Metadata */}
                <footer className="flex justify-between items-end pb-safe">
                    {/* Left: Legend/Tech Stack */}
                    <div className="pointer-events-auto bg-background/80 backdrop-blur-md border border-border/50 rounded-lg p-3 shadow-sm max-w-xs space-y-2">
                        <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                            <Layers className="h-3 w-3" />
                            Active Layers
                        </div>
                        <div className="text-xs font-medium">Population Density (2024)</div>

                        <div className="h-px bg-border/50 my-2" />

                        <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                            Stack
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {project.techStack.map(t => (
                                <Badge key={t.name} variant="outline" className="text-[10px] h-5 bg-background/50" style={{ borderColor: t.color, color: t.color }}>
                                    {t.name}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Right: Map Controls Mockup */}
                    <div className="flex flex-col gap-2 pointer-events-auto">
                        <div className="bg-background/80 backdrop-blur-md border border-border/50 rounded-lg shadow-sm flex flex-col overflow-hidden">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none border-b border-border/50">
                                <Plus className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none">
                                <Minus className="h-4 w-4" />
                            </Button>
                        </div>
                        <Button variant="default" size="icon" className="h-10 w-10 rounded-full shadow-md bg-primary text-primary-foreground">
                            <MousePointer2 className="h-4 w-4" />
                        </Button>
                    </div>
                </footer>
            </div>

            {/* Project Info Panel (Slide-over) */}
            {showInfo && (
                <div className="absolute right-4 top-20 bottom-24 w-80 md:w-96 bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl rounded-xl z-20 flex flex-col md:right-6 animate-in slide-in-from-right-4 duration-300">
                    <ScrollArea className="flex-1 p-6">
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold mb-2 leading-tight">{project.title}</h2>
                                <p className="text-sm text-muted-foreground">{project.subtitle}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/50">
                                <div>
                                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Year</div>
                                    <div className="font-mono text-sm">{project.year}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Role</div>
                                    <div className="font-mono text-sm">{project.role}</div>
                                </div>
                            </div>

                            <div className="prose prose-sm prose-gray dark:prose-invert">
                                {project.content}
                            </div>
                        </div>
                    </ScrollArea>

                    <div className="p-4 border-t border-border/50 bg-muted/20 text-xs text-center text-muted-foreground flex justify-between items-center rounded-b-xl">
                        <span>Map data © OpenStreetMap</span>
                        <span>Ridwan Satria © 2024</span>
                    </div>
                </div>
            )}
        </article>
    )
}
