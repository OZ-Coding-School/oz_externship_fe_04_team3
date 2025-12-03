import ManageCard from './ManageCard'
import type { ManageRecruitment } from '@/pages/postings/Manage'

type ManageListProps = {
  postings: ManageRecruitment[]
}

export default function ManageList({ postings }: ManageListProps) {
  if (postings.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
        등록된 공고가 없습니다.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {postings.map((posting) => (
        <ManageCard key={posting.uuid} posting={posting} />
      ))}
    </div>
  )
}
