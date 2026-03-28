import { notFound } from "next/navigation"
import { ShowcaseLayout } from "@/components/app/layouts/layout-showcase"
import { CaseStudyLayout } from "@/components/app/layouts/layout-case-study"
import { ExplorerLayout } from "@/components/app/layouts/layout-explorer"
import { SplitLayout } from "@/components/app/layouts/layout-split"
import { CompareLayout } from "@/components/app/layouts/layout-compare"
import { getAllProjects, getProjectBySlug, getProjectSlugs } from "@/lib/content"
import { renderMdx } from "@/lib/mdx"
import type { Metadata } from "next"
import type { ProjectLayoutData } from "@/components/app/layouts/types"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.abstract,
  }
}

export default async function ProjectPage(props: Props) {
  const { slug } = await props.params
  const data = getProjectBySlug(slug)

  if (!data) {
    notFound()
  }

  const { frontmatter, content: rawContent } = data
  const mdxContent = await renderMdx(rawContent)
  const projects = getAllProjects()
  const currentIndex = projects.findIndex((project) => project.slug === slug)
  const nextProject = currentIndex >= 0 ? projects[currentIndex + 1] ?? null : null

  const projectData: ProjectLayoutData = {
    slug: frontmatter.slug,
    title: frontmatter.title,
    date: frontmatter.date,
    tags: frontmatter.tags ?? [],
    accentColors: frontmatter.accentColors ?? [],
    heroImage: frontmatter.heroImage,
    abstract: frontmatter.abstract,
    nextProject: nextProject ? { slug: nextProject.slug, title: nextProject.title } : null,
    content: mdxContent,
  }

  switch (frontmatter.layout) {
    case 'case-study':
      return <CaseStudyLayout project={projectData} />
    case 'explorer':
      return <ExplorerLayout project={projectData} />
    case 'split':
      return <SplitLayout project={projectData} />
    case 'compare':
      return <CompareLayout project={projectData} />
    case 'showcase':
    default:
      return <ShowcaseLayout project={projectData} />
  }
}
