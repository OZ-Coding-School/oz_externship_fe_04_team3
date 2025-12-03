import useGetLectures from '@/hooks/quries/useGetLecture'
import React from 'react'
import LectureCard from './LectureCard'

export default function LectureList() {
  const { data } = useGetLectures()
  console.log(data)

  return (
    <div className="grid w-full gap-3 md:grid-cols-2 lg:grid-cols-3">
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.results.map((lecture) => (
            <LectureCard key={lecture.id} {...lecture} />
          ))}
        </React.Fragment>
      ))}
    </div>
  )
}
