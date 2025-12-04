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

export const TOOLBAR_BUTTONS = [
  { key: 'bold', before: '**', after: '**', Icon: BoldIcon },
  { key: 'italic', before: '*', after: '*', Icon: ItalicIcon },
  { key: 'code', before: '`', after: '`', Icon: CodeIcon },
  { key: 'link', before: '[', after: '](https://)', Icon: LinkIcon },
]

export const headingOptions: DropdownOption[] = [
  { value: 'h1', Icon: Heading1Icon },
  { value: 'h2', Icon: Heading2Icon },
  { value: 'h3', Icon: Heading3Icon },
]

export const ListOptions: DropdownOption[] = [
  { value: 'unordered list', Icon: ListIcon },
  { value: 'ordered list', Icon: ListOrderedIcon },
]
