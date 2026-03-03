'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import Link from 'next/link'

// Navigation items
const navigation = [
  { name: 'Projects', href: '/projects' },
  { name: 'Research', href: '/research' },
  { name: 'CV', href: '/about' },
]

// Mobile-only navigation
const mobileNavigation = [
  { name: 'Home', href: '/' },
  ...navigation,
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  if (pathname === '/') {
    return null
  }

  return (
    <header className="sticky top-0 z-50 h-12 backdrop-blur-sm bg-background/90 border-b">
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 h-full">
        <div className="flex items-center justify-between h-full">
          
          {/* Mobile nav */}
          <div className="flex sm:hidden mr-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Toggle menu">
                  {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-4/5">
                {/* Hidden title for accessibility */}
                <SheetTitle className="sr-only">Mobile navigation menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Contains navigation links for mobile users.
                </SheetDescription>
                <div className="mt-6 flex flex-col h-full">
                  <div className="flex-1 space-y-2">
                    {mobileNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                        onClick={() => setOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Name */}
          <div className="flex flex-1 items-center">
            <Link href="/">
              <span className="text-sm font-medium tracking-tight text-foreground">
                Ridwan Satria
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-2">
            {navigation.map((item, idx) => (
              <Button
                key={item.name}
                asChild
                variant="link"
                className="rounded-none bg-transparent px-4 py-0 text-sm text-muted-foreground font-medium hover:text-foreground border-r"
              >
                <Link href={item.href} className="flex items-center h-auto">
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
