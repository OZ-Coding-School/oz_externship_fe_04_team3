import { useMarkdownEditor } from '@/hooks/useMarkDownEditor'
import { showToast } from '@/components/common/toast/Toast'
import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'
import { EditorHeader } from './EditorHeader'
import { EditorTextarea } from './EditorTextarea'
import { Preview } from './Preview'
import { MarkdownExample } from './MarkdownExample'

interface MarkdownEditorProps {
  value: string
  onChange: Dispatch<SetStateAction<string>>
  onImageCountChange?: (count: number) => void
  allowImageDrop?: boolean
}

export function MarkdownEditor({
  value,
  onChange: setValue,
  onImageCountChange,
  allowImageDrop = false,
}: MarkdownEditorProps) {
  const { textareaRef, insertMarkdown } = useMarkdownEditor({ value, setValue })
  const [mode, setMode] = useState<'write' | 'preview'>('write')
  const [imageCount, setImageCount] = useState(0)

  // 마크다운 내 이미지 개수를 계산해 표기/연동
  useEffect(() => {
    const matches = value.match(/!\[[^\]]*]\((.*?)\)/g) ?? []
    setImageCount(matches.length)
    onImageCountChange?.(matches.length)
  }, [value, onImageCountChange])

  // 드래그앤드롭으로 이미지 추가
  const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith('image/')
    )
    if (!files.length) return

    const MAX = 5
    const remaining = Math.max(0, MAX - imageCount)
    if (remaining <= 0) {
      showToast.warning(
        '이미지 제한',
        '이미지는 최대 5개까지 첨부할 수 있습니다.'
      )
      return
    }

    const toInsert = files.slice(0, remaining)
    const insertPosition = textareaRef.current?.selectionStart ?? value.length
    const blocks = toInsert
      .map((file) => {
        const url = URL.createObjectURL(file)
        return `![업로드된 이미지](${url})`
      })
      .join('\n')

    let nextCursor = insertPosition
    setValue((prev) => {
      const prefix = prev.slice(0, insertPosition)
      const suffix = prev.slice(insertPosition)
      const padBefore = prefix && !prefix.endsWith('\n') ? '\n\n' : ''
      const padAfter = suffix && !suffix.startsWith('\n') ? '\n' : ''
      const insertText = `${padBefore}${blocks}${padAfter}`
      nextCursor = insertPosition + insertText.length
      return prefix + insertText + suffix
    })

    // 커서를 삽입한 위치 뒤로 이동
    requestAnimationFrame(() => {
      if (!textareaRef.current) return
      textareaRef.current.focus()
      textareaRef.current.selectionStart = nextCursor
      textareaRef.current.selectionEnd = nextCursor
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
        <EditorTextarea
          ref={textareaRef}
          value={value}
          setValue={setValue}
          onDrop={allowImageDrop ? handleDrop : undefined}
          allowDrop={allowImageDrop}
        />
      ) : (
        <Preview value={value} />
      )}
      <MarkdownExample />
    </div>
  )
}
