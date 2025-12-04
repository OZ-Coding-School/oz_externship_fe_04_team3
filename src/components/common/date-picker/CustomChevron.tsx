import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface CustomChevronProps {
  orientation?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

export function CustomChevron({
  orientation,
  className,
  ...rest
}: CustomChevronProps) {
  if (orientation === 'left') {
    return (
      <ChevronLeft
        {...rest}
        className={cn('hover:text-primary-600 h-5 w-5', className)}
      />
    )
  }
  return (
    <ChevronRight
      {...rest}
      className={cn('hover:text-primary-600 h-5 w-5', className)}
    />
  )
}
