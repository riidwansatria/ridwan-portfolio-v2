import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ProjectFrontmatter {
  title: string
  slug: string
  date: string
  status: 'draft' | 'published'
  tags: string[]
  tools: string[]
  accentColors: string[]
  heroImage: string
  abstract: string
  layout?: 'showcase' | 'case-study' | 'explorer' | 'split' | 'compare'
  featured: boolean
}

export interface NoteFrontmatter {
  title: string
  slug: string
  date: string
  status: 'draft' | 'published'
  tags: string[]
  category: 'city-read' | 'method-note' | 'policy-read'
  abstract: string
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

function isVisible(status: 'draft' | 'published') {
  return process.env.NODE_ENV === 'development' || status !== 'draft'
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
    .filter((project) => isVisible(project.status))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getProjectBySlug(slug: string) {
  const dir = getContentDir('projects')
  const filePath = path.join(dir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const data = readMdxFile<ProjectFrontmatter>(filePath)
  return isVisible(data.frontmatter.status) ? data : null
}

export function getProjectSlugs(): string[] {
  return getAllProjects().map((project) => project.slug)
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
    .filter((note) => isVisible(note.status))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getNoteBySlug(slug: string) {
  const dir = getContentDir('notes')
  const filePath = path.join(dir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const data = readMdxFile<NoteFrontmatter>(filePath)
  return isVisible(data.frontmatter.status) ? data : null
}

export function getNoteSlugs(): string[] {
  return getAllNotes().map((note) => note.slug)
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
