import { EditorTab } from './EditorTab'
import { Toolbar } from './Toolbar'

interface EditorHeaderProps {
  mode: 'write' | 'preview'
  setMode: (mode: 'write' | 'preview') => void
  insertMarkdown: (before: string, after?: string) => void
}

export function EditorHeader({
  mode,
  setMode,
  insertMarkdown,
}: EditorHeaderProps) {
  return (
    <header className="bg-custom-gray-50 border-custom-gray-200 flex h-22 flex-col justify-evenly border-b px-4 sm:h-12 sm:flex-row sm:items-center sm:justify-between">
      <EditorTab mode={mode} setMode={setMode} />
      {mode === 'write' && <Toolbar insertMarkdown={insertMarkdown} />}
    </header>
  )
}
