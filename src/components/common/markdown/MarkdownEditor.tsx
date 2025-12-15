import { useMarkdownEditor } from '@/hooks/useMarkDownEditor'
import { useState } from 'react'
import { EditorHeader } from './EditorHeader'
import { EditorTextarea } from './EditorTextarea'
import { Preview } from './Preview'
import { MarkdownExample } from './MarkdownExample'

interface MarkdownEditorProps {
  value: string
  onChange: (v: string) => void
}

export function MarkdownEditor({
  value,
  onChange: setValue,
}: MarkdownEditorProps) {
  const { textareaRef, insertMarkdown } = useMarkdownEditor({ value, setValue })
  const [mode, setMode] = useState<'write' | 'preview'>('write')

  return (
    <div className="border-custom-gray-200 rounded-lg border">
      <EditorHeader
        mode={mode}
        setMode={setMode}
        insertMarkdown={insertMarkdown}
      />
      {mode === 'write' ? (
        <EditorTextarea ref={textareaRef} value={value} setValue={setValue} />
      ) : (
        <Preview value={value} />
      )}
      <MarkdownExample />
    </div>
  )
}
