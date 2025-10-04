'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ThemeToggle } from '@/app/components/ThemeToggle'
import Link from 'next/link'
import Image from 'next/image'

// Navigation items
const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Projects', href: '/projects' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 h-20 backdrop-blur-lg bg-background/80 border-b">
      <nav className="px-4 sm:px-12 h-full">
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
                <div className="mt-6 flex flex-col h-full font-mono">
                  <div className="flex-1 space-y-2">
                    {navigation.map((item) => (
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
                  {/* Theme toggle in mobile menu */}
                  <div className="py-4 border-t">
                    <div className="px-3 py-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-foreground">Theme</span>
                      <div className="scale-75">
                        <ThemeToggle />
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <div className="flex flex-1 items-center">
            <Link href="/">
              <Image
                src="/images/logo.svg"
                alt="Logo"
                width={44}
                height={44}
                className="h-10 w-10"
              />
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-2">
            {navigation.map((item, idx) => (
              <Button
                key={item.name}
                asChild
                variant="link"
                className="rounded-none bg-transparent px-4 py-0 text-sm text-muted-foreground font-mono font-medium tracking-wider hover:text-foreground border-r"
              >
                <Link href={item.href} className="flex items-center h-auto">
                  {item.name}
                </Link>
              </Button>
            ))}
            <ThemeToggle className="text-muted-foreground" />
          </div>
        </div>
      </nav>
    </header>
  )
}