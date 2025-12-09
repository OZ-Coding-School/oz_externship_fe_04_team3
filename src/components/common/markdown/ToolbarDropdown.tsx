import { Heading1Icon, ListIcon } from 'lucide-react'
import { IconDropdown } from '../IconDropDown'
import { headingOptions, ListOptions } from '@/constant/toolbar'

interface ToolbarDropdownProps {
  insertMarkdown: (before: string, after?: string) => void
}

export function ToolbarDropdownHeading({
  insertMarkdown,
}: ToolbarDropdownProps) {
  return (
    <IconDropdown
      options={headingOptions}
      triggerIcon={<Heading1Icon />}
      onChange={(value) => {
        switch (value) {
          case 'h1':
            insertMarkdown('# ')
            break
          case 'h2':
            insertMarkdown('## ')
            break
          case 'h3':
            insertMarkdown('### ')
            break
        }
      }}
    />
  )
}

export function ToolbarDropdownList({ insertMarkdown }: ToolbarDropdownProps) {
  return (
    <IconDropdown
      options={ListOptions}
      triggerIcon={<ListIcon />}
      onChange={(value) => {
        switch (value) {
          case 'unordered list':
            insertMarkdown('- ')
            break
          case 'ordered list':
            insertMarkdown('1. ')
            break
        }
      }}
    />
  )
}
