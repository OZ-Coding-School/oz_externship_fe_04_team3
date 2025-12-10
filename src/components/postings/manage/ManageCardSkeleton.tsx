import { Skeleton } from '@/components/ui/skeleton'

type ManageCardSkeletonProps = {
  count?: number
}

export default function ManageCardSkeleton({
  count = 3,
}: ManageCardSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="relative grid gap-4 rounded-lg border border-gray-200 bg-white p-4 md:grid-cols-[160px_1fr]"
        >
          <div className="md:row-span-2">
            <Skeleton className="mx-auto h-24 w-40 rounded-md" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <Skeleton className="h-6 w-3/4" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-4" />
              </div>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-44" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
          <div className="md:absolute md:right-4 md:bottom-4 md:self-end">
            <Skeleton className="h-12 w-full rounded-md md:w-[150px]" />
          </div>
        </div>
      ))}
    </div>
  )
}
