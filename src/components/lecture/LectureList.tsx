import mockData from '@/mocks/크롤링강의page1.json'
import type { Lecture } from '@/types/lecture'
import LectureCard from './LectureCard'

export default function LectureList() {
  const lectures = mockData.results as Lecture[]
  console.log(lectures)
  return (
    <div>
      <h1>전체 강의리스트</h1>
      {lectures.map((lecture) => (
        <LectureCard key={lecture.id} {...lecture} />
      ))}
    </div>
  )
}
