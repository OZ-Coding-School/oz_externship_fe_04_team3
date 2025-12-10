import { useState } from 'react'
import { Bookmark, Calendar, Eye, Pencil, Trash2, Users } from 'lucide-react'

import { getTypeIcon } from '@/helpers/icons'
import { Button } from '@/components/common'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import type { ManageRecruitment } from '@/types/myRecruitment'

type ManageCardProps = {
  posting: ManageRecruitment
}

export default function ManageCard({ posting }: ManageCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <div className="relative grid gap-4 rounded-lg border border-gray-200 bg-white p-4 md:grid-cols-[160px_1fr] md:items-start">
      {/* 썸네일 */}
      <div className="relative md:row-span-2">
        {!imgLoaded && (
          <Skeleton className="absolute inset-0 h-24 w-40 rounded-md md:h-32" />
        )}
        <img
          src={posting.thumbnailImgUrl}
          alt={posting.title}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(true)}
          className={`mx-auto h-32 w-full rounded-md object-cover transition-opacity duration-200 md:h-24 md:w-40 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* 내용 */}
      <div className="flex flex-col gap-3">
        <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-gray-900">
            {posting.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Eye size={16} />
              <span>{posting.viewsCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bookmark size={16} />
              <span>{posting.bookmarkCount}</span>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <Pencil size={16} />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Users size={16} />
            <span>모집 인원 : {posting.expectedHeadcount}명</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>마감일 : {posting.closeAt.split('T')[0]}</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-gray-600">강의 목록 :</span>
              {posting.lectures.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {posting.lectures.map((lec) => (
                    <span key={lec.id} className="text-gray-700">
                      <i className="mr-2">·</i>
                      {lec.title}
                    </span>
                  ))}
                </div>
              ) : (
                <span>등록된 강의가 없습니다</span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {posting.tags.map((tag) => (
              <Badge key={tag.id} variant={'primary'}>
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* 지원 내역 버튼 */}
      <div className="md:absolute md:right-4 md:bottom-4 md:self-end">
        <Button className="btn-active-blue h-12 w-full px-6 py-3 md:w-[150px]">
          {getTypeIcon('total')} 지원 내역
        </Button>
      </div>
    </div>
  )
}
