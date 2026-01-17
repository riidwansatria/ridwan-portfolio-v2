import { notFound } from "next/navigation"
import { SplitLayout, type ProjectData } from "@/components/project-layouts/layout-split"
import { EditorialLayout } from "@/components/project-layouts/layout-editorial"
import { ConciseLayout } from "@/components/project-layouts/layout-concise"
import { MapLayout } from "@/components/project-layouts/layout-map"

interface Project extends ProjectData {
    template: 'split' | 'editorial' | 'map' | 'concise'
}

const projects: Project[] = [
  {
    id: "1",
    slug: "jakarta-demography",
    template: "concise",
    title: "Visualizing Jakarta's Demography",
    subtitle: "Uncovering socio-economic patterns in Indonesia's capital.",
    description: "Using GeoPandas and census data to map demographic shifts across Jakarta's 44 districts. Interactive choropleths reveal 'hollowing out' trends in central areas versus peripheral growth, helping planners identify priority zones for infrastructure investment.",
    image: "https://images.pexels.com/photos/2126395/pexels-photo-2126395.jpeg",
    year: "2024",
    role: "Lead Researcher",
    techStack: [
      { name: "GeoPandas", color: "#22c55e" },
      { name: "Python", color: "#3b82f6" },
      { name: "QGIS", color: "#8b5cf6" },
    ],
    links: {
      demo: "#",
      github: "[https://github.com/riidwansatria](https://github.com/riidwansatria)",
    },
    nextProject: {
      slug: "transit-network-analysis",
      title: "Transit Network Analysis"
    },
    content: (
      <>
        {/* ... existing rich content ... */}
      </>
    )
  },
  {
    id: "2",
    slug: "transit-network-analysis",
    template: "concise",
    title: "Transit Network Analysis",
    subtitle: "Evaluating urban accessibility in public transportation.",
    description: "Analyzing bus network accessibility using GTFS data to compute travel-time isochrones and network centrality. Despite high stop density, poor transfer integration creates significant time penalties for peripheral communities, indicating need for route restructuring.",
    image: "https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg",
    year: "2024",
    role: "Data Analyst",
    techStack: [
      { name: "R", color: "#4295ee" },
      { name: "GTFS", color: "#f97316" },
      { name: "NetworkX", color: "#ec4899" },
    ],
    links: {
      demo: "#",
      github: "#",
    },
    nextProject: {
      slug: "bus-operations-optimization",
      title: "Optimizing Bus Operations"
    },
    content: (
      <>
        {/* ... existing rich content ... */}
      </>
    )
  },
  {
    id: "3",
    slug: "bus-operations-optimization",
    template: "concise",
    title: "Optimizing Bus Operations",
    subtitle: "Route adherence analytics for Maputo's transit fleet.",
    description: "A reporting tool processing millions of GPS probe points from Maputo's municipal fleet to monitor schedule adherence. Detects bunching, identifies bottlenecks, and generates automated reports enabling dynamic vehicle reassignment for consistent headways.",
    image: "https://images.pexels.com/photos/6091193/pexels-photo-6091193.jpeg",
    year: "2024",
    role: "Data Engineer",
    techStack: [
      { name: "Streamlit", color: "#e79e2a" },
      { name: "GPS Analytics", color: "#14b8a6" },
      { name: "Python", color: "#3b82f6" },
    ],
    links: {
      demo: "#",
      github: "#"
    },
    nextProject: {
      slug: "jakarta-flood-warning",
      title: "TOD Gentrification Analysis"
    },
    content: (
      <>
        {/* ... */}
      </>
    )
  },
  {
    id: "4",
    slug: "jakarta-flood-warning",
    template: "concise",
    title: "TOD-Induced Gentrification Analysis",
    subtitle: "Identifying displacement risks in new transit corridors.",
    description: "Creating a Gentrification Vulnerability Index for Jakarta's MRT corridor using housing prices and socio-economic variables. Maps high-risk neighborhoods and proposes value capture and inclusionary zoning policies to ensure equitable distribution of mobility benefits.",
    image: "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg",
    year: "2024",
    role: "Urban Researcher",
    techStack: [
      { name: "Urban Policy", color: "#6366f1" },
      { name: "GIS", color: "#8b5cf6" },
      { name: "PCA", color: "#0ea5e9" },
    ],
    links: {
      demo: "#",
      github: "#"
    },
    nextProject: {
      slug: "land-use-visualization",
      title: "Aerial Imagery Tool"
    },
    content: (
      <>
        {/* ... */}
      </>
    )
  },
  {
    id: "5",
    slug: "land-use-visualization",
    template: "map",
    title: "Aerial Imagery & Land Use Tool",
    subtitle: "Interactive zoning and master planning visualization.",
    description: "A web-based tool combining historical aerial imagery with vector land-use overlays for master planning. Enables toggling temporal datasets, measuring parcel consolidation, and sketching zoning proposals directly on the map.",
    image: "https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg",
    year: "2023",
    role: "Frontend Developer",
    techStack: [
      { name: "JavaScript", color: "#eab308" },
      { name: "Web Mapping", color: "#22c55e" },
      { name: "Leaflet", color: "#0ea5e9" },
    ],
    links: {
      demo: "#"
    },
    nextProject: {
      slug: "nmt-mobility-strategies",
      title: "NMT Strategies"
    },
    content: (
      <>
        {/* ... */}
      </>
    )
  },
  {
    id: "6",
    slug: "nmt-mobility-strategies",
    template: "concise",
    title: "Non-Motorized Transport Strategies",
    subtitle: "Reclaiming streets for walking and cycling.",
    description: "Formulating a Non-Motorized Transport strategy for Jakarta's '15-minute city' vision. Proposes connected protected bike lanes, widened sidewalks, and micro-mobility hubs based on international best practices to shift modal share from private vehicles.",
    image: "https://images.pexels.com/photos/3971983/pexels-photo-3971983.jpeg",
    year: "2023",
    role: "Transport Planner",
    techStack: [
      { name: "Policy Research", color: "#a855f7" },
      { name: "Mobility", color: "#f43f5e" },
    ],
    links: {
      demo: "#"
    },
    nextProject: {
      slug: "jakarta-demography",
      title: "Jakarta Demography"
    },
    content: (
      <>
        {/* ... */}
      </>
    )
  },
  {
    id: "7",
    slug: "satellite-pollution-monitor",
    template: "map",
    title: "Satellite Pollution Monitor",
    subtitle: "Near real-time air quality monitoring.",
    description: "A WebGIS dashboard monitoring NO2 levels across Southeast Asia using Sentinel-5P satellite data. Features time-series analysis and comparative tools to visualize policy impacts on air quality.",
    image: "https://images.pexels.com/photos/41953/earth-blue-planet-globe-planet-41953.jpeg",
    year: "2024",
    role: "Full Stack Engineer",
    techStack: [
      { name: "MapLibre", color: "#60a5fa" },
      { name: "React", color: "#38bdf8" },
      { name: "Sentinel-Hub", color: "#84cc16" },
    ],
    links: {
      demo: "#",
    },
    nextProject: {
      slug: "jakarta-demography",
      title: "Jakarta Demography"
    },
    content: (
      <>
        <p className="mb-4">
          This dashboard processes Sentinel-5P TROPOMI data to visualize Nitrogen Dioxide (NO2) concentrations across Southeast Asia.
        </p>
      </>
    )
  }
]

const getProject = (slug: string): Project | undefined => {
    return projects.find((p) => p.slug === slug)
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project = getProject(slug)

    if (!project) {
        notFound()
    }

    switch (project.template) {
        case 'editorial':
            return <EditorialLayout project={project} />
        case 'concise':
            return <ConciseLayout project={project} />
        case 'map':
            return <MapLayout project={project} />
        default:
            return <SplitLayout project={project} />
    }
}