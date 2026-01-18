"use client"

import Link, { LinkProps } from "next/link"
import { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useTransition, TransitionType } from "@/lib/transition-context"

interface TransitionLinkProps extends LinkProps {
    children: ReactNode
    className?: string
    transition?: TransitionType
}

export function TransitionLink({
    children,
    transition = "default",
    href,
    ...props
}: TransitionLinkProps) {
    const router = useRouter()
    const { setTransitionType } = useTransition()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (props.onClick) {
            props.onClick(e)
        }

        // Only handle transition logic if it's not a modifier click (new tab, etc.)
        if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
            e.preventDefault()
            setTransitionType(transition)
            router.push(href.toString())
        }
    }

    return (
        <Link href={href} {...props} onClick={handleClick}>
            {children}
        </Link>
    )
}
