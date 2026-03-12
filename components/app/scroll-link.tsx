'use client'

import { Button } from "@/components/ui/button"
import { ReactNode } from "react"

interface ScrollLinkProps {
    targetId: string
    children: ReactNode
    className?: string
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export function ScrollLink({ targetId, children, className, variant = "link" }: ScrollLinkProps) {
    const handleClick = () => {
        const element = document.getElementById(targetId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <Button
            variant={variant}
            className={className}
            onClick={handleClick}
        >
            {children}
        </Button>
    )
}
