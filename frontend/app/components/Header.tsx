'use client'

import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'

// example navigation (replace with Sanity data later)
const navigation = [
  { name: 'About', href: '/about', current: false },
  { name: 'Blog', href: '/blog', current: false },
  { name: 'Projects', href: '/projects', current: false },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 h-20 backdrop-blur-lg bg-white/80 border-b">
      <nav className="px-12 h-full">
        <div className="flex items-center justify-between h-full">
          
          {/* Logo left */}
          <a href="/" className="flex items-center">
            <img
              src="/images/logo.svg"
              alt="Logo"
              width={44}
              height={44}
              className="h-10 w-10"
            />
          </a>

          {/* Nav wrapper */}
          <div>
            {/* Desktop nav right */}
            <div className="hidden sm:flex items-center gap-2">
              {navigation.map((item) => (
                <Button asChild key={item.name} variant={item.current ? "outline" : "ghost"}>
                  <a href={item.href} className="text-sm font-medium tracking-wider uppercase">
                    {item.name}
                  </a>
                </Button>
              ))}
            </div>

            {/* Mobile nav trigger */}
            <div className="flex sm:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <div className="mt-6 space-y-2">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={`block rounded-md px-3 py-2 text-base font-medium ${
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-800 hover:bg-gray-200'
                        }`}
                        onClick={() => setOpen(false)}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}