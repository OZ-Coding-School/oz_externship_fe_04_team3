import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './Select'

// 단순 옵션 타입
type SimpleOption = {
  value: string
  label: string
  disabled?: boolean
}

// 그룹화된 옵션 타입
type GroupedOption = {
  label: string
  items: SimpleOption[]
}

type SelectFieldProps = {
  label?: string
  placeholder?: string
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  disabled?: boolean
  size?: 'sm' | 'default'
  className?: string
} & (
  | {
      options: SimpleOption[]
      groups?: never
    }
  | {
      options?: never
      groups: GroupedOption[]
    }
)

export function SelectField({
  label,
  placeholder = '선택하세요',
  value,
  onValueChange,
  defaultValue,
  disabled,
  size = 'default',
  className,
  options,
  groups,
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <Select
        value={value}
        onValueChange={onValueChange}
        defaultValue={defaultValue}
        disabled={disabled}
      >
        <SelectTrigger size={size} className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {/* 단순 옵션인 경우 */}
          {options &&
            options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </SelectItem>
            ))}

          {/* 그룹화된 옵션인 경우 */}
          {groups &&
            groups.map((group, index) => (
              <SelectGroup key={index}>
                <SelectLabel>{group.label}</SelectLabel>
                {group.items.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
        </SelectContent>
      </Select>
    </div>
  )
}
