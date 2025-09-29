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
      <nav className="px-4 sm:px-12 h-full">
        <div className="flex items-center justify-between h-full">
          
          {/* Mobile nav trigger on left */}
          <div className="flex sm:hidden mr-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-96">
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

          {/* Logo */}
          <a href="/" className="flex flex-1 items-center">
            <img
              src="/images/logo.svg"
              alt="Logo"
              width={44}
              height={44}
              className="h-10 w-10"
            />
          </a>

          {/* Desktop nav right */}
          <div className="hidden sm:flex items-center">
            {navigation.map((item, idx) => (
              <Button
                key={item.name}
                asChild
                variant="link"
                className={`rounded-none bg-transparent px-4 py-0 text-sm text-gray-600 font-mono font-medium tracking-wider ${
                  idx !== 0 ? 'border-l border-gray-200' : ''
                }`}
              >
                <a href={item.href} className="flex items-center h-auto">
                  {item.name}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}