import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import type { ProjectLayoutData } from "@/components/app/layouts/types"

export function SplitLayout({ project }: { project: ProjectLayoutData }) {
  return (
    <article className="min-h-screen bg-background text-foreground">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-2 md:px-6">
        <section className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Split View</p>
            <h1 className="mt-2 text-3xl font-semibold leading-tight">{project.title}</h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{project.abstract}</p>
            <div className="mt-5 flex flex-wrap gap-2">
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

          <div className="relative min-h-80 overflow-hidden rounded-2xl border border-border bg-muted">
            {/* TODO: wire up content */}
            <Image src={project.heroImage} alt={project.title} fill className="object-cover" priority />
          </div>
        </section>

        <section className="article-content rounded-2xl border border-border bg-background p-6">
          {project.content}
        </section>
      </div>
    </article>
  )
}
