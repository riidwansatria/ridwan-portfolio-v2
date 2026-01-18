"use client"

import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

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
            className="group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5 hover:-translate-y-1"
        >
            {/* Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
                <div className="mb-3">
                    <span className="text-xs font-medium text-muted-foreground font-mono">
                        {project.year}
                    </span>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                    {project.description}
                </p>

                {/* Footer: Tags & Arrow */}
                <div className="flex items-end justify-between gap-4 mt-auto">
                    <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                            <Badge
                                key={tag.name}
                                variant="secondary"
                                className="text-xs font-medium px-2 py-0.5"
                                style={{
                                    backgroundColor: `${tag.color}15`,
                                    border: `1px solid ${tag.color}40`,
                                    color: tag.color,
                                }}
                            >
                                {tag.name}
                            </Badge>
                        ))}
                    </div>

                    <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </div>
            </div>
        </Link>
    )
}
