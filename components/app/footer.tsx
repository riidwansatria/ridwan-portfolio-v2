'use client'

import { useState, useEffect } from 'react'
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/app/theme-toggle"

function LiveClock() {
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    function updateTime() {
      const now = new Date()
      const formatted = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Tokyo',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).toLowerCase()
      setTime(formatted)
    }

    updateTime()
    const interval = setInterval(updateTime, 10_000) // update every 10s
    return () => clearInterval(interval)
  }, [])

  if (!time) return null

  return (
    <span className="text-muted-foreground text-xs sm:text-sm tabular-nums leading-none">
      {time} in Tokyo, Japan
    </span>
  )
}

export default function Footer() {
  const pathname = usePathname()

  // Don't show footer on individual project pages
  if (pathname?.startsWith("/projects/")) {
    return null
  }

  return (
    <footer className="relative border-t h-10 px-4 sm:px-6 flex items-center">
      <div className="flex-1">
        <LiveClock />
      </div>
      <ThemeToggle className="text-muted-foreground shadow-none" />
    </footer>
  )
}
