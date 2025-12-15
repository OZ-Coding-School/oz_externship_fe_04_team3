import type { LoginState } from '@/store/loginStateStore'
import type { LecturePageResponse } from '@/types/lecture'
import type { InfiniteData } from '@tanstack/react-query'
import React from 'react'
import LectureCard from './LectureCard'

type dataProps = {
  data: InfiniteData<LecturePageResponse> | undefined
  loginState: LoginState
}
export default function LectureList({ data, loginState }: dataProps) {
  return (
    <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.results.map((lecture) => (
            <LectureCard
              key={lecture.id}
              {...lecture}
              loginState={loginState}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  )
}
