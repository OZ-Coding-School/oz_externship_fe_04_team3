import { editorTabVariants } from '@/constant/varients'

interface EditorTabProps {
  mode: string
  setMode: (mode: 'write' | 'preview') => void
}

export function EditorTab({ mode, setMode }: EditorTabProps) {
  return (
    <div className="flex gap-4 font-medium">
      <div
        className={editorTabVariants({ active: mode === 'write' })}
        onClick={() => setMode('write')}
      >
        작성
      </div>
      <div
        className={editorTabVariants({ active: mode === 'preview' })}
        onClick={() => setMode('preview')}
      >
        미리보기
      </div>
    </div>
  )
}
