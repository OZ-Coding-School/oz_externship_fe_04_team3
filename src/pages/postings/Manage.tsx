import ManageDashboard from '@/components/postings/manage/ManageDashboard'
import ManageHeader from '@/components/postings/manage/ManageHeader'
import ManageList from '@/components/postings/manage/ManageList'
import ManageSearch from '@/components/postings/manage/ManageSearch'
import { useRecruitments } from '@/hooks/quries/useMyRecruitments'
import { useState } from 'react'
import type { MyRecruitmentParams } from '@/types/myRecruitment'

export default function Manage() {
  const [status, setStatus] = useState<'all' | 'open' | 'closed'>('all')
  const [sort, setSort] = useState<MyRecruitmentParams['sort']>('latest')

  const { data, totalCount, openCount, closedCount, isLoading, error } =
    useRecruitments({
      page: 1,
      page_size: 10,
      sort,
      is_closed:
        status === 'all' ? undefined : status === 'closed' ? true : false,
    })

  const postings = data ?? []

  return (
    <div className="mx-auto flex flex-col gap-6 px-4 py-6">
      <ManageHeader />
      <ManageDashboard
        totalCount={totalCount}
        openCount={openCount}
        closedCount={closedCount}
      />
      <ManageSearch
        status={status}
        sort={sort}
        counts={{ total: totalCount, open: openCount, closed: closedCount }}
        onStatusChange={(value) => setStatus(value)}
        onSortChange={(value) => setSort(value)}
      />
      {isLoading && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-sm text-gray-600">
          공고를 불러오는 중입니다...
        </div>
      )}
      {error && (
        <div className="border-danger-500 bg-danger rounded-lg border p-6 text-sm text-gray-800">
          공고 목록을 불러오지 못했습니다.
        </div>
      )}
      {!isLoading && !error && <ManageList postings={postings} />}
    </div>
  )
}
