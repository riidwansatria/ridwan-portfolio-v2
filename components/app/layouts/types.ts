import type { ReactNode } from 'react'

export type ProjectLayout = 'showcase' | 'case-study' | 'explorer' | 'split' | 'compare'

export interface ProjectLayoutData {
  slug: string
  title: string
  date: string
  tags: string[]
  tools: string[]
  accentColors: string[]
  heroImage: string
  abstract: string
  content: ReactNode
  nextProject?: {
    slug: string
    title: string
  } | null
}
