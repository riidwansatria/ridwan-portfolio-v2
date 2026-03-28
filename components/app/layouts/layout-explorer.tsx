import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import type { ProjectLayoutData } from "@/components/app/layouts/types"

export function ExplorerLayout({ project }: { project: ProjectLayoutData }) {
  return (
    <article className="min-h-screen bg-background text-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.8fr)] md:px-6">
        <section className="md:sticky md:top-20 md:h-[calc(100vh-7rem)]">
          {/* TODO: wire up content */}
          <div className="relative h-full min-h-[420px] overflow-hidden rounded-3xl border border-border bg-muted">
            <Image src={project.heroImage} alt={project.title} fill className="object-cover" priority />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-6 text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-white/70">Explorer</p>
              <h1 className="mt-2 text-3xl font-semibold leading-tight">{project.title}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80">{project.abstract}</p>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Guided Tour</p>
            <div className="mt-4 flex flex-wrap gap-2">
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
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.tags.join(" • ")}</p>
          </div>

          <div className="article-content rounded-2xl border border-border bg-background p-5">
            {project.content}
          </div>
        </aside>
      </div>
    </article>
  )
}
