'use client'

import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const pathname = usePathname()

  // Don't show footer on individual project pages
  if (pathname?.startsWith("/projects/")) {
    return null
  }

  const scrollToTop = () => {
    // Check for About page's custom scroll container
    const aboutScrollContainer = document.getElementById('about-scroll-container')
    if (aboutScrollContainer) {
      aboutScrollContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      })
      return
    }

    // Default: scroll the window
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="relative flex mx-auto px-4 md:px-12 pt-2 pb-4 border-t-1">
      <div className="flex-1 text-muted-foreground text-xs sm:text-sm font-mono">
        © {new Date().getFullYear()} Ridwan Satria.
      </div>
      <div className="hidden sm:flex">
        <Button
          variant="link"
          size="sm"
          className="p-0 h-auto font-mono text-muted-foreground text-xs sm:text-sm"
          onClick={scrollToTop}
        >
          Back to top ↑
        </Button>
      </div>
    </footer>
  )
}
