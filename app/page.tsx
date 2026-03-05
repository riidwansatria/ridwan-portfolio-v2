import Link from 'next/link'
import Image from 'next/image'
import { getAllProjects, getAllNotes } from '@/lib/content'
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function Page() {
  const allProjects = getAllProjects()
  const allNotes = getAllNotes()

  const projects = allProjects.slice(0, 3).map((p, i) => ({
    id: String(i + 1),
    slug: p.slug,
    image: p.image,
    title: p.title,
    description: p.description,
    year: p.year,
    tags: p.tags.slice(0, 2),
  }))

  const posts = allNotes.slice(0, 3).map((n) => ({
    slug: n.slug,
    title: n.title,
    date: new Date(n.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
  }))

  const photos = [
    { city: "Tokyo", src: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { city: "Jakarta", src: "https://images.pexels.com/photos/2126395/pexels-photo-2126395.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { city: "Kyoto", src: "https://images.pexels.com/photos/590478/pexels-photo-590478.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { city: "Bangkok", src: "https://images.pexels.com/photos/1031593/pexels-photo-1031593.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { city: "Manila", src: "https://images.pexels.com/photos/3519568/pexels-photo-3519568.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { city: "Maputo", src: "https://images.pexels.com/photos/3836368/pexels-photo-3836368.jpeg?auto=compress&cs=tinysrgb&w=600" },
  ]

  const reading = {
    title: "Seeing Like a State",
    author: "James C. Scott",
    year: "1998",
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-8">
      <div className="space-y-16">

        {/* Intro */}
        <section>
          <div className="flex items-start justify-between gap-8">
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
                  <h1 className="text-3xl font-semibold text-foreground">Ridwan Satria</h1>
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
                className="group flex flex-col overflow-hidden rounded-2xl border bg-card hover:border-foreground/25 transition-colors duration-200"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 33vw, 100vw"
                  />
                  <span className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-0.5 rounded-full">
                    {project.year}
                  </span>
                </div>
                <div className="flex flex-col flex-1 p-4">
                  <h3 className="text-sm font-semibold text-foreground leading-snug mb-1.5">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Notes */}
        <section>
          <div className="flex justify-between items-center mb-5">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Notes</p>
            <Link href="/notes" className="group flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors">
              Read all
              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div>
            {posts.map((post) => (
              <article key={post.slug} className="border-t first:border-t-0 border-border/60">
                <Link href={`/notes/${post.slug}`}>
                  <div className="-mx-2 px-2 py-3 rounded-lg transition-colors hover:bg-accent/50">
                    <p className="text-sm font-medium text-foreground leading-snug">{post.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{post.date}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Reading */}
        <section>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-5">Reading</p>
          <div className="flex gap-3 items-start">
            <div className="w-10 h-14 bg-muted rounded shrink-0 border border-border/40" />
            <div>
              <p className="text-sm font-medium text-foreground leading-snug">{reading.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{reading.author}, {reading.year}</p>
            </div>
          </div>
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
            <a href="https://github.com/riidwansatria" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-foreground border border-border rounded-full px-3.5 py-1.5 hover:bg-accent transition-colors">
              GitHub <ArrowUpRight size={12} />
            </a>
            <a href="https://linkedin.com/in/ridwansatria" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-foreground border border-border rounded-full px-3.5 py-1.5 hover:bg-accent transition-colors">
              LinkedIn <ArrowUpRight size={12} />
            </a>
            <a href="https://twitter.com/riidwansatria" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-foreground border border-border rounded-full px-3.5 py-1.5 hover:bg-accent transition-colors">
              X <ArrowUpRight size={12} />
            </a>
            <a href="mailto:ridwansatria@g.ecc.u-tokyo.ac.jp" className="inline-flex items-center gap-1.5 text-sm text-foreground border border-border rounded-full px-3.5 py-1.5 hover:bg-accent transition-colors">
              Email <ArrowUpRight size={12} />
            </a>
          </div>
        </section>

      </div>
    </div>
  )
}
