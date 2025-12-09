import React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export type DropdownOption = {
  value: string
  label?: string
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

interface DropdownProps {
  options: DropdownOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = '옵션을 선택하세요',
  className,
  disabled,
}: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue)
    }
    setIsOpen(false)
  }

  return (
    <div className={cn('relative w-full', className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'border-custom-gray-200 remove-focus-outline flex h-11 w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm transition-all',
          disabled
            ? 'bg-custom-gray-50 text-custom-gray-400 cursor-not-allowed'
            : 'hover:bg-custom-gray-50',
          className
        )}
      >
        <span
          className={cn(
            'flex items-center gap-2',
            !selectedOption && 'text-custom-gray-400'
          )}
        >
          {selectedOption?.Icon && <selectedOption.Icon />}
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            'text-custom-gray-400 h-4 w-4 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <ul className="ring-opacity-5 animate-in fade-in-0 zoom-in-95 border-custom-gray-100 remove-focus-outline absolute z-50 max-h-60 w-full overflow-auto rounded-lg border bg-white py-1 shadow-lg duration-100">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={cn(
                'text-custom-gray-700 hover:bg-custom-gray-100 relative flex cursor-pointer items-center gap-2 px-3 py-2.5 text-sm transition-colors select-none',
                option.value === value &&
                  'bg-primary-50 text-primary-700 font-medium'
              )}
            >
              {option.Icon && (
                <span className="text-custom-gray-400">
                  <option.Icon />
                </span>
              )}
              <span>{option.label}</span>
            </li>
          ))}
          {options.length === 0 && (
            <div className="text-custom-gray-400 px-3 py-2 text-sm">
              옵션이 없습니다.
            </div>
          )}
        </ul>
      )}
    </div>
  )
}
