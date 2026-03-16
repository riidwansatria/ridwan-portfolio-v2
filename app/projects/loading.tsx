import { Skeleton } from '@/components/ui/skeleton'

function FeaturedProjectSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border bg-card">
      <Skeleton className="w-full aspect-[16/10]" />
      <div className="flex flex-1 flex-col p-4">
        <Skeleton className="h-[1.125rem] w-3/4 mb-1.5" />
        <Skeleton className="h-3 w-full mb-1" />
        <Skeleton className="h-3 w-2/3 mb-4" />
        <div className="flex items-center gap-2 mt-auto">
          <Skeleton className="h-3 w-16 shrink-0" />
          <Skeleton className="h-3 w-1 rounded-full" />
          <Skeleton className="h-[1.125rem] w-14 rounded-full" />
          <Skeleton className="h-[1.125rem] w-20 rounded-full" />
        </div>
      </div>
    </div>
  )
}

function ListProjectSkeleton() {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 p-2 rounded-2xl border bg-card">
      <Skeleton className="hidden md:block w-54 aspect-[3/2] rounded-lg shrink-0" />
      <div className="flex-1 min-w-0">
        <Skeleton className="h-[1.125rem] w-3/4 mb-1.5" />
        <Skeleton className="hidden md:block h-3 w-full mb-1" />
        <Skeleton className="hidden md:block h-3 w-1/2 mb-3" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-3 w-14 shrink-0" />
          <Skeleton className="h-[1.125rem] w-14 rounded-full" />
          <Skeleton className="h-[1.125rem] w-20 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default function ProjectsLoading() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-20 pb-16">
      <div className="mb-20">
        <Skeleton className="h-9 w-36" />
        <Skeleton className="h-5 w-3/4 mt-4" />
      </div>
      <section className="mb-20">
        <Skeleton className="h-3 w-16 mb-6" />
        <div className="grid gap-4 sm:grid-cols-2">
          <FeaturedProjectSkeleton />
          <FeaturedProjectSkeleton />
        </div>
      </section>
      <section>
        <Skeleton className="h-3 w-12 mb-6" />
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <ListProjectSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  )
}
