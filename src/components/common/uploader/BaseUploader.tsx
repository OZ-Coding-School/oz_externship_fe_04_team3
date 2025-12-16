import { cn } from '@/lib/utils'
import { useCallback } from 'react'
import { useDropzone, type Accept, type FileRejection } from 'react-dropzone'
import { DashedBox } from '@/components/common/DashedBox'

type BaseUploaderProps = {
  accept?: Accept
  maxSize?: number
  multiple?: boolean
  onDrop: (accepted: File[], rejected: FileRejection[]) => void
  children?: React.ReactNode
  className?: string
}

export function BaseUploader({
  accept,
  maxSize = 5 * 1024 * 1024,
  multiple = false,
  onDrop,
  children,
  className,
}: BaseUploaderProps) {
  const handleDrop = useCallback(
    (accepted: File[], rejected: FileRejection[]) => {
      onDrop(accepted, rejected)
    },
    [onDrop]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxSize,
    multiple,
    onDrop: handleDrop,
  })

  const borderColor = isDragActive ? '#3b82f6' : '#D1D5DB'
  const bgClass = isDragActive
    ? 'bg-primary-50'
    : 'bg-white hover:bg-custom-gray-50'

  return (
    <DashedBox
      {...getRootProps()}
      borderRadius={8}
      borderWidth={2}
      color={borderColor}
      className={cn(
        'flex-center relative w-full cursor-pointer flex-col p-6 transition',
        bgClass,
        className
      )}
    >
      <input {...getInputProps()} className="hidden" />
      {children}
    </DashedBox>
  )
}
