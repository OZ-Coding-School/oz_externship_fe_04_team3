import { Star } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'
import { Button } from './Button'

export default function LectureCardSkeleton() {
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
      <div className="absolute -top-4 -right-4 flex flex-col gap-8">
        <Button className="rounded-full" size={'icon'}>
          <Star />
        </Button>
      </div>
    </div>
  )
}
