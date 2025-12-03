import type { Lecture } from '@/types/lecture'
import mockData from '@/mocks/data/lectureList.json'
import LectureCard from './LectureCard'

export default function LectureList() {
  const lectures = mockData.results as Lecture[]
  return (
    <div className="grid w-full gap-3 md:grid-cols-2 lg:grid-cols-3">
      {lectures.map((lecture) => (
        <LectureCard key={lecture.id} {...lecture} />
      ))}
    </div>
  )
}
