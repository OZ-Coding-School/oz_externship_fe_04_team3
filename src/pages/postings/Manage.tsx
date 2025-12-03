import ManageDashboard from '@/components/postings/manage/ManageDashboard'
import ManageHeader from '@/components/postings/manage/ManageHeader'
import ManageList from '@/components/postings/manage/ManageList'
import ManageSearch from '@/components/postings/manage/ManageSearch'

export type ManageRecruitment = {
  uuid: string
  title: string
  thumbnailImgUrl: string
  expectedHeadcount: number
  closeAt: string
  viewsCount: number
  bookmarkCount: number
  lectures: { id: number; title: string; instructor: string }[]
  tags: { id: number; name: string }[]
  isClosed: boolean
}

// API 응답을 매핑했다고 가정한 목업 데이터
const MOCK_RECRUITMENTS: ManageRecruitment[] = [
  {
    uuid: 'b8dbd77f-cf73-4ef4-9914-4394d5ab366e',
    title: '[급구] 파이썬 주 1회 스터디원 구합니다.',
    thumbnailImgUrl:
      'https://placehold.co/160x120/png?text=Recruitment+1',
    expectedHeadcount: 10,
    closeAt: '2025-11-20T00:00:05.875842+09:00',
    viewsCount: 100,
    bookmarkCount: 36,
    lectures: [
      { id: 1, title: '파이썬 마스터하기', instructor: '김한영' },
      { id: 2, title: '알고리즘 실전', instructor: '홍길동' },
    ],
    tags: [
      { id: 1, name: 'python' },
      { id: 2, name: 'backend' },
    ],
    isClosed: false,
  },
  {
    uuid: 'c1d2e3f4-cf73-4ef4-9914-4394d5ab366e',
    title: '프론트엔드(React) 스터디 모집',
    thumbnailImgUrl:
      'https://placehold.co/160x120/png?text=Recruitment+2',
    expectedHeadcount: 8,
    closeAt: '2024-05-10T00:00:05.875842+09:00',
    viewsCount: 240,
    bookmarkCount: 58,
    lectures: [{ id: 3, title: 'React 핵심', instructor: '이효리' }],
    tags: [
      { id: 3, name: 'frontend' },
      { id: 4, name: 'react' },
    ],
    isClosed: true,
  },
]

export default function Manage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6">
      <ManageHeader />
      <ManageDashboard
        totalCount={MOCK_RECRUITMENTS.length}
        closedCount={MOCK_RECRUITMENTS.filter((r) => r.isClosed).length}
      />
      <ManageSearch />
      <ManageList postings={MOCK_RECRUITMENTS} />
    </div>
  )
}
