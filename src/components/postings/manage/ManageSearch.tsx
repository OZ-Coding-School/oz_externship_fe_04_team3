import Select from '@/components/common/Select'

export default function ManageSearch() {
  return (
    <div className="flex-between flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 md:flex-row">
      <div className="w-full md:w-1/2">
        <Select
          title="상태"
          placeHolder="상태 선택"
          data={[
            { itemValue: 'all', itemText: '전체' },
            { itemValue: 'open', itemText: '모집중' },
            { itemValue: 'closed', itemText: '마감' },
          ]}
        />
      </div>
      <div className="w-full md:w-1/2">
        <Select
          title="정렬"
          placeHolder="정렬 선택"
          data={[
            { itemValue: 'recent', itemText: '최신순' },
            { itemValue: 'oldest', itemText: '오래된순' },
            { itemValue: 'popular', itemText: '지원자 많은 순' },
          ]}
        />
      </div>
    </div>
  )
}
