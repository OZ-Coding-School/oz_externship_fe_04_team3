import { useRef, useState } from 'react'
import { EditorHeader } from './EditorHeader'
import { EditorTextarea } from './EditorTextarea'
import { Preview } from './Preview'
import { MarkdownExample } from './MarkdownExample'

export function MarkdownEditor() {
  const [mode, setMode] = useState<'write' | 'preview'>('write')
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  function insertMarkdown(before: string, after: string = '') {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    const selected = value.slice(start, end)
    const replaced = before + (selected || '') + after

    setValue(value.slice(0, start) + replaced + value.slice(end))

    requestAnimationFrame(() => {
      textarea.focus()
      textarea.selectionStart = textarea.selectionEnd = start + replaced.length
    })
  }

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
