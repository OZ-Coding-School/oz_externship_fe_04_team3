import type { DropdownOption } from '@/components/common/DropDown'
import {
  BoldIcon,
  ItalicIcon,
  CodeIcon,
  LinkIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListOrderedIcon,
  ListIcon,
} from 'lucide-react'

type ToolbarDropdownOption = DropdownOption & {
  before: string
}

export const TOOLBAR_BUTTONS = [
  { key: 'bold', before: '**', after: '**', Icon: BoldIcon },
  { key: 'italic', before: '*', after: '*', Icon: ItalicIcon },
  { key: 'code', before: '`', after: '`', Icon: CodeIcon },
  { key: 'link', before: '[', after: '](https://)', Icon: LinkIcon },
]

export const headingOptions: ToolbarDropdownOption[] = [
  { value: 'h1', Icon: Heading1Icon, before: '# ' },
  { value: 'h2', Icon: Heading2Icon, before: '## ' },
  { value: 'h3', Icon: Heading3Icon, before: '### ' },
]

export const listOptions: ToolbarDropdownOption[] = [
  { value: 'unordered list', Icon: ListIcon, before: '- ' },
  { value: 'ordered list', Icon: ListOrderedIcon, before: '1. ' },
]
