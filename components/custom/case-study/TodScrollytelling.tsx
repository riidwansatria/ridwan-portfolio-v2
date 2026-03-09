"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import scrollama from "scrollama"
import { StationMap } from "@/components/mdx/StationMap"

// ---------------------------------------------------------------------------
// Step Component
// ---------------------------------------------------------------------------

interface StepProps {
    view: "clusters" | "node" | "place" | "people"
    highlightCluster?: number
    interactive?: boolean
    children: ReactNode
}

function Step({ children }: { children: ReactNode }) {
    // This wrapper is purely semantic inner HTML, logic handled by parent
    return (
        <div className="max-w-[28rem] rounded-xl border border-border bg-background px-8 py-6 text-base leading-[1.7] max-md:bg-background/85 max-md:backdrop-blur-md">
            {children}
        </div>
    )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function TodScrollytelling() {
    const scrollerRef = useRef<ReturnType<typeof scrollama> | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    const [state, setState] = useState<{
        view: "clusters" | "node" | "place" | "people"
        highlightCluster: number | null
        interactive: boolean
    }>({
        view: "clusters",
        highlightCluster: null,
        interactive: false,
    })

    const steps: StepProps[] = [
        {
            view: "clusters",
            children: (
                <>
                    Five distinct typologies emerged from the clustering analysis.
                    Each station's 800m catchment area is classified by its combined
                    Node, Place, and People profile.
                </>
            ),
        },
        {
            view: "clusters",
            highlightCluster: 0,
            children: (
                <>
                    <strong>Cluster 1 (Vulnerable)</strong> stations concentrate in outer
                    areas with low transit connectivity but high social vulnerability — the
                    frontline of displacement risk.
                </>
            ),
        },
        {
            view: "clusters",
            highlightCluster: 1,
            children: (
                <>
                    <strong>Cluster 2 (Transit Hub)</strong> stations show high Node scores
                    but moderate Place and People values — major interchange points where
                    development pressure is building.
                </>
            ),
        },
        {
            view: "clusters",
            highlightCluster: 2,
            children: (
                <>
                    <strong>Cluster 3 (Urban Core)</strong> stations score high across all
                    three indices — dense, connected, and socially mixed.
                </>
            ),
        },
        {
            view: "node",
            children: (
                <>
                    The <strong>Node index</strong> reveals the transit connectivity landscape.
                    Central Jakarta dominates, with a sharp falloff toward the periphery.
                </>
            ),
        },
        {
            view: "people",
            children: (
                <>
                    The <strong>People index</strong> maps social vulnerability. The spatial mismatch
                    is visible: high vulnerability often coincides with areas targeted for transit investment.
                </>
            ),
        },
        {
            view: "clusters",
            interactive: true,
            children: (
                <>
                    Explore the map yourself — toggle between views, hover stations
                    for details, click for the full breakdown.
                </>
            ),
        },
    ]

    useEffect(() => {
        if (!containerRef.current) return

        const scroller = scrollama()
        scrollerRef.current = scroller

        scroller
            .setup({
                step: containerRef.current.querySelectorAll(".scrolly-step"),
                offset: 0.5,
            })
            .onStepEnter(({ index }) => {
                setActiveIndex(index)

                const stepData = steps[index]
                if (stepData) {
                    setState({
                        view: stepData.view,
                        highlightCluster: stepData.highlightCluster ?? null,
                        interactive: stepData.interactive ?? false,
                    })
                }
            })

        const handleResize = () => scroller.resize()
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
            scroller.destroy()
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] my-8 w-screen max-w-none md:flex md:items-start"
        >
            {/* Sticky map */}
            <div className="sticky top-0 z-10 flex h-[50vh] min-h-[400px] w-full flex-col px-4 pb-4 md:top-16 md:h-[calc(100vh-4rem)] md:w-[70%]">
                <StationMap
                    src="/data/tod-equity/stations.geojson"
                    activeView={state.view}
                    highlightCluster={state.highlightCluster}
                    interactive={state.interactive}
                />
            </div>

            {/* Scroll steps */}
            <div className="relative z-20 mt-[-4rem] w-full px-4 md:z-auto md:mt-0 md:w-[30%] md:px-10 md:py-8 md:pl-2">
                {steps.map((step, i) => (
                    <div
                        key={i}
                        className="scrolly-step flex min-h-[80vh] items-center py-8"
                        style={{
                            opacity: activeIndex === i ? 1 : 0.3,
                            transition: "opacity 300ms ease",
                        }}
                    >
                        <Step>{step.children}</Step>
                    </div>
                ))}
            </div>
        </div>
    )
}
