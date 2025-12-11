import Select from '@/components/common/Select'
import type { MyRecruitmentParams } from '@/types/myRecruitment'

type ManageSearchProps = {
  status: 'all' | 'open' | 'closed'
  sort: MyRecruitmentParams['sort']
  counts: { total: number; open: number; closed: number }
  onStatusChange: (value: 'all' | 'open' | 'closed') => void
  onSortChange: (value: MyRecruitmentParams['sort']) => void
}

export default function ManageSearch({
  status,
  sort,
  counts,
  onStatusChange,
  onSortChange,
}: ManageSearchProps) {
  return (
    <div className="flex-between flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 md:flex-row">
      <div className="w-full md:w-1/2">
        <Select
          name="state"
          title="상태"
          placeHolder="상태 선택"
          value={status}
          onValueChange={(v) =>
            onStatusChange(v as ManageSearchProps['status'])
          }
          data={[
            { itemValue: 'all', itemText: `전체 (${counts.total})` },
            { itemValue: 'open', itemText: `모집중 (${counts.open})` },
            { itemValue: 'closed', itemText: `마감 (${counts.closed})` },
          ]}
        />
      </div>
      <div className="w-full md:w-1/2">
        <Select
          name="sort"
          title="정렬"
          placeHolder="정렬 선택"
          value={sort}
          onValueChange={(v) => onSortChange(v as MyRecruitmentParams['sort'])}
          data={[
            { itemValue: 'latest', itemText: '최신순' },
            { itemValue: 'oldest', itemText: '오래된순' },
            { itemValue: 'most_views', itemText: '조회수 많은 순' },
            { itemValue: 'most_bookmarks', itemText: '북마크 많은 순' },
          ]}
        />
      </div>
    </div>
  )
}
