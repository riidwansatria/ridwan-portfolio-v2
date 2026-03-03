'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

// Define the shape of a single project
type Project = {
  id: number
  slug: string
  image: string
  title: string
  category: {
    name: string
    color: string
  }
}

// Define props for the component
type ProjectListClientProps = {
  projects: Project[]
}

export default function ProjectListClient({ projects }: ProjectListClientProps) {
  return (
    <div id="projects" className="px-4 sm:px-12 py-20 border-t">
      <h2 className="text-4xl font-medium mb-8">Selected Projects</h2>
      <div className="grid lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="flex flex-col rounded-md border">
            <Image
              src={project.image}
              alt={project.title}
              width={400}
              height={300}
              className="aspect-[3/2] rounded-t-md object-cover object-center shadow-xs"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold hover:opacity-70">
                <Link href={`/projects/${project.slug}`}>
                  {project.title}
                </Link>
              </h3>
              <Badge
                style={{
                  backgroundColor: `${project.category.color}20`,
                  border: `0.5px solid ${project.category.color}`,
                  color: `${project.category.color}`,
                  boxShadow: 'none',
                }}
              >
                {project.category.name}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
