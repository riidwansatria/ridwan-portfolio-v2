"use client"

import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Spotlight } from "@/components/app/motion/spotlight"

export type Project = {
    id: string
    slug: string
    title: string
    abstract: string
    heroImage: string
    date: string
    tags: string[]
    accentColors: string[]
    featured?: boolean
}

export function ProjectCard({ project }: { project: Project }) {
    return (
        <Link
            href={`/projects/${project.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card hover:bg-accent/70 hover:border-foreground/20 transition-all"
        >
            <Spotlight className="z-10 bg-foreground/5 blur-3xl" size={240} springOptions={{ bounce: 0.3, duration: 0.1 }} />
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
                <h3 className="text-sm font-semibold text-foreground mb-1.5 leading-snug">
                    {project.title}
                </h3>

                <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1 leading-relaxed">
                    {project.abstract}
                </p>

                {/* Year + Tags */}
                <div className="flex items-center gap-2 mt-auto">
                    <span className="text-xs text-muted-foreground shrink-0">
                        {new Date(project.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                    <span className="text-muted-foreground/40 text-xs">·</span>
                    <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 2).map((tag, index) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="text-[11px] font-medium px-1.5 py-0"
                                style={{
                                    backgroundColor: `${project.accentColors[index] ?? "#64748b"}12`,
                                    border: `1px solid ${project.accentColors[index] ?? "#64748b"}35`,
                                    color: project.accentColors[index] ?? "#64748b",
                                }}
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    )
}
