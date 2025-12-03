import mockData from '@/mocks/data/크롤링강의page1.json'

import type { Lecture } from '@/types/lecture'
import { Badge } from '../ui/badge'
import LectureCard from './LectureCard'

export default function LectureRecommendSection() {
  const lectureList = mockData.results as Lecture[]

  return (
    <div className="border-primary-200 w-5/6 rounded-xl border bg-linear-to-r from-[#FFF7ED] to-[#FEFCE8] px-4 py-8 md:p-8">
      <div>
        <div className="section-header flex items-baseline gap-2">
          <h3 className="pb-6 text-left text-balance text-gray-900">
            김스터디 님을 위한 추천 강의
          </h3>
          <Badge variant={'danger'}>개인맞춤</Badge>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lectureList.slice(0, 3).map((i) => (
            <LectureCard key={i.id} {...i}></LectureCard>
          ))}
        </div>
      </div>
    </div>
  )
}
