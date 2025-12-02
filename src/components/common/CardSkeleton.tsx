import { Star } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'

export default function CardSkeleton() {
  return (
    <div className="relative flex w-full max-w-sm flex-col gap-3 rounded-lg border border-gray-200 p-4">
      <div className="flex space-x-4">
        <Skeleton className="h-8 w-12" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-3 w-[200px]" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-[250px]" />
        <Skeleton className="h-3 w-[200px]" />
      </div>
      <div className="space-y-2. flex gap-2">
        <Skeleton className="bg-primary-100 h-5 w-12" />
        <Skeleton className="bg-primary-100 h-5 w-16" />
      </div>
      <div className="absolute -top-2 -right-2 flex flex-col gap-8">
        <div className="bg-primary-400 h-full w-full rounded-full border-none">
          <Star className="m-1" fill="white" strokeWidth={0} size={12} />
        </div>
      </div>
    </div>
  )
}
