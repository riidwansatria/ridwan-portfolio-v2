"use client"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

export function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const [hovered, setHovered] = useState(false)

    return (
        <div
            ref={ref}
            className={cn("relative", className)}
            onMouseMove={(e) => {
                const rect = ref.current?.getBoundingClientRect()
                if (rect) setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div
                className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
                style={{
                    opacity: hovered ? 1 : 0,
                    background: `radial-gradient(350px circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.07), transparent 80%)`,
                }}
            />
            {children}
        </div>
    )
}
