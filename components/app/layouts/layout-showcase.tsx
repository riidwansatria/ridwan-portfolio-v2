"use client"

import { useEffect, createContext, useContext } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { TransitionLink } from "@/components/primitives/transition-link"
import { Badge } from "@/components/ui/badge"
import { motion, useReducedMotion, type Transition } from "motion/react"
import type { ProjectLayoutData } from "@/components/app/layouts/types"

// — Entrance animation helpers (local to showcase layout) —

const viewport = { once: true, margin: "0px 0px -50px 0px" }
const subtleEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0]
const StaggerContext = createContext(false)

function FadeInStagger({ faster = false, children, className, delay = 0, staggerDuration, ...props }:
  React.ComponentPropsWithoutRef<typeof motion.div> & { faster?: boolean; delay?: number; staggerDuration?: number }
) {
  const stagger = staggerDuration ?? (faster ? 0.08 : 0.15)
  return (
    <StaggerContext.Provider value={true}>
      <motion.div
        initial="hidden" whileInView="visible" viewport={viewport}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
        className={className} {...props}
      >
        {children}
      </motion.div>
    </StaggerContext.Provider>
  )
}

function FadeIn({ children, className, delay = 0, ...props }:
  React.ComponentPropsWithoutRef<typeof motion.div> & { delay?: number }
) {
  const shouldReduceMotion = useReducedMotion()
  const inStagger = useContext(StaggerContext)
  const variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  }
  const transition: Transition = { duration: 0.5, ease: subtleEase, ...(inStagger ? {} : { delay }) }
  return inStagger
    ? <motion.div variants={variants} transition={transition} className={className} {...props}>{children}</motion.div>
    : <motion.div variants={variants} initial="hidden" whileInView="visible" viewport={viewport} transition={transition} className={className} {...props}>{children}</motion.div>
}

function ScaleIn({ children, className, delay = 0, ...props }:
  React.ComponentPropsWithoutRef<typeof motion.div> & { delay?: number }
) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewport} transition={{ duration: 0.6, ease: subtleEase, delay }}
      className={className} {...props}
    >
      {children}
    </motion.div>
  )
}

function formatProjectDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })
}

export function ShowcaseLayout({ project }: { project: ProjectLayoutData }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="w-full bg-background px-4 py-2 text-foreground md:flex md:h-[calc(100vh-60px)] md:flex-col md:px-4 md:pb-4">
      <FadeInStagger className="flex flex-col gap-6 md:grid md:min-h-0 md:flex-1 md:grid-cols-12 md:grid-rows-12 md:gap-4">
        <ScaleIn className="relative flex aspect-video flex-col overflow-hidden rounded-2xl border border-border bg-muted md:col-span-8 md:row-span-12 md:h-full md:aspect-auto">
          <div className="absolute inset-x-0 top-0 z-10 flex h-8 items-center border-b border-white/10 bg-black/20 px-4 backdrop-blur-md">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            </div>
            <div className="mx-auto text-[10px] tracking-wider text-white/50">{project.slug}</div>
          </div>

          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
        </ScaleIn>

        <div className="flex flex-col gap-4 md:col-span-4 md:row-span-12 md:h-full md:min-h-0">
          <FadeIn className="rounded-2xl border border-border bg-card p-4">
            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {formatProjectDate(project.date)}
                </p>
                <h1 className="mt-2 text-xl font-medium leading-[1.1] tracking-tight md:text-2xl lg:text-3xl">
                  {project.title}
                </h1>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70">
                    Tags
                  </span>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.tags.map((tag, index) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[10px]"
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

              </div>
            </div>
          </FadeIn>

          <FadeIn className="rounded-2xl border border-border bg-muted/20 p-5">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70">
              Abstract
            </span>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.abstract}</p>
          </FadeIn>

          <FadeIn className="rounded-2xl border border-border bg-background p-5 md:min-h-[220px] md:flex-1 md:overflow-y-auto">
            <div className="prose prose-sm prose-neutral max-w-none dark:prose-invert">
              {project.content}
            </div>
          </FadeIn>

          {project.nextProject && (
            <FadeIn>
              <TransitionLink
                href={`/projects/${project.nextProject.slug}`}
                transition="next"
                className="group flex items-center justify-between gap-2 rounded-2xl border border-border bg-card p-1 pl-4 transition-all hover:bg-accent/70 hover:border-foreground/20"
              >
                <div className="flex flex-col gap-0.5 overflow-hidden">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Next Project
                  </span>
                  <span className="truncate text-xs font-medium">{project.nextProject.title}</span>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-secondary">
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </div>
              </TransitionLink>
            </FadeIn>
          )}
        </div>
      </FadeInStagger>
    </div>
  )
}
