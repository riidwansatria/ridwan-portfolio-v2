import Link from 'next/link'
import Image from 'next/image'
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
      id: 2,
      slug: "b",
      image: 'https://k8boaqmtfy4jtiib.public.blob.vercel-storage.com/stock/blogs-1-2.webp',
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
      image: 'https://k8boaqmtfy4jtiib.public.blob.vercel-storage.com/stock/blogs-1-3.webp',
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
      <div className='h-[calc(100vh-52px)] bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]'>
        <div className="flex flex-col justify-between h-[calc(100vh-80px)] px-4 sm:px-12 inset-0">
          {/* Hero main */}
          <div className="flex flex-1 items-center">
            <div className="max-w-5xl text-left">
              <h1 className="text-3xl md:text-4xl lg:text-6xl text-gray-800 font-semibold tracking-tight mb-4">
                <span className="text-2xl md:text-3xl lg:text-5xl">Hey there! 👋{" "}</span>
                <br />
                I&apos;m Ridwan, a Civil Engineering student at the University of Tokyo.
              </h1>
              <p className="hidden md:inline text-base lg:text-xl text-gray-600">
                Welcome to my personal website. This site will be used as a
                platform to share my <br /> thoughts and showcase the projects that I&apos;m
                currently doing/I&apos;ve done in the past.
              </p>
              <p className="text-sm md:text-base text-gray-600 pt-2">
                🚧 This website is still heavily under construction.
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

          {/* Hero tags */}
          <div className="hidden md:inline pb-3 justify-between items-center">
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

          {/* Hero footer */}
          <div className="pt-2 pb-3 border-t flex justify-between items-center font-mono">
            <span className="flex text-xs md:text-sm text-gray-500">
              Based in Tokyo, Japan
            </span>
            <div className="flex">
              <Button asChild variant="link" className="text-xs md:text-sm text-gray-500 p-0">
                <Link href="#projects">Selected Projects ↓</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Projects section */}
      <div id="projects" className='px-4 sm:px-12 py-20 border-t'>
        <div className="mb-8 border-b-0 flex justify-between items-center">
          <h2 className="md:text-4xl text-2xl font-medium tracking-tight flex">
            Selected Projects
          </h2>
        </div>
        <div className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-3">
          {projects.map((project) => {
            return (
              <div key={project.id} className="flex flex-col rounded-md border-1">
                <Image src={project.image} alt={project.title} className="aspect-[3/2] rounded-t-md object-cover object-center shadow-xs" />
                <div className='p-4'>
                  <h3 className="text-lg/snug font-semibold hover:opacity-70">
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
      <div id="blog" className='px-4 sm:px-12 py-20 mb-40 border-t'>
        <section className="">
          <div className="">
            <div className="mb-2 sm:mb-4 md:mb-12 flex justify-between items-center">
              <h2 className="md:text-4xl text-2xl font-medium tracking-tight flex">
                Latest Posts
              </h2>
              <div className="flex">
                <Link href="/blog" className=" text-xs md:text-base text-gray-600 p-4">
                  Read all posts →
                </Link>
              </div>
            </div>
            <ol style={{ listStyle: `none` }}>
              {posts.map(post => {
                const title = post.title || post.slug

                return (
                  <li key={post.slug}>
                    <article
                      className="post-list-item"
                      itemScope
                      itemType="http://schema.org/Article"
                    >
                      <div className='py-2 sm:py-4 md:py-6 border-t'>
                        <h3 className="text-gray-800 hover:text-gray-600 font-semibold text-base md:text-xl">
                          <Link href={`/blog/${post.slug}`} itemProp="url">
                            <span itemProp="headline">{title}</span>
                          </Link>
                        </h3>
                        <small className="text-gray-400">{post.date}</small>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ol>
          </div>
        </section>
      </div>
    </>
  )
}
