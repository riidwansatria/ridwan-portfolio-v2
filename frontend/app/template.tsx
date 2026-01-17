'use client'

import { motion } from 'framer-motion'
import { useTransition } from '@/lib/transition-context'
import { useEffect } from 'react'

const variants = {
  // ... (keep existing variants)
  default: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.5, ease: 'easeInOut' as const }
  },
  initial: (type: string) => {
    switch (type) {
      case 'next':
        return { opacity: 0, x: 100 }
      case 'back':
        return { opacity: 0, x: -100 }
      default:
        // Default: No global animation (let specialized element animations handle it)
        return { opacity: 1, y: 0 }
    }
  },
  exit: (type: string) => {
    switch (type) {
      case 'next':
        return { opacity: 0, x: -100 }
      case 'back':
        return { opacity: 0, x: 100 }
      default:
        return { opacity: 0, y: -20 }
    }
  }
}

export default function Template({ children }: { children: React.ReactNode }) {
  const { transitionType, setTransitionType } = useTransition()

  // Reset transition type to default after the animation starts/component mounts
  // This ensures subsequent navigations (e.g. via header) don't reuse the 'next/back' types
  useEffect(() => {
    // We set it back to default immediately. 
    // Since the `custom` prop is passed to motion.div on render, 
    // it captures the *current* transitionType (the one that triggered the nav).
    // Resetting it here affects the *next* navigation.
    setTransitionType('default')
  }, [setTransitionType])

  return (
    <motion.div
      custom={transitionType}
      initial="initial"
      animate="default"
      exit="exit"
      variants={variants}
      className="page-transition"
    >
      {children}
    </motion.div>
  )
}