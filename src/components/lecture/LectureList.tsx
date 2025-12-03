import useGetLectures from '@/hooks/quries/useGetLecture'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import LectureCard from './LectureCard'

export default function LectureList() {
  //data 불러오기
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetLectures()

  //무한스크롤
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '50px',
  })

  //inView 변할 때 마다, 다음페이지 호출
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
    console.log('화면에 있니???', inView)
  }, [inView])

  return (
    <>
      <div className="grid w-full gap-3 md:grid-cols-2 lg:grid-cols-3">
        {data?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.results.map((lecture) => (
              <LectureCard key={lecture.id} {...lecture} />
            ))}
          </React.Fragment>
        ))}
      </div>
      {/* 페이지 로드하고, 더이상 보여줄 페이지가 없다면? 없다는 텍스트 노출 */}
      {!hasNextPage ? (
        <div
          className="flex-center mt-12 h-12 rounded-full bg-gray-200 text-center text-white"
          ref={ref}
        >
          더 이상 강의가 없습니다.
        </div>
      ) : (
        <div
          className="bg-primary-500 flex-center mt-12 h-12 rounded-full text-center text-white"
          ref={ref}
        >
          더많은 강의 보기
        </div>
      )}
    </>
  )
}
