import GuestRecommendSection from '@/components/GuestRecommendSection'

export default function YeeunTest() {
  return (
    <div className="flex justify-center gap-3">
      <GuestRecommendSection
        title="강의를 추천"
        description="로그인하시면 관심 분야를 바탕으로 맞춤형 강의"
      ></GuestRecommendSection>
      {/* <LectureRecommendSection></LectureRecommendSection> */}
    </div>
  )
}
