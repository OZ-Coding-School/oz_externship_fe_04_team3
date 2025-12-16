import { Button } from '@/components/common'
import { TOOLBAR_BUTTONS } from '@/constant/toolbar'
import { ToolbarDropdownHeading, ToolbarDropdownList } from './ToolbarDropdown'

interface ToolbarProps {
  insertMarkdown: (before: string, after?: string) => void
}

export function Toolbar({ insertMarkdown }: ToolbarProps) {
  return (
    <menu className="flex items-center gap-4">
      {TOOLBAR_BUTTONS.map(({ key, before, after, Icon }) => (
        <Button
          key={key}
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => insertMarkdown(before, after)}
        >
          <Icon size={18} />
        </Button>
      ))}
      <ToolbarDropdownHeading insertMarkdown={insertMarkdown} />
      <ToolbarDropdownList insertMarkdown={insertMarkdown} />
    </menu>
  )
}
