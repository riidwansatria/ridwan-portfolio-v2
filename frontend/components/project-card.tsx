"use client"

import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Github, ExternalLink } from "lucide-react"

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
        <article
            className="group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5 hover:-translate-y-1"
        >
            {/* Image */}
            <Link href={`/projects/${project.slug}`} className="relative aspect-[16/10] overflow-hidden">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-white/90 text-black hover:bg-white transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Github className="h-4 w-4" />
                            </a>
                        )}
                        {project.demo && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-white/90 text-black hover:bg-white transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        )}
                    </div>
                </div>
            </Link>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-medium text-muted-foreground font-mono">
                        {project.year}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <Link href={`/projects/${project.slug}`}>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                </Link>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                    {project.description}
                </p>

                {/* Tags */}
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
            </div>
        </article>
    )
}
