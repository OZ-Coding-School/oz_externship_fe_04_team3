import GuestRecommendSection from '@/components/GuestRecommendSection'
import LectureList from '@/components/lecture/LectureList'

export default function Courses() {
  return (
    <div className="page_courses mx-auto flex max-w-7xl flex-col gap-6 px-20 py-8">
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
      <section className="courses_filter border-2 border-blue-500">
        검색어
      </section>
      <section className="courses_cardlist">
        <LectureList></LectureList>
      </section>
    </div>
  )
}
