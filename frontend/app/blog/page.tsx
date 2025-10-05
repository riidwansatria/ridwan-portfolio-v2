import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const blogPosts = [
    {
      id: "1",
      date: "MAR 15 2024",
      title: "Building accessible interfaces with semantic HTML",
      category: "Development",
      slug: "building-accessible-interfaces",
    },
    {
      id: "2",
      date: "FEB 28 2024",
      title: "The art of minimalist design in modern web applications",
      category: "Design",
      slug: "minimalist-design-modern-web",
    },
    {
      id: "3",
      date: "FEB 12 2024",
      title: "Performance optimization techniques for Next.js applications",
      category: "Development",
      slug: "performance-optimization-nextjs",
    },
    {
      id: "4",
      date: "JAN 30 2024",
      title: "Typography matters: choosing the right fonts for your project",
      category: "Design",
      slug: "typography-matters",
    },
    {
      id: "5",
      date: "JAN 18 2024",
      title: "State management patterns in React applications",
      category: "Development",
      slug: "state-management-react",
    },
    {
      id: "6",
      date: "DEC 22 2023",
      title: "Creating delightful micro-interactions",
      category: "Design",
      slug: "delightful-micro-interactions",
    },
  ]

  return (
    <main className="bg-background max-w-[100rem] mx-auto px-4 sm:px-12 py-12 sm:py-20">
      {/* Page Title */}
        <div className="mb-16 md:mb-24">
          <h1 className="text-4xl font-medium tracking-tight text-foreground md:text-5xl">Thoughts</h1>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Writing about design, development, and everything in between.
          </p>
        </div>

        {/* Blog Posts List */}
        <div className="mb-24">
          {blogPosts.map((post, index) => (
            <article key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block border-t border-border px-2 py-8 transition-colors hover:bg-accent/30 md:py-10"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-12">
                  {/* Date */}
                  <time className="shrink-0 text-xs font-medium uppercase tracking-widest text-muted-foreground md:w-32 md:text-sm">
                    {post.date}
                  </time>

                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="mb-3 text-xl font-medium leading-relaxed text-foreground transition-colors group-hover:text-foreground/80 md:text-2xl md:leading-relaxed">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground md:text-base">{post.category}</p>
                  </div>

                  {/* Arrow Icon */}
                  <div className="hidden md:flex shrink-0 items-center justify-end md:w-12">
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 md:h-6 md:w-6" />
                  </div>
                </div>
              </Link>
              {index === blogPosts.length - 1 && <div className="border-t border-border" />}
            </article>
          ))}
        </div>
    </main>
  )
}