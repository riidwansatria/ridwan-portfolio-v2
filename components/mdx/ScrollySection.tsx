"use client"

import {
    useEffect,
    useRef,
    useState,
    cloneElement,
    isValidElement,
    type ReactNode,
    type ReactElement,
    Children,
} from "react"
import scrollama from "scrollama"

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

export function StickyVisual({ children }: { children: ReactNode }) {
    return <>{children}</>
}

export function ScrollSteps({ children }: { children: ReactNode }) {
    return <>{children}</>
}

interface StepProps {
    view?: "clusters" | "node" | "place" | "people"
    highlightCluster?: number | null
    interactive?: boolean
    children: ReactNode
}

export function Step({ children }: StepProps) {
    // Rendered by ScrollySection — props extracted from data attributes
    return <>{children}</>
}

// ---------------------------------------------------------------------------
// Main ScrollySection
// ---------------------------------------------------------------------------

interface ScrollState {
    view: string
    highlightCluster: number | null
    interactive: boolean
}

export function ScrollySection({ children }: { children: ReactNode }) {
    const scrollerRef = useRef<ReturnType<typeof scrollama> | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [state, setState] = useState<ScrollState>({
        view: "clusters",
        highlightCluster: null,
        interactive: false,
    })

    // Split children into StickyVisual and ScrollSteps
    let stickyChild: ReactElement | null = null
    let stepsChildren: ReactNode[] = []

    Children.forEach(children, (child) => {
        if (!isValidElement(child)) return

        // Handle direct reference or function name (to bypass React Refresh proxies)
        const typeName = typeof child.type === 'string'
            ? child.type
            : (child.type as any)?.name || (child.type as any)?.displayName || '';

        const isSticky = child.type === StickyVisual || typeName === 'StickyVisual';
        const isSteps = child.type === ScrollSteps || typeName === 'ScrollSteps';

        if (isSticky) {
            stickyChild = child as ReactElement<{ children: ReactNode }>
        } else if (isSteps) {
            stepsChildren = Children.toArray((child as ReactElement<{ children: ReactNode }>).props.children)
        }
    })

    // Extract step data from JSX props
    const steps = stepsChildren.filter(isValidElement).map((step, i) => {
        const props = step.props as StepProps
        return {
            index: i,
            view: props.view ?? "clusters",
            highlightCluster: props.highlightCluster ?? null,
            interactive: props.interactive ?? false,
            content: props.children,
        }
    })

    useEffect(() => {
        if (!containerRef.current) return

        const scroller = scrollama()
        scrollerRef.current = scroller

        scroller
            .setup({
                step: containerRef.current.querySelectorAll(".scrolly-step"),
                offset: 0.5,
            })
            .onStepEnter(({ index, element }) => {
                setActiveIndex(index)
                setState({
                    view: element.getAttribute("data-view") ?? "clusters",
                    highlightCluster: element.hasAttribute("data-highlight-cluster")
                        ? Number(element.getAttribute("data-highlight-cluster"))
                        : null,
                    interactive: element.getAttribute("data-interactive") === "true",
                })
            })

        const handleResize = () => scroller.resize()
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
            scroller.destroy()
        }
    }, [])

    // Clone the StationMap inside StickyVisual with controlled props
    const mapWithProps = stickyChild
        ? cloneElement(stickyChild as ReactElement<{ children: ReactNode }>, {},
            ...Children.map((stickyChild as ReactElement<{ children: ReactNode }>).props.children, (mapChild: ReactNode) => {
                if (isValidElement(mapChild)) {
                    return cloneElement(mapChild as ReactElement<any>, {
                        activeView: state.view,
                        highlightCluster: state.highlightCluster,
                        interactive: state.interactive,
                    })
                }
                return mapChild
            }) ?? []
        )
        : null

    return (
        <div
            ref={containerRef}
            className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] my-8 w-screen max-w-none md:flex md:items-start"
        >
            {/* Sticky visual — the map */}
            <div className="sticky top-0 z-10 flex h-[50vh] min-h-[400px] w-full flex-col p-4 md:top-16 md:h-screen md:w-[70%]">
                {mapWithProps}
            </div>

            {/* Scroll-driven narrative steps */}
            <div className="relative z-20 mt-[-4rem] w-full px-4 md:z-auto md:mt-0 md:w-[30%] md:px-10 md:py-8 md:pl-2">
                {steps.map((step) => (
                    <div
                        key={step.index}
                        className="scrolly-step flex min-h-[80vh] items-center py-8"
                        data-view={step.view}
                        data-highlight-cluster={step.highlightCluster !== null ? String(step.highlightCluster) : undefined}
                        data-interactive={step.interactive ? "true" : undefined}
                        style={{
                            opacity: activeIndex === step.index ? 1 : 0.3,
                            transition: "opacity 300ms ease",
                        }}
                    >
                        <div className="max-w-[28rem] rounded-xl border border-border bg-background px-8 py-6 text-base leading-[1.7] max-md:bg-background/85 max-md:backdrop-blur-md">
                            {step.content}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
