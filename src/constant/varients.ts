import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors remove-focus-outline disabled:pointer-events-none disabled:opacity-50 ring-offset-white cursor-pointer',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
        secondary:
          'bg-custom-gray-100 text-custom-gray-900 hover:bg-custom-gray-200 active:bg-custom-gray-400',
        outline:
          'border border-custom-gray-300 bg-white text-custom-gray-700 hover:bg-custom-gray-50 active:bg-custom-gray-100',
        ghost:
          'bg-transparent text-custom-gray-700 hover:bg-custom-gray-100 active:bg-custom-gray-200',
        danger:
          'bg-danger-500 text-white hover:bg-danger-600 active:bg-danger-700',
      },
      size: {
        default: 'h-10 px-4 py-2.5',
        sm: 'h-9 px-3 py-2',
        lg: 'h-12 px-8 py-3 text-base',
        icon: 'h-5 w-5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

export const cardVariants = cva(
  'rounded-lg bg-white text-custom-gray-900 w-full p-6',
  {
    variants: {
      variant: {
        default: 'border border-custom-gray-200',
        outlined: 'border-2 border-custom-gray-300',
        elevated: 'shadow-lg border-none',
        flat: 'border-none shadow-none bg-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full font-medium remove-focus-outline',
  {
    variants: {
      variant: {
        default: 'bg-custom-gray-100 text-custom-gray-800',
        primary: 'bg-primary-100 text-primary-800',
        success: 'bg-success-100 text-success-800',
        danger: 'bg-danger-100 text-danger-800',
      },
      size: {
        sm: 'text-[10px] px-2 py-0.5 h-5',
        md: 'text-xs px-2.5 py-1 h-7',
        lg: 'text-sm px-3 py-1.5 h-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export const checkboxVariants = cva(
  'peer h-5 w-5 cursor-pointer appearance-none border bg-white transition-all remove-focus-outline disabled:cursor-not-allowed disabled:opacity-50 border-custom-gray-300 hover:border-primary-400 checked:border-primary-500 checked:bg-primary-500',
  {
    variants: {
      shape: {
        square: 'rounded-sm',
        round: 'rounded-full',
      },
    },
    defaultVariants: {
      shape: 'square',
    },
  }
)

export const editorTabVariants = cva(
  'cursor-pointer px-2 py-1 text-sm font-medium transition-colors',
  {
    variants: {
      active: {
        true: 'text-custom-gray-900 border-b-2 border-custom-gray-900',
        false: 'text-custom-gray-600 hover:text-custom-gray-800',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
)

export const dropdownButtonVariants = cva(
  'border-custom-gray-200 remove-focus-outline flex h-11 w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm transition-all',
  {
    variants: {
      disabled: {
        true: 'bg-custom-gray-50 text-custom-gray-400 cursor-not-allowed',
        false: 'hover:bg-custom-gray-50',
      },
      open: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      disabled: false,
      open: false,
    },
  }
)

export const dropdownItemVariants = cva(
  'text-custom-gray-700 hover:bg-custom-gray-100 relative flex cursor-pointer items-center gap-2 px-3 py-2.5 text-sm transition-colors select-none',
  {
    variants: {
      selected: {
        true: 'bg-primary-50 text-primary-700 font-medium',
        false: '',
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
)
