import { markdownToHtml } from '@/lib/markdown'

interface PreviewProps {
  value: string
}

export function Preview({ value }: PreviewProps) {
  return (
    <div
      className="text-custom-gray-900 remove-focus-outline markdown-content min-h-[200px] w-full list-inside border-0 p-4"
      dangerouslySetInnerHTML={{ __html: markdownToHtml(value) }}
      style={{ listStyle: 'decimal' }}
    />
  )
}
