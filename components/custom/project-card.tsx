"use client"

import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export type Project = {
    id: string
    slug: string
    title: string
    description: string
    image: string
    year: string
    tags: Array<{ name: string; color: string }>
    featured?: boolean
    github?: string
    demo?: string
}

export function ProjectCard({ project }: { project: Project }) {
    return (
        <Link
            href={`/projects/${project.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border bg-card hover:border-foreground/25 transition-colors duration-200"
        >
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <Image
                    src={project.image}
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
                    {project.description}
                </p>

                {/* Year + Tags */}
                <div className="flex items-center gap-2 mt-auto">
                    <span className="text-xs text-muted-foreground shrink-0">
                        {project.year}
                    </span>
                    <span className="text-muted-foreground/40 text-xs">·</span>
                    <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 2).map((tag) => (
                            <Badge
                                key={tag.name}
                                variant="secondary"
                                className="text-[11px] font-medium px-1.5 py-0"
                                style={{
                                    backgroundColor: `${tag.color}12`,
                                    border: `1px solid ${tag.color}35`,
                                    color: tag.color,
                                }}
                            >
                                {tag.name}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    )
}
