import { notFound } from "next/navigation"
import { ShowcaseLayout } from "@/components/project-layouts/layout-showcase"
import { getProjectBySlug, getProjectSlugs } from "@/lib/content"
import { renderMdx } from "@/lib/mdx"
import type { Metadata } from "next"

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
    description: project.frontmatter.description,
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

  return (
    <ShowcaseLayout
      project={{
        id: slug,
        slug: frontmatter.slug,
        title: frontmatter.title,
        subtitle: frontmatter.subtitle,
        description: frontmatter.description,
        image: frontmatter.image,
        year: frontmatter.year,
        role: frontmatter.role,
        techStack: frontmatter.tags,
        links: {
          github: frontmatter.github,
          demo: frontmatter.demo,
        },
        nextProject: frontmatter.nextProject,
        content: mdxContent,
      }}
    />
  )
}