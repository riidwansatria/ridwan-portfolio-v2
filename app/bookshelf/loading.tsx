import { Skeleton } from '@/components/ui/skeleton'

function BookCardSkeleton() {
  return (
    <div className="flex flex-col w-full">
      <Skeleton className="w-full aspect-[2/3] rounded-md" />
      <div className="mt-2.5 px-0.5 space-y-1.5">
        <Skeleton className="h-3.5 w-4/5" />
        <Skeleton className="h-2.5 w-3/5" />
      </div>
    </div>
  )
}

export default function BookshelfLoading() {
  return (
    <div className="pb-20">
      <div className="border-t border-border space-y-6 pt-4 px-6">
        {/* Tab skeleton */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-7 rounded-full"
              style={{ width: i === 0 ? 56 : i === 3 ? 100 : 80 }}
            />
          ))}
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-x-5 gap-y-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <BookCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
