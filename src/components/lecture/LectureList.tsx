import useGetLectures from '@/hooks/useGetLecture'
import LectureCard from './LectureCard'

export default function LectureList() {
  const { data } = useGetLectures()
  const lectures = data?.pages.flatMap((page) => page.results) ?? []
  console.log(lectures)

  return (
    <div className="grid w-full gap-3 md:grid-cols-2 lg:grid-cols-3">
      {lectures.map((lecture) => (
        <LectureCard key={lecture.id} {...lecture} />
      ))}
    </div>
  )
}
