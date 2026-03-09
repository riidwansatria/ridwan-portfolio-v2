import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import type { ProjectLayoutData } from "@/components/custom/project-layouts/types"

export function CompareLayout({ project }: { project: ProjectLayoutData }) {
  return (
    <article className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 md:px-6">
        <header className="rounded-2xl border border-border bg-card p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Compare</p>
          <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold leading-tight">{project.title}</h1>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
                {project.abstract}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <Badge
                  key={tag}
                  variant="outline"
                  style={{
                    borderColor: project.accentColors[index] ?? undefined,
                    color: project.accentColors[index] ?? undefined,
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </header>

        <section className="relative min-h-[420px] overflow-hidden rounded-3xl border border-border bg-muted">
          {/* TODO: wire up content */}
          <Image src={project.heroImage} alt={project.title} fill className="object-cover" priority />
        </section>

        <section className="article-content rounded-2xl border border-border bg-background p-6">
          {project.content}
        </section>
      </div>
    </article>
  )
}
