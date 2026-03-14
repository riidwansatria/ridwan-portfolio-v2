'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Navigation items
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Notes', href: '/notes' },
]

// Map route segments to readable names
function getSegmentLabel(segment: string): string {
  const labels: Record<string, string> = {
    projects: 'Projects',
    notes: 'Notes',
    about: 'About',
    research: 'Research',
  }
  return labels[segment] || segment
}

// Build breadcrumb from pathname
function getBreadcrumbs(pathname: string) {
  if (pathname === '/') return []

  const segments = pathname.split('/').filter(Boolean)
  const crumbs: { label: string; href: string }[] = []

  crumbs.push({ label: 'Ridwan Satria', href: '/' })

  if (segments.length >= 1) {
    crumbs.push({
      label: getSegmentLabel(segments[0]),
      href: `/${segments[0]}`,
    })
  }

  return crumbs
}

// Animated 2-line menu / X icon
// Both bars start at the SVG center — translateY for hamburger, rotate for X
function MenuIcon({ open }: { open: boolean }) {
  const shared = {
    transformBox: 'fill-box' as const,
    transformOrigin: 'center',
    transition: 'transform 0.3s cubic-bezier(0.76, 0, 0.24, 1)',
  }

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
    >
      {/* Both rects at y=11 (center = y:12). Spread with translateY for ☰, rotate for ✕ */}
      <rect
        x="3" y="11" width="18" height="2" rx="1"
        fill="currentColor"
        style={{
          ...shared,
          transform: open ? 'rotate(45deg)' : 'translateY(-4.5px)',
        }}
      />
      <rect
        x="3" y="11" width="18" height="2" rx="1"
        fill="currentColor"
        style={{
          ...shared,
          transform: open ? 'rotate(-45deg)' : 'translateY(4.5px)',
        }}
      />
    </svg>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()

  const breadcrumbs = getBreadcrumbs(pathname)
  const isHome = pathname === '/'

  // Close menu on route change — delay so page transition covers the old content
  useEffect(() => {
    const timeout = setTimeout(() => setOpen(false), 200)
    return () => clearTimeout(timeout)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-background/80 font-heading">
        <nav className="p-4 h-full">
          <div className="flex items-center h-full gap-2.5">

            {/* Animated menu toggle */}
            <button
              className="h-8 w-8 shrink-0 rounded-full z-[60] flex items-center justify-center
                         hover:bg-accent transition-colors"
              aria-label="Toggle menu"
              onClick={() => setOpen(!open)}
            >
              <MenuIcon open={open} />
            </button>

            {/* Breadcrumb — fades out when menu opens */}
            {!isHome && breadcrumbs.length > 0 && (
              <div
                className="flex items-center gap-3 text-base min-w-0 transition-opacity duration-200"
                style={{ opacity: open ? 0 : 1 }}
              >
                {breadcrumbs.map((crumb, index) => (
                  <span key={crumb.href} className="flex items-center gap-3 min-w-0">
                    {index > 0 && (
                      <span className="text-muted-foreground/40 select-none">/</span>
                    )}
                    <Link
                      href={crumb.href}
                      className={`
                        hover:text-foreground/70 transition-colors truncate
                        ${index === breadcrumbs.length - 1
                          ? 'text-muted-foreground'
                          : 'text-foreground font-medium'
                        }
                      `}
                    >
                      {crumb.label}
                    </Link>
                  </span>
                ))}
              </div>
            )}

          </div>
        </nav>
      </header>

      {/* Full-screen menu overlay */}
      <div
        className="fixed inset-0 z-40 bg-background pointer-events-none font-heading font-medium"
        style={{
          clipPath: open
            ? 'circle(150% at 24px 28px)'
            : 'circle(0% at 24px 28px)',
          transition: open
            ? 'clip-path 0.5s cubic-bezier(0.76, 0, 0.24, 1)'
            : 'clip-path 0.4s cubic-bezier(0.76, 0, 0.24, 1)',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <div className="flex flex-col justify-center items-start h-full px-8 sm:px-16">
          <nav
            className="flex flex-col gap-2 w-full max-w-md"
            onMouseLeave={() => setHoveredItem(null)}
          >
            {navigation.map((item, i) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group relative flex items-center justify-between rounded-xl px-4 py-4
                    text-2xl
                    ${isActive
                      ? 'text-foreground font-medium'
                      : hoveredItem === item.name
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    }
                  `}
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? 'translateY(0)' : 'translateY(12px)',
                    transition: open
                      ? `opacity 0.3s ${0.15 + i * 0.05}s, transform 0.4s cubic-bezier(0.25, 1, 0.5, 1) ${0.15 + i * 0.05}s`
                      : 'opacity 0.15s, transform 0.15s',
                  }}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onClick={() => setOpen(false)}
                >
                  {hoveredItem === item.name && (
                    <motion.div
                      layoutId="nav-highlight"
                      className="absolute inset-0 rounded-xl bg-accent"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.3 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                  <ArrowRight className={`
                    relative z-10 h-5 w-5 transition-all
                    opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0
                  `} />
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </>
  )
}
