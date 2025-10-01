import { sanityFetch } from '@/sanity/lib/live'
import Link from 'next/link'
import Image from 'next/image'
import ProjectListClient from './components/ProjectListClient'
import { Button } from '@/components/ui/button'
import { HardHat, Bus, Building2 } from 'lucide-react'

// Server-side projects data
const projects = [
  {
    id: 1,
    slug: 'a',
    image: 'https://images.pexels.com/photos/2126395/pexels-photo-2126395.jpeg',
    title: "Visualizing Jakarta's Demography",
    category: { name: 'Geopandas', color: '#22c55e' },
  },
  {
    id: 2,
    slug: 'b',
    image: 'https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg',
    title: 'Transit Network Analysis',
    category: { name: 'R', color: '#4295ee' },
  },
  {
    id: 3,
    slug: 'c',
    image: 'https://images.pexels.com/photos/6091193/pexels-photo-6091193.jpeg',
    title: 'Optimizing Bus Operations',
    category: { name: 'Streamlit', color: '#e79e2a' },
  },
]

export default async function Page() {
  // Fetch Sanity settings/data on server
  const { data: settings } = await sanityFetch({
    query: '*[_type == "settings"][0]',
  })

  return (
    <div>
      {/* Hero */}
      <div className="h-[calc(100vh-52px)] bg-white px-4 sm:px-12 flex flex-col justify-between">
        <div className="flex-1 flex items-center">
          <div className="max-w-5xl text-left">
            <h1 className="md:text-6xl text-3xl font-semibold text-gray-800 mb-4">
              <span className="text-2xl md:text-5xl">Hey there! 👋{" "}</span>
              <br />
              I&apos;m Ridwan, a Civil Engineering student at the University of Tokyo.
            </h1>
            <p className="text-xl text-gray-600">
              Welcome to my personal website. This site will be used as a
              platform to share my <br /> thoughts and showcase the projects that I&apos;m
              currently doing/ I&apos;ve done in the past.
            </p>
            <p className="text-md text-gray-600 pt-2">🚧 This website is still heavily under construction.</p>
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

        {/* Skills */}
        <div className="pb-3 flex flex-wrap gap-2">
          <Button variant="outline" className="rounded-full shadow-none hover:bg-red-50 text-gray-800"><HardHat /> Civil Engineering</Button>
          <Button variant="outline" className="rounded-full shadow-none hover:bg-green-50 text-gray-800"><Building2 /> Urban Planning</Button>
          <Button variant="outline" className="rounded-full shadow-none hover:bg-blue-50 text-gray-800"><Bus /> Transportation Planning</Button>
        </div>
      </div>

      {/* Projects (Client Component) */}
      <ProjectListClient projects={projects} />
    </div>
  )
}
