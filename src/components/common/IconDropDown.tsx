import React from 'react'
import { cn } from '@/lib/utils'
import type { DropdownOption } from './DropDown'
import { dropdownItemVariants } from '@/constant/varients'

interface IconDropdownProps {
  options: DropdownOption[]
  onChange: (value: string) => void
  triggerIcon: React.ReactNode
  disabled?: boolean
  className?: string
}

export function IconDropdown({
  options,
  onChange,
  triggerIcon,
  disabled,
  className,
}: IconDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const toggle = () => {
    if (!disabled) setIsOpen((prev) => !prev)
  }

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className={cn('relative inline-block', className)}>
      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        className={cn(
          'remove-focus-outline hover:bg-custom-gray-100 centralize h-7 w-7 rounded transition',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        {triggerIcon}
      </button>

      {isOpen && (
        <ul className="border-custom-gray-200 absolute left-0 z-50 mt-1 max-h-60 min-w-10 overflow-auto rounded-md border bg-white py-1 shadow-lg">
          {options.map((option) => (
            <li
              key={option.value}
              className={dropdownItemVariants({
                selected: false,
              })}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
            >
              {option.Icon && (
                <span className="text-custom-gray-400">
                  <option.Icon />
                </span>
              )}
              {option.label && <span>{option.label}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
