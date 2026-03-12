import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import type { ProjectLayoutData } from "@/components/app/layouts/types"

function formatProjectDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })
}

export function CaseStudyLayout({ project }: { project: ProjectLayoutData }) {
  return (
    <article className="min-h-screen bg-background text-foreground">
      <header className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-12">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, index) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[11px] px-2.5 py-0.5"
                style={{
                  borderColor: project.accentColors[index] ?? undefined,
                  color: project.accentColors[index] ?? undefined,
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {formatProjectDate(project.date)}
            </p>
            <h1 className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              {project.title}
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {project.abstract}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-2 text-sm text-muted-foreground">
            <span>{project.tools.join(" • ")}</span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-10">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-muted">
          <Image src={project.heroImage} alt={project.title} fill className="object-cover" priority />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-24">
        <div className="article-content case-study-body">{project.content}</div>
      </div>
    </article>
  )
}
