"use client"

import type { ReactNode } from "react"

const widthValues: Record<string, string> = {
    "3xl": "48rem",
    "4xl": "56rem",
    "5xl": "64rem",
    "6xl": "72rem",
    "7xl": "80rem",
    full: "100%",
}

interface WideProps {
    children: ReactNode
    maxWidth?: string
}

/**
 * Breaks content out of the narrow prose column to a wider width
 * using the viewport-based full-bleed pattern.
 *
 * Usage in MDX: <Wide maxWidth="5xl">...</Wide>
 */
export function Wide({ children, maxWidth = "5xl" }: WideProps) {
    const mw = widthValues[maxWidth] ?? widthValues["5xl"]
    return (
        <div
            className="wide-breakout"
            style={{
                width: "100vw",
                maxWidth: mw,
                marginLeft: "calc(50% - min(50vw, " + mw + " / 2))",
            }}
        >
            {children}
        </div>
    )
}
