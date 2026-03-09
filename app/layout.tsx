import { TransitionProvider } from '@/lib/transition-context'
import './globals.css'

import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Public_Sans, Plus_Jakarta_Sans } from 'next/font/google'
import { Toaster } from 'sonner'

import { DevTools } from "@/components/custom/dev-tools"
import { ThemeProvider } from "@/components/custom/theme-provider"
import Footer from '@/components/custom/Footer'
import Header from '@/components/custom/Header'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s | ${siteConfig.title}`,
    default: siteConfig.title,
  },
  description: siteConfig.description,
  openGraph: {
    images: [siteConfig.ogImage],
  },
}

const publicSans = Public_Sans({
  variable: '--font-public-sans',
  subsets: ['latin'],
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${publicSans.variable} ${plusJakarta.variable} bg-white text-black scroll-smooth`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TransitionProvider>
            <section className="min-h-screen">
              <Toaster />
              <Header />
              <main className="pt-16">{children}</main>
              <Footer />
            </section>
          </TransitionProvider>
        </ThemeProvider>
        <SpeedInsights />
        <DevTools />
      </body>
    </html>
  )
}
