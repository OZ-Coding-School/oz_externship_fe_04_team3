import Select from '@/components/common/Select'
import { categoryData, sortData } from '@/mocks/selectMockData'
import { Folder } from 'lucide-react'

export default function YeeunTest() {
  return (
    <div className="flex-center my-4 h-50 flex-col gap-4">
      {/* 아이콘있고 타이틀 없는 버전 */}
      <Select
        icon={<Folder />}
        data={categoryData}
        placeHolder="전체카테고리"
        onValueChange={(e) => console.log(e)} //디버깅
      ></Select>

      {/* 아이콘없고 타이틀 있는 버전 */}
      <Select title="정렬" placeHolder="최신순" data={sortData} />
    </div>
  )
}
