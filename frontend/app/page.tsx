import Link from 'next/link'
import { settingsQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'
import { Button } from '@/components/ui/button'
import { HardHat, Bus, Building2, ArrowRight } from 'lucide-react'
import { ProjectCard } from "@/components/project-card"
import { FadeIn, FadeInStagger } from "@/components/visual/motion-primitives"
import { TextEffect } from "@/components/motion-primitives/text-effect"

export default async function Page() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  })

  const projects = [
    {
      id: "1",
      slug: "jakarta-demography",
      image: 'https://images.pexels.com/photos/2126395/pexels-photo-2126395.jpeg',
      title: "Visualizing Jakarta's Demography",
      description: 'Discover the latest trends in SaaS that are shaping the future of digital solutions and can benefit your business.',
      year: "2024",
      tags: [{ name: "Geopandas", color: "#22c55e" }],
    },
    {
      id: "2",
      slug: "transit-network-analysis",
      image: 'https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg',
      title: 'Transit Network Analysis',
      description: 'Learn the best practices for creating web applications that can handle millions of users without breaking.',
      year: "2023",
      tags: [{ name: "R", color: "#4295ee" }],
    },
    {
      id: "3",
      slug: "bus-operations",
      image: 'https://images.pexels.com/photos/6091193/pexels-photo-6091193.jpeg',
      title: 'Optimizing Bus Operations',
      description: 'How to create and maintain design systems that grow with your product and team while ensuring consistency.',
      year: "2023",
      tags: [{ name: "Streamlit", color: "#e79e2a" }],
    },
  ];

  const posts = [
    {
      id: 2,
      slug: "b",
      image: 'https://k8boaqmtfy4jtiib.public.blob.vercel-storage.com/stock/notess-1-2.webp',
      title: 'International Conference of Asia-Pacific Planning Societies 2025',
      excerpt: 'Learn the best practices for creating web applications that can handle millions of users without breaking.',
      category: 'Web Development',
      authorName: 'Ashwin Santiago',
      date: 'March 12, 2024',
      authorAvatar: 'https://images.pexels.com/photos/7562139/pexels-photo-7562139.jpeg?auto=compress&cs=tinysrgb&w=128',
      href: '#',
    },
    {
      id: 3,
      slug: "c",
      image: 'https://k8boaqmtfy4jtiib.public.blob.vercel-storage.com/stock/notess-1-3.webp',
      title: "Starting Master's Studies @UTokyo",
      excerpt: 'How to create and maintain design systems that grow with your product and team while ensuring consistency.',
      category: 'Design Systems',
      authorName: 'Natali Craig',
      date: 'March 10, 2024',
      authorAvatar: 'https://images.pexels.com/photos/698532/pexels-photo-698532.jpeg?auto=compress&cs=tinysrgb&w=128',
      href: '#',
    },
  ];

  return (
    <>
      {/* Hero section */}
      <div className='h-[calc(100vh-64px)] bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]'>
        <div className="flex flex-col justify-between h-[calc(100vh-80px)] px-4 sm:px-12 inset-0">
          {/* Hero main */}
          <div className="flex flex-1 items-center">
            <div className="max-w-5xl text-left">
              {/* Greeting */}
              <TextEffect
                per="word"
                preset="fade-in-blur"
                delay={0.1}
                speedReveal={1.5}
                as="span"
                className="text-2xl md:text-3xl lg:text-5xl text-foreground font-semibold tracking-tight block mb-2"
              >
                Hey there! 👋
              </TextEffect>

              {/* Main headline */}
              <TextEffect
                per="word"
                preset="fade-in-blur"
                delay={0.5}
                speedReveal={1.2}
                as="h1"
                className="text-3xl md:text-4xl lg:text-6xl text-foreground font-semibold tracking-tight mb-4"
              >
                I'm Ridwan, Transportation & Urban Policy student at the University of Tokyo.
              </TextEffect>

              {/* Bio */}
              <FadeIn delay={1.2}>
                <p className="hidden md:inline text-base lg:text-xl text-muted-foreground">
                  Welcome to my personal website. This site will be used as a
                  platform to share my <br /> thoughts and showcase the projects that I&apos;m
                  currently doing/I&apos;ve done in the past.
                </p>
              </FadeIn>

              {/* Under construction notice */}
              <FadeIn delay={1.4}>
                <p className="text-sm md:text-base text-muted-foreground pt-2">
                  🚧 This website is still heavily under construction.
                </p>
              </FadeIn>

              {/* Buttons */}
              <FadeIn delay={1.6}>
                <div className="inline-flex space-x-2 py-6">
                  <Button asChild>
                    <Link href="/about">About me</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/notes">Notes</Link>
                  </Button>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Hero tags */}
          <div className="hidden md:inline pb-3 justify-between items-center">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="default" className='rounded-full shadow-none hover:bg-red-50 dark:hover:bg-red-950'>
                <HardHat />
                <span>Civil Engineering</span>
              </Button>
              <Button variant="outline" size="default" className='rounded-full shadow-none hover:bg-green-50 dark:hover:bg-green-950'>
                <Building2 />
                <span>Urban Planning</span>
              </Button>
              <Button variant="outline" size="default" className='rounded-full shadow-none hover:bg-blue-50 dark:hover:bg-blue-950'>
                <Bus />
                <span>Transportation Planning</span>
              </Button>
            </div>
          </div>

          {/* Hero footer */}
          <div className="pt-2 pb-3 border-t flex justify-between items-center font-mono">
            <span className="flex text-xs md:text-sm text-muted-foreground">
              Based in Tokyo, Japan
            </span>
            <div className="flex">
              <Button asChild variant="link" className="text-xs md:text-sm text-muted-foreground p-0">
                <Link href="#projects">Featured Projects ↓</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Projects section */}
      <section id="projects" className='px-4 sm:px-12 py-24 border-t'>
        <FadeIn>
          <div className="mb-2 sm:mb-4 md:mb-12 flex justify-between items-center">
            <h2 className="md:text-4xl text-2xl font-medium tracking-tight flex text-foreground">
              Featured Projects
            </h2>
            <div className="flex">
              <Link
                href="/projects"
                className="group hidden md:flex shrink-0 items-center justify-end md:w-auto text-muted-foreground p-4 hover:text-foreground transition-colors"
              >
                <p className="mr-1 text-xs md:text-sm font-mono">View all</p>
                <ArrowRight className="h-4 w-4 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </FadeIn>

        <FadeInStagger className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-3">
          {projects.map((project) => (
            <FadeIn key={project.id}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </FadeInStagger>
      </section>

      {/* Notes section */}
      <section id="notes" className='px-4 sm:px-12 py-20 mb-40 border-t'>
        <FadeIn>
          <div className="mb-2 sm:mb-4 md:mb-12 flex justify-between items-center">
            <h2 className="md:text-4xl text-2xl font-medium tracking-tight flex text-foreground">
              Latest Notes
            </h2>
            <div className="flex">
              <Link
                href="/notes"
                className="group hidden md:flex shrink-0 items-center justify-end md:w-auto text-muted-foreground p-4 hover:text-foreground transition-colors"
              >
                <p className="mr-1 text-xs md:text-sm font-mono">Read all</p>
                <ArrowRight className="h-4 w-4 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </FadeIn>

        <FadeInStagger className="border-b">
          {posts.map(post => {
            const title = post.title || post.slug

            return (
              <FadeIn key={post.slug}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <Link href={`/notes/${post.slug}`} itemProp="url">
                    <div className='md:px-2 py-2 sm:py-4 md:py-6 border-t transition-colors hover:bg-accent/30'>
                      <h3 itemProp="headline" className="text-foreground font-semibold text-base md:text-xl">{title}</h3>
                      <small className="text-muted-foreground">{post.date}</small>
                    </div>
                  </Link>
                </article>
              </FadeIn>
            )
          })}
        </FadeInStagger>
      </section>
    </>
  )
}