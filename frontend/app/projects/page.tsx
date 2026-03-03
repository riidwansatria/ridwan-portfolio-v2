import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { ProjectCard, type Project } from "@/components/project-card"

export default function ProjectsPage() {
  const projects: Project[] = [
    {
      id: "1",
      slug: "jakarta-demography",
      title: "Visualizing Jakarta's Demography",
      description: "Interactive geospatial analysis exploring demographic patterns and urban development trends across Jakarta's districts using GeoPandas and choropleth mapping.",
      image: "https://images.pexels.com/photos/2126395/pexels-photo-2126395.jpeg",
      year: "2024",
      tags: [
        { name: "GeoPandas", color: "#22c55e" },
        { name: "Python", color: "#3b82f6" },
        { name: "QGIS", color: "#8b5cf6" },
      ],
      featured: true,
      github: "https://github.com/riidwansatria",
    },
    {
      id: "2",
      slug: "transit-network-analysis",
      title: "Transit Network Analysis",
      description: "Comprehensive analysis of public transit accessibility using GTFS data, spatial joins, and catchment area calculations for urban mobility planning.",
      image: "https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg",
      year: "2024",
      tags: [
        { name: "R", color: "#4295ee" },
        { name: "GTFS", color: "#f97316" },
        { name: "Network Analysis", color: "#ec4899" },
      ],
      featured: true,
    },
    {
      id: "3",
      slug: "bus-operations-optimization",
      title: "Optimizing Bus Operations",
      description: "Python-based tool for GPS probe data processing, generating route adherence and schedule deviation reports for transit operations in Maputo.",
      image: "https://images.pexels.com/photos/6091193/pexels-photo-6091193.jpeg",
      year: "2024",
      tags: [
        { name: "Streamlit", color: "#e79e2a" },
        { name: "GPS Analytics", color: "#14b8a6" },
        { name: "Python", color: "#3b82f6" },
      ],
      featured: true,
      demo: "#",
    },
    {
      id: "4",
      slug: "jakarta-flood-warning",
      title: "TOD-Induced Gentrification Analysis",
      description: "Research identifying areas vulnerable to Transit-Oriented Development-induced gentrification, proposing equitable TOD implementation strategies for Jakarta.",
      image: "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg",
      year: "2024",
      tags: [
        { name: "Urban Policy", color: "#6366f1" },
        { name: "GIS", color: "#8b5cf6" },
        { name: "PCA", color: "#0ea5e9" },
      ],
    },
    {
      id: "5",
      slug: "land-use-visualization",
      title: "Aerial Imagery & Land Use Tool",
      description: "Web-based tool for aerial imagery and land use visualization using JavaScript, deployed for TOD area analysis by urban design team at Nikken Sekkei.",
      image: "https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg",
      year: "2023",
      tags: [
        { name: "JavaScript", color: "#eab308" },
        { name: "Web Mapping", color: "#22c55e" },
        { name: "Leaflet", color: "#0ea5e9" },
      ],
    },
    {
      id: "6",
      slug: "nmt-mobility-strategies",
      title: "Non-Motorized Transport Strategies",
      description: "Research and proposed mobility management strategies for non-motorized transportation based on international best practices for JUTPI 3 project.",
      image: "https://images.pexels.com/photos/3971983/pexels-photo-3971983.jpeg",
      year: "2023",
      tags: [
        { name: "Policy Research", color: "#a855f7" },
        { name: "Mobility", color: "#f43f5e" },
      ],
    },
  ]

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
                className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-6 p-4 md:p-5 rounded-2xl border bg-card hover:bg-accent/30 transition-colors duration-200"
              >
                {/* Thumbnail */}
                <div className="hidden md:block relative w-full md:w-40 aspect-video md:aspect-[3/2] rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={project.image}
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
                    {project.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-muted-foreground">
                      {project.year}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag.name}
                          variant="secondary"
                          className="text-xs font-medium px-2 py-0"
                          style={{
                            backgroundColor: `${tag.color}15`,
                            border: `1px solid ${tag.color}40`,
                            color: tag.color,
                          }}
                        >
                          {tag.name}
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
