import { Select } from '@/components/common'
import GuestRecommendSection from '@/components/GuestRecommendSection'
import { Input } from '@/components/input'
import LectureList from '@/components/lecture/LectureList'
import { categoryData, sortData } from '@/mocks/data/selectMockData'
import { ArrowDownWideNarrow, Folder, Search } from 'lucide-react'

export default function Courses() {
  return (
    <div className="page_courses flex flex-col gap-6">
      <section className="courses_header">
        <div className="courses_section_header pb-8">
          <h2 className="pb-2">IT 강의 목록</h2>
          <p className="text-gray-600">
            전문 강사들의 고품질 IT 강의를 만나보세요
          </p>
        </div>
        {/* 비회원 추천 섹션 */}
        <GuestRecommendSection
          title="강의를"
          description="로그인하시면 관심 분야를 바탕으로 맞춤형 강의"
        ></GuestRecommendSection>
      </section>
      <section className="courses_filter flex gap-4 rounded-md border-2 border-gray-200 bg-white p-6">
        <Input prefix={<Search />} className="h-[38px]"></Input>
        <Select
          icon={<Folder />}
          data={categoryData}
          placeHolder="전체카테고리"
          onValueChange={(e) => console.log(e)} //디버깅
        ></Select>
        <Select
          icon={<ArrowDownWideNarrow />}
          data={sortData}
          placeHolder="최신순"
          onValueChange={(e) => console.log(e)} //디버깅
        ></Select>
      </section>
      <section className="courses_cardlist border-2">
        <LectureList></LectureList>
      </section>
    </div>
  )
}
