export const revalidate = 3600

import Link from 'next/link'
import Image from 'next/image'
import { getAllProjects, getAllNotes } from '@/lib/content'
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NotesList } from '@/components/app/notes-list'
import { Spotlight } from '@/components/app/motion/spotlight'
import { ReadingSection } from '@/components/app/reading-section'

export default async function Page() {
  const allProjects = getAllProjects()
  const allNotes = getAllNotes()
  const visibleProjects = allProjects.filter(
    (p) => process.env.NODE_ENV === 'development' || p.status !== 'draft'
  )
  const visibleNotes = allNotes.filter(
    (n) => process.env.NODE_ENV === 'development' || n.status !== 'draft'
  )

  const projects = visibleProjects.slice(0, 3).map((p, i) => ({
    id: String(i + 1),
    slug: p.slug,
    heroImage: p.heroImage,
    title: p.title,
    abstract: p.abstract,
    date: p.date,
    tags: p.tags.slice(0, 2),
    accentColors: p.accentColors,
  }))

  const posts = visibleNotes.slice(0, 3).map((n) => ({
    slug: n.slug,
    title: n.title,
    abstract: n.abstract,
    date: new Date(n.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  }))

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-8">
      <div className="space-y-16">

        {/* Intro */}
        <section>
          <div className="flex items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-muted shrink-0 overflow-hidden">
                  <Image
                    src="/images/avatar.jpg"
                    alt="Ridwan Satria"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h1 className="font-heading font-semibold text-3xl text-foreground">Ridwan Satria</h1>
                  <p className="text-sm text-muted-foreground">MEng Student · The University of Tokyo</p>
                </div>
              </div>

              <p className="text-base text-foreground leading-relaxed max-w-4xl">
                Aspiring development consultant with a focus on transport planning and spatial analytics. Building a portfolio at the intersection of data and policy. Graduate student at UTokyo's
                International Projects Lab.
              </p>

              <div className="flex items-center gap-2 mt-5">
                <Button asChild variant="default" size="sm">
                  <Link href="/about">About<ArrowRight size={10} /></Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a href="/Resume_2026_01.pdf" target="_blank" rel="noopener noreferrer">
                    Resume<Download size={10} />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className='mt-24'>
          <div className="flex justify-between items-center mb-5">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Projects</p>
            <Link href="/projects" className="group flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors">
              View all
              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border bg-card hover:bg-accent/70 hover:border-foreground/20 transition-all"
              >
                <Spotlight className="z-10 bg-foreground/5 blur-3xl" size={240} springOptions={{ bounce: 0.3, duration: 0.1 }} />
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 33vw, 100vw"
                  />
                  <span className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-0.5 rounded-full">
                    {new Date(project.date).toLocaleDateString("en-US", { year: "numeric" })}
                  </span>
                </div>
                <div className="flex flex-col flex-1 p-4">
                  <h3 className="text-sm font-semibold text-foreground leading-snug mb-1.5">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {project.abstract}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Notes */}
        <section>
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Notes</p>
            <Link href="/notes" className="group flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors">
              Read all
              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <NotesList posts={posts} />
        </section>

        {/* Reading */}
        <section>
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Reading</p>
            <Link href="/bookshelf" className="group flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors">
              View all
              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <ReadingSection />
        </section>

        {/* Connect */}
        <section>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-5">Connect</p>
          <p className="text-sm text-muted-foreground">
            Feel free to contact me at{' '}
            <a href="mailto:ridwansatria@g.ecc.u-tokyo.ac.jp" className="underline underline-offset-2 hover:text-foreground transition-colors">
              ridwansatria@g.ecc.u-tokyo.ac.jp
            </a>
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            <a href="https://github.com/riidwansatria" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-sm text-foreground bg-secondary rounded-full px-3.5 py-1.5 hover:bg-secondary/70 transition-colors">
              GitHub <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="https://linkedin.com/in/ridwansatria" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-sm text-foreground bg-secondary rounded-full px-3.5 py-1.5 hover:bg-secondary/70 transition-colors">
              LinkedIn <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="https://twitter.com/riidwansatria" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-sm text-foreground bg-secondary rounded-full px-3.5 py-1.5 hover:bg-secondary/70 transition-colors">
              X <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="mailto:ridwansatria@g.ecc.u-tokyo.ac.jp" className="group inline-flex items-center gap-1.5 text-sm text-foreground bg-secondary rounded-full px-3.5 py-1.5 hover:bg-secondary/70 transition-colors">
              Email <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </section>

      </div>
    </div>
  )
}
