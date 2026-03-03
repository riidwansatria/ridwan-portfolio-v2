"use client"

import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, Calendar, Layers, User } from "lucide-react"

interface ProjectMetadataProps {
    year: string
    role: string
    techStack: Array<{ name: string; color: string }>
    links?: {
        github?: string
        demo?: string
    }
}

export function ProjectMetadata({ year, role, techStack, links }: ProjectMetadataProps) {
    return (
        <div className="flex flex-col gap-8 py-8 border-t border-b md:border-none md:py-0">
            {/* Year & Role Group */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        Year
                    </div>
                    <p className="font-mono text-sm">{year}</p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        <User className="h-3.5 w-3.5" />
                        Role
                    </div>
                    <p className="font-mono text-sm">{role}</p>
                </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    <Layers className="h-3.5 w-3.5" />
                    Toolkit
                </div>
                <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                        <Badge
                            key={tech.name}
                            variant="secondary"
                            className="font-mono text-xs rounded-md"
                            style={{
                                backgroundColor: `${tech.color}10`,
                                color: tech.color,
                                border: `1px solid ${tech.color}20`,
                            }}
                        >
                            {tech.name}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Links */}
            {links && (links.github || links.demo) && (
                <div className="space-y-3 pt-2">
                    <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        Links
                    </div>
                    <div className="flex flex-col gap-2">
                        {links.github && (
                            <a
                                href={links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
                            >
                                <Github className="h-4 w-4" />
                                Analysis Notebook
                            </a>
                        )}
                        {links.demo && (
                            <a
                                href={links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
                            >
                                <ExternalLink className="h-4 w-4" />
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
