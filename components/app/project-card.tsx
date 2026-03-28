"use client";

import { useState, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { motion, AnimatePresence } from "motion/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Spotlight } from "@/components/app/motion/spotlight";
import { Button } from "@/components/ui/button";

export type Project = {
  id: string;
  slug: string;
  title: string;
  abstract: string;
  heroImage: string;
  date: string;
  accentColors: string[];
  tags?: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
};

const detailVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { delay: 0.15, duration: 0.2 } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.1 } },
};

export function ProjectCard({
  project,
}: {
  project: Project;
}) {
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);

  const year = new Date(project.date).toLocaleDateString("en-US", { year: "numeric" });
  const tags = project.tags ?? [];

  const handleOpen = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setOrigin({
        x: rect.left + rect.width / 2 - window.innerWidth / 2,
        y: rect.top + rect.height / 2 - window.innerHeight / 2,
      });
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          ref={triggerRef}
          onClick={handleOpen}
          className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-card text-left transition-all hover:border-foreground/20 hover:bg-accent/70"
        >
          <Spotlight
            className="z-10 bg-foreground/5 blur-3xl"
            size={240}
            springOptions={{ bounce: 0.3, duration: 0.1 }}
          />

          <div className="relative aspect-16/10 overflow-hidden bg-muted">
            <img
              src={project.heroImage}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-1 flex-col p-4">
            <h3 className="mb-1.5 text-sm font-semibold leading-snug text-foreground">
              {project.title}
            </h3>
            <p className="flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
              {project.abstract}
            </p>
          </div>
        </button>
      </DialogPrimitive.Trigger>

      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </DialogPrimitive.Overlay>

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <DialogPrimitive.Content asChild forceMount>
                <motion.div
                  className="relative w-full max-w-3xl overflow-hidden rounded-[28px] border border-border bg-card shadow-[0_40px_120px_-32px_rgba(0,0,0,0.8)]"
                  initial={{ opacity: 0, scale: 0.4, x: origin.x, y: origin.y }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  exit={{
                    opacity: 0,
                    scale: 0.4,
                    x: origin.x,
                    y: origin.y,
                    transition: { type: "spring", bounce: 0.12, duration: 0.35 },
                  }}
                  transition={{ type: "spring", bounce: 0.12, duration: 0.45 }}
                >
                  <VisuallyHidden>
                    <DialogPrimitive.Title>{project.title}</DialogPrimitive.Title>
                    <DialogPrimitive.Description>{project.abstract}</DialogPrimitive.Description>
                  </VisuallyHidden>

                  <DialogPrimitive.Close className="absolute top-6 right-6 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background/60 text-foreground backdrop-blur-sm transition-colors hover:bg-background/80">
                    <X size={12} />
                  </DialogPrimitive.Close>

                  <div className="relative m-3 overflow-hidden rounded-[20px]">
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className="w-full aspect-16/10 object-cover"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-background/60 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                      {year}
                    </span>
                  </div>

                  <div className="space-y-3 px-5 pt-1 pb-5">
                    <h2 className="text-2xl font-bold text-card-foreground leading-tight">
                      {project.title}
                    </h2>
                    <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">{project.abstract}</p>

                    <motion.div
                      className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between"
                      variants={detailVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <div className="hidden sm:flex flex-wrap gap-1.5">
                        {tags.slice(0, 5).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-foreground bg-muted border border-border rounded-full px-3 py-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {project.github && (
                          <Button variant="outline" size="sm" className="rounded-full" asChild>
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <SiGithub size={14} />
                              GitHub
                            </a>
                          </Button>
                        )}
                        {project.demo && (
                          <Button size="sm" className="rounded-full" asChild>
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                              Live Demo <ArrowUpRight size={12} />
                            </a>
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </DialogPrimitive.Content>
            </div>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
