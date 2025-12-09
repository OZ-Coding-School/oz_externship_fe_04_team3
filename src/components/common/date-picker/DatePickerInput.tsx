import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Calendar } from 'lucide-react'
import { useRef, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import './date-picker.css'
import { useOutsideClick } from '@/hooks/common/useOutsideClick'
import { CustomChevron } from './CustomChevron'
import { Input } from '@/components/input'

interface DatePickerInputProps {
  label?: string
  error?: string | boolean
  required?: boolean
  placeholder?: string
  name?: string
  value?: Date
  onChange?: (date: Date | undefined) => void
}

export function DatePickerInput({
  label,
  required,
  placeholder = '-/-/-',
  value,
  onChange,
}: DatePickerInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }

  const handleSelect = (date: Date | undefined) => {
    onChange?.(date)
    setIsOpen(false)
  }

  useOutsideClick(containerRef, () => setIsOpen(false), isOpen)

  const displayValue = value ? format(value, 'yyyy.MM.dd') : ''

  return (
    <div ref={containerRef} className="relative">
      <Input
        label={label}
        required={required}
        placeholder={placeholder}
        value={displayValue}
        onClick={handleToggle}
        className="cursor-pointer"
        suffix={<Calendar className="h-4 w-4 text-black" />}
        readOnly
      />

      {isOpen && (
        <div className="border-custom-gray-200 datepicker-input absolute top-full left-0 z-50 mt-1 h-auto w-[280px] rounded-lg border bg-white shadow-lg">
          <DayPicker
            mode="single"
            locale={ko}
            navLayout="around"
            selected={value}
            onSelect={handleSelect}
            disabled={{ before: new Date() }}
            showOutsideDays
            components={{
              Chevron: CustomChevron,
            }}
            classNames={{
              chevron: 'text-custom-gray-600',
            }}
          />
        </div>
      )}
    </div>
  )
}
