import { Button } from '@/components/common'
import { showToast } from '@/components/common/toast/Toast'
import { ImagePlus, X } from 'lucide-react'
import { useMemo } from 'react'
import { BaseUploader } from './BaseUploader'
import type { FileRejection } from 'react-dropzone'

export type UploadedImage = {
  id: string
  url: string
  name: string
  size: number
}

type ImageUploaderProps = {
  images: UploadedImage[]
  onChange: (next: UploadedImage[]) => void
  maxCount?: number
  maxSize?: number
}

export function ImageUploader({
  images,
  onChange,
  maxCount = 3,
  maxSize = 5 * 1024 * 1024,
}: ImageUploaderProps) {
  const remain = useMemo(
    () => Math.max(0, maxCount - images.length),
    [images.length, maxCount]
  )

  const handleDrop = (accepted: File[], rejected: FileRejection[]) => {
    if (rejected.length) {
      rejected.forEach((rej) => {
        const reason =
          rej.errors?.[0]?.message ??
          (rej.file.size > maxSize
            ? '파일 용량 초과'
            : '지원하지 않는 파일 형식')
        showToast.error(reason, rej.file.name)
      })
    }

    if (remain <= 0) {
      showToast.warning(
        '업로드 제한',
        `이미지는 최대 ${maxCount}개까지 업로드할 수 있습니다.`
      )
      return
    }

    const available = accepted.slice(0, remain)
    if (!available.length) return

    const nextImages = available.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    }))

    onChange([...images, ...nextImages])
  }

  const handleRemove = (id: string) => {
    const target = images.find((img) => img.id === id)
    if (target) URL.revokeObjectURL(target.url)
    onChange(images.filter((img) => img.id !== id))
  }

  return (
    <BaseUploader
      accept={{
        'image/jpeg': ['.jpeg', '.jpg'],
        'image/png': ['.png'],
        'image/webp': ['.webp'],
      }}
      maxSize={maxSize}
      multiple
      onDrop={handleDrop}
    >
      {images.length === 0 ? (
        <div className="centralize flex-center flex-col gap-2 py-[15px] text-center text-[#9CA3AF]">
          <ImagePlus size={36} className="text-sm" />
          <p className="text-[#6B7280]">
            파일을 드래그하거나 클릭하여 업로드 <br /> 최대 {maxCount}개, 각{' '}
            {Math.round(maxSize / 1024 / 1024)} MB 이하
          </p>
          <p></p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative h-32 overflow-hidden rounded-md border border-gray-200"
            >
              <img
                src={img.url}
                alt={img.name}
                className="h-full w-full object-cover"
              />
              <Button
                variant="ghost"
                className="absolute top-1 right-1 bg-gray-50"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemove(img.id)
                }}
              >
                <X size={14} />
              </Button>
              <span className="absolute bottom-1 left-1 rounded bg-black/60 px-2 text-[10px] text-white">
                {img.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </BaseUploader>
  )
}
