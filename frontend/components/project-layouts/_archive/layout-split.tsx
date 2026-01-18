"use client"

import Image from "next/image"
import { ProjectDetailHeader } from "@/components/project-detail-header"
import { ProjectMetadata } from "@/components/project-metadata"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

export interface ProjectData {
    id: string
    slug: string
    title: string
    subtitle: string
    description: string
    image: string
    year: string
    role: string
    techStack: Array<{ name: string; color: string }>
    links?: {
        github?: string
        demo?: string
    }
    nextProject?: {
        slug: string
        title: string
    }
    content: ReactNode
}

export function SplitLayout({ project }: { project: ProjectData }) {
    return (
        <article className="min-h-screen bg-background pb-20">
            {/* Hero Image - Immersive & Wide */}
            <div className="w-full h-[40vh] md:h-[50vh] relative bg-muted">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>

            <div className="max-w-[100rem] mx-auto px-4 sm:px-12 -mt-32 relative z-10">
                <ProjectDetailHeader title={project.title} subtitle={project.subtitle} />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-16">
                    {/* Sticky Sidebar - Metadata Layer */}
                    <aside className="md:col-span-3 lg:col-span-3">
                        <div className="md:sticky md:top-24">
                            <ProjectMetadata
                                year={project.year}
                                role={project.role}
                                techStack={project.techStack}
                                links={project.links}
                            />
                        </div>
                    </aside>

                    {/* Main Content - Narrative Layer */}
                    <div className="md:col-span-8 md:col-start-5 lg:col-span-7 prose prose-gray dark:prose-invert max-w-none">
                        {project.content}
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="mt-32 border-t pt-12 flex justify-between items-center text-muted-foreground">
                    <Link href="/projects" className="hover:text-foreground transition-colors">
                        ← All Projects
                    </Link>
                    <Link href="#" className="flex items-center gap-2 hover:text-foreground transition-colors group">
                        Next Project
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </article>
    )
}
