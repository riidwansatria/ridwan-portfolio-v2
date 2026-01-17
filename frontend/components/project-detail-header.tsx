"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ProjectDetailHeaderProps {
    title: string
    subtitle?: string
}

export function ProjectDetailHeader({ title, subtitle }: ProjectDetailHeaderProps) {
    return (
        <div className="mb-12">
            <Button
                variant="ghost"
                asChild
                className="mb-8 pl-0 hover:bg-transparent hover:text-muted-foreground/80"
            >
                <Link href="/projects" className="flex items-center gap-2 text-muted-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Projects
                </Link>
            </Button>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground mb-6">
                {title}
            </h1>
            {subtitle && (
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
                    {subtitle}
                </p>
            )}
        </div>
    )
}
