import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { ProjectCard, type Project } from "@/components/app/project-card"
import { getAllProjects } from "@/lib/content"

export default function ProjectsPage() {
  const allProjectData = getAllProjects()
  const projectsForIndex = allProjectData.filter(
    (p) => process.env.NODE_ENV === 'development' || p.status !== 'draft'
  )

  const projects: Project[] = projectsForIndex.map((p, i) => ({
    id: String(i + 1),
    slug: p.slug,
    title: p.title,
    abstract: p.abstract,
    heroImage: p.heroImage,
    date: p.date,
    tags: p.tags,
    accentColors: p.accentColors,
    featured: p.featured,
  }))

  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <>
      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Projects</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Selected work in geospatial analytics, transportation planning, and urban policy research.
        </p>
      </div>

      {/* Featured Projects */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
          Featured
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <div key={project.id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </section>

      {/* Other Projects */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 mb-16">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
          More
        </h2>
        <div className="grid gap-4">
          {otherProjects.map((project) => (
            <div key={project.id}>
              <Link
                href={`/projects/${project.slug}`}
                className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-6 p-2 rounded-2xl border bg-card hover:bg-accent/30 transition-colors duration-200"
              >
                {/* Thumbnail */}
                <div className="hidden md:block relative w-full md:w-54 aspect-video md:aspect-[3/2] rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1.5">
                    {project.title}
                  </h3>
                  <p className="hidden md:block text-sm text-muted-foreground line-clamp-2 mb-3">
                    {project.abstract}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-muted-foreground">
                      {new Date(project.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 2).map((tag, index) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs font-medium px-2 py-0"
                          style={{
                            backgroundColor: `${project.accentColors[index] ?? "#64748b"}15`,
                            border: `1px solid ${project.accentColors[index] ?? "#64748b"}40`,
                            color: project.accentColors[index] ?? "#64748b",
                          }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <ArrowRight className="hidden md:block h-5 w-5 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
