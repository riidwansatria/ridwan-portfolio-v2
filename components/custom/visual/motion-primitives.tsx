"use client"

import { motion, useReducedMotion, type Transition } from "framer-motion"
import { createContext, useContext } from "react"

// Context to communicate stagger state to children
const FadeInStaggerContext = createContext<boolean>(false)

const viewport = { once: true, margin: "0px 0px -50px 0px" }

// Notion-esque easing: cubic-bezier for crisp feel
const subtleEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0]

// Shared variants for stagger children
const fadeInVariants = {
    hidden: {
        opacity: 0,
        y: 15,
        filter: "blur(4px)"
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
    },
}

export function FadeInStagger({
    faster = false,
    children,
    className,
    delay = 0,
    staggerDuration,
    ...props
}: React.ComponentPropsWithoutRef<typeof motion.div> & {
    faster?: boolean
    delay?: number
    staggerDuration?: number
}) {
    const stagger = staggerDuration ?? (faster ? 0.08 : 0.15)

    return (
        <FadeInStaggerContext.Provider value={true}>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: stagger,
                            delayChildren: delay,
                        },
                    },
                }}
                className={className}
                {...props}
            >
                {children}
            </motion.div>
        </FadeInStaggerContext.Provider>
    )
}

export function FadeIn({
    children,
    className,
    delay = 0,
    ...props
}: React.ComponentPropsWithoutRef<typeof motion.div> & { delay?: number }) {
    const shouldReduceMotion = useReducedMotion()
    const isInStaggerGroup = useContext(FadeInStaggerContext)

    // Define variants with proper typing
    const variants = {
        hidden: {
            opacity: 0,
            y: shouldReduceMotion ? 0 : 15,
            filter: "blur(4px)"
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
        },
    }

    // Transition config - only add delay when NOT in a stagger group
    const transition: Transition = {
        duration: 0.5,
        ease: subtleEase,
        ...(isInStaggerGroup ? {} : { delay }),
    }

    if (isInStaggerGroup) {
        // When in a stagger group: rely on parent for orchestration
        // IMPORTANT: Must still have initial="hidden" so children start invisible
        return (
            <motion.div
                variants={variants}
                transition={transition}
                className={className}
                {...props}
            >
                {children}
            </motion.div>
        )
    }

    // Standalone: trigger own animation
    return (
        <motion.div
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={transition}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export function ScaleIn({
    children,
    className,
    delay = 0,
    ...props
}: React.ComponentPropsWithoutRef<typeof motion.div> & { delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease: subtleEase, delay }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    )
}
