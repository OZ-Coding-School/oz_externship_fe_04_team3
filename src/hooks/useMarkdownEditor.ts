import { useCallback, useRef } from 'react'

interface UseMarkdownEditorProps {
  value: string
  setValue: (v: string) => void
}

export function useMarkdownEditor({ value, setValue }: UseMarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const insertMarkdown = useCallback(
    (before: string, after: string = '') => {
      const textarea = textareaRef.current
      if (!textarea) return

      const start = textarea.selectionStart
      const end = textarea.selectionEnd

      const selected = value.slice(start, end)
      const replaced = before + (selected || '') + after

      setValue(value.slice(0, start) + replaced + value.slice(end))

      requestAnimationFrame(() => {
        if (!textareaRef.current) return
        const next = start + replaced.length
        textareaRef.current.focus()
        textareaRef.current.selectionStart = next
        textareaRef.current.selectionEnd = next
      })
    },
    [value, setValue]
  )

  return {
    textareaRef,
    insertMarkdown,
  }
}
