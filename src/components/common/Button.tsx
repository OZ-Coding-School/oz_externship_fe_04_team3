import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-danger-200 aria-invalid:border-danger",
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground hover:bg-primary-700 active:bg-primary-900',
        danger:
          'bg-danger-500 text-white hover:bg-danger-600 active:bg-danger-800 dark:focus-visible:ring-danger-400',
        success:
          'bg-success-500 text-white hover:bg-success-600 active:bg-success-800 dark:focus-visible:ring-success-400',
        outline:
          'border bg-white/80 shadow-xs hover:bg-gray-50 text-accent-foreground active:bg-gray-100',
        'outline-primary':
          'border border-primary-500 bg-inherit shadow-xs text-primary-600 hover:bg-primary-50 active:bg-primary-100',

        secondary:
          'bg-secondary text-secondary-foreground hover:bg-gray-200 active:bg-gray-300 active:text-white',
        ghost: 'hover:bg-accent text-accent-foreground active:bg-gray-200',
      },
      size: {
        default: ' h-9 px-4 py-[10px] has-[>svg]:px-3 ',
        sm: 'h-8 py-[8px] rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-[24px] has-[>svg]:px-4 py-[12px] text-md',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ size, className, variant }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
