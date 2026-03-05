'use client'

import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/custom/ThemeToggle"

export default function Footer() {
  const pathname = usePathname()

  // Don't show footer on individual project pages
  if (pathname?.startsWith("/projects/")) {
    return null
  }

  return (
    <footer className="relative border-t py-2">
      <div className="px-4 sm:px-6 flex items-center">
        <div className="flex-1 text-muted-foreground text-xs sm:text-sm">
          © {new Date().getFullYear()} Ridwan Satria.
        </div>
        <ThemeToggle className="text-muted-foreground shadow-none" />
      </div>
    </footer>
  )
}
