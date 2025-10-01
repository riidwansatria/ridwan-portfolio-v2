import {Suspense} from 'react'
import Link from 'next/link'
import Color from 'color';
import {PortableText} from '@portabletext/react'

import {AllPosts} from '@/app/components/Posts'
import GetStartedCode from '@/app/components/GetStartedCode'
import SideBySideIcons from '@/app/components/SideBySideIcons'
import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { HardHat, Bus, Building2 } from 'lucide-react'

export default async function Page() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  const projects = [
    {
      id: 1,
      slug: "a",
      image: 'https://images.pexels.com/photos/2126395/pexels-photo-2126395.jpeg',
      title: "Visualizing Jakarta's Demography",
      excerpt: 'Discover the latest trends in SaaS that are shaping the future of digital solutions and can benefit your business.',
      category: {
        name: "Geopandas",
        color: "#22c55e"
      },
    },
    {
      id: 2,
      slug: "b",
      image: 'https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg',
      title: 'Transit Network Analysis',
      excerpt: 'Learn the best practices for creating web applications that can handle millions of users without breaking.',
      category: {
        name: "R",
        color: "#4295ee" 
      },
    },
    {
      id: 3,
      slug: "c",
      image: 'https://images.pexels.com/photos/6091193/pexels-photo-6091193.jpeg',
      title: 'Optimizing Bus Operations',
      excerpt: 'How to create and maintain design systems that grow with your product and team while ensuring consistency.',
      category: {
        name: "Streamlit",
        color: "#e79e2a"
      },
    },
  ];

  const posts = [
    {
      id: 1,
      slug: "a",
      image: 'https://k8boaqmtfy4jtiib.public.blob.vercel-storage.com/stock/blogs-1-1.webp',
      title: 'Enhancing Accessibility with ARIA in React',
      excerpt: 'Discover the latest trends in SaaS that are shaping the future of digital solutions and can benefit your business.',
      category: 'Industry Insights',
      authorName: 'Sienna Hewitt',
      date: 'March 15, 2024',
      authorAvatar: 'https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=128',
      href: '#',
    },
    {
      id: 2,
      slug: "b",
      image: 'https://k8boaqmtfy4jtiib.public.blob.vercel-storage.com/stock/blogs-1-2.webp',
      title: 'Designing Scalable UI with Tailwind CSS',
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
      image: 'https://k8boaqmtfy4jtiib.public.blob.vercel-storage.com/stock/blogs-1-3.webp',
      title: 'TypeScript Tips: Advanced Typing Patterns',
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
      <div className='h-[calc(100vh-52px)] bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]'>
        <div className="flex flex-col justify-between h-[calc(100vh-80px)] px-4 sm:px-12 inset-0">
          {/* Centered content */}
          <div className="flex flex-1 items-center">
            <div className="max-w-5xl text-left">
              <h1 className="md:text-6xl text-3xl text-gray-800 font-semibold tracking-tight mb-4">
                <span className="text-2xl md:text-5xl">Hey there! 👋{" "}</span>
                <br />
                I'm Ridwan, a Civil Engineering student at the University of Tokyo.
              </h1>
              <p className="text-xl text-gray-600">
                Welcome to my personal website. This site will be used as a
                platform to share my <br /> thoughts and showcase the projects that I'm
                currently doing/I've done in the past.
              </p>
              <div className="inline-flex space-x-2 py-6">
                <Button asChild>
                  <Link href="/about">About me</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/projects">Blog</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom content */}
          <div className="pb-3 justify-between items-center">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="default" className='rounded-full shadow-none hover:bg-red-50 text-gray-800'>
                <HardHat />
                <span>Civil Engineering</span>
              </Button>
              <Button variant="outline" size="default" className='rounded-full shadow-none hover:bg-green-50 text-gray-800'>
                <Building2 />
                <span>Urban Planning</span>
              </Button>
              <Button variant="outline" size="default" className='rounded-full shadow-none hover:bg-blue-50 text-gray-800'>
                <Bus />
                <span>Transportation Planning</span>
              </Button>
            </div>
          </div>
          <div className="pt-2 pb-3 border-t-1 flex justify-between items-center">
            <span className="flex text-md text-gray-500">
              Based in Tokyo, Japan
            </span>
            <div className="flex">
              <Button asChild variant="link" className="font-normal text-md text-gray-500 p-0">
                <Link href="#projects">Selected Projects ↓</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Projects section */}
      <div id="projects" className='px-4 sm:px-12 py-20 border-t-1 border-b-1'>
        <div className="mb-8 border-b-0 flex justify-between items-center">
          <h2 className="md:text-4xl text-2xl font-medium tracking-tight flex">
            Selected Projects
          </h2>
        </div>
        <div className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-3">
          {projects.map((project) => {
            return (
              <div key={project.id} className="flex flex-col rounded-md border-1">
                <img src={project.image} alt={project.title} className="aspect-[3/2] rounded-t-md object-cover object-center shadow-xs" />
                <div className='p-4'>
                  <h3 className="text-lg/snug font-semibold tracking-tight hover:opacity-70">
                    <a href={project.slug}>{project.title}</a>
                  </h3>
                  <div className="mt-2 inline-flex items-center gap-4">
                    <Badge
                    style={{
                      backgroundColor: `${project.category.color}20`, 
                      border: `0.5px solid ${project.category.color}`,
                      color: `${project.category.color}`,
                      boxShadow: "none", 
                    }}
                  >
                    {project.category.name}
                  </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Blog section */}
      <div id="blog" className='px-4 sm:px-12 pt-32'>
        <section className="py-16 lg:py-32">
          <div className="mx-auto w-full max-w-2xl lg:max-w-7xl">
            <div className="mb-12">
              <h2 className="text-4xl/tight font-medium tracking-tight">Latest Posts</h2>
            </div>
            <ol style={{ listStyle: `none` }}>
              {posts.map(post => {
                const title = post.title || post.slug

                return (
                  <li key={post.slug}>
                    <article
                      className="post-list-item max-w-3xl"
                      itemScope
                      itemType="http://schema.org/Article"
                    >
                      <header>
                        <h3 className="text-gray-800 hover:text-gray-600 font-semibold md:text-xl text-lg">
                          <Link href={`/blog/${post.slug}`} itemProp="url">
                            <span itemProp="headline">{title}</span>
                          </Link>
                        </h3>
                        <small className="text-gray-400">{post.date}</small>
                      </header>
                      <section className="text-gray-500 text-sm pb-8">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: post.excerpt,
                          }}
                          itemProp="description"
                        />
                      </section>
                    </article>
                  </li>
                )
              })}
            </ol>
            <div className="mt-8 grid gap-12 lg:mt-12 lg:grid-cols-3">
              {posts.map((post) => {
                return (
                  <div key={post.id} className="flex flex-col">
                    <img src={post.image} alt={post.title} className="aspect-[16/9] rounded-2xl object-cover object-center shadow-xs" />
                    <div className="mt-6 inline-flex items-center gap-4">
                      <p className="text-muted-foreground text-xs font-medium">{post.category}</p>
                    </div>
                    <h3 className="mt-3 text-lg/snug font-semibold tracking-tight hover:opacity-85">
                      <a href={post.href}>{post.title}</a>
                    </h3>
                    <p className="text-muted-foreground mt-3 flex-1 text-sm/6">{post.excerpt}</p>
                    <div className="[&>div>p:nth-child(2)]:text-muted-foreground mt-6 inline-flex w-auto gap-4 text-left [&>div]:text-sm/5.5 [&>div>p:first-child]:font-medium [&>img]:size-10 [&>img]:rounded-full [&>img]:object-cover">
                      <img src={post.authorAvatar} alt={post.authorName} />
                      <div>
                        <p>{post.authorName}</p>
                        <p>{post.date}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
