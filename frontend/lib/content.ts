import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ProjectFrontmatter {
  title: string
  slug: string
  description: string
  subtitle: string
  image: string
  year: string
  role: string
  tags: Array<{ name: string; color: string }>
  featured?: boolean
  github?: string
  demo?: string
  nextProject?: { slug: string; title: string }
  order?: number
}

export interface NoteFrontmatter {
  title: string
  slug: string
  date: string
  excerpt?: string
  category?: string
  tags?: string[]
  coverImage?: string
  author?: { name: string; avatar?: string }
  published?: boolean
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const CONTENT_DIR = path.join(process.cwd(), 'content')

function getContentDir(type: 'projects' | 'notes') {
  return path.join(CONTENT_DIR, type)
}

function readMdxFile<T>(filePath: string): { frontmatter: T; content: string } {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { frontmatter: data as T, content }
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export function getAllProjects(): ProjectFrontmatter[] {
  const dir = getContentDir('projects')
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))

  return files
    .map((file) => {
      const { frontmatter } = readMdxFile<ProjectFrontmatter>(path.join(dir, file))
      return frontmatter
    })
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
}

export function getProjectBySlug(slug: string) {
  const dir = getContentDir('projects')
  const filePath = path.join(dir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  return readMdxFile<ProjectFrontmatter>(filePath)
}

export function getProjectSlugs(): string[] {
  const dir = getContentDir('projects')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

// ---------------------------------------------------------------------------
// Notes
// ---------------------------------------------------------------------------

export function getAllNotes(): NoteFrontmatter[] {
  const dir = getContentDir('notes')
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))

  return files
    .map((file) => {
      const { frontmatter } = readMdxFile<NoteFrontmatter>(path.join(dir, file))
      return frontmatter
    })
    .filter((n) => n.published !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getNoteBySlug(slug: string) {
  const dir = getContentDir('notes')
  const filePath = path.join(dir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  return readMdxFile<NoteFrontmatter>(filePath)
}

export function getNoteSlugs(): string[] {
  const dir = getContentDir('notes')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

// ---------------------------------------------------------------------------
// Combined (for sitemap, etc.)
// ---------------------------------------------------------------------------

export function getAllContentSlugs() {
  return {
    projects: getProjectSlugs().map((slug) => ({ slug, type: 'project' as const })),
    notes: getNoteSlugs().map((slug) => ({ slug, type: 'note' as const })),
  }
}
