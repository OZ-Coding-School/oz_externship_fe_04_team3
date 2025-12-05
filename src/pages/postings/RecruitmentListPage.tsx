import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  User,
  Calendar,
  Sparkles,
  Bell,
  Plus,
  LogIn,
  UserPlus,
  Eye,
  Bookmark,
  Search,
  ArrowUp,
} from 'lucide-react'
import {
  mockRecruitments,
  type Recruitment,
  filterByCategory,
} from '@/mocks/recruitmentData'

interface RecruitmentListPageProps {
  isLoggedIn?: boolean
  userName?: string
}

export default function RecruitmentListPage({
  isLoggedIn = false,
  userName = '사용자',
}: RecruitmentListPageProps) {
  const navigate = useNavigate()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('전체 카테고리')
  const [selectedSort, setSelectedSort] = useState('최신순')
  const [visibleCount, setVisibleCount] = useState(10)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useState(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getRecommendedRecruitments = () => {
    const sortedByPopularity = [...mockRecruitments].sort((a, b) => {
      const scoreA = a.views + a.bookmarks * 10
      const scoreB = b.views + b.bookmarks * 10
      return scoreB - scoreA
    })

    return sortedByPopularity.slice(0, 3)
  }

  const recommendedRecruitments = getRecommendedRecruitments()
  const getFilteredAndSortedRecruitments = () => {
    let filtered = [...mockRecruitments]

    if (searchKeyword.trim()) {
      filtered = filtered.filter((recruitment) =>
        recruitment.title.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    }

    filtered = filterByCategory(selectedCategory, filtered)

    switch (selectedSort) {
      case '최신순':
        filtered.sort((a, b) => {
          const dateA = new Date(
            (a.createdAt || '2025.01.01').replace(/\./g, '-')
          )
          const dateB = new Date(
            (b.createdAt || '2025.01.01').replace(/\./g, '-')
          )
          return dateB.getTime() - dateA.getTime()
        })
        break
      case '조회 많은 순':
        filtered.sort((a, b) => b.views - a.views)
        break
      case '북마크 많은 순':
        filtered.sort((a, b) => b.bookmarks - a.bookmarks)
        break
      default:
        break
    }
    return filtered
  }

  const allRecruitments = getFilteredAndSortedRecruitments()
  const displayedRecruitments = allRecruitments.slice(0, visibleCount)
  const hasMore = visibleCount < allRecruitments.length
  const handleSearchChange = (value: string) => {
    setSearchKeyword(value)
    setVisibleCount(10)
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    setVisibleCount(10)
  }

  const handleSortChange = (value: string) => {
    setSelectedSort(value)
    setVisibleCount(10)
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10)
  }

  const allCategories = [
    'AI/인공지능',
    '응용 AI',
    'IT/프로그래밍',
    '게임 개발',
    '데이터 사이언스',
    'IT',
    '하드웨어',
    '디자인',
  ]

  const handleRecruitmentClick = (id: number) => {
    navigate(`/recruitment/${id}`)
  }

  const RecruitmentCard = ({ recruitment }: { recruitment: Recruitment }) => (
    <div
      className="cursor-pointer rounded-lg border border-gray-200 bg-white px-6 py-3 transition-shadow hover:shadow-lg md:px-6 md:py-4"
      onClick={() => handleRecruitmentClick(recruitment.id)}
    >
      <div className="flex flex-col gap-3 sm:flex-row md:gap-4">
        <div className="flex h-48 w-full shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100 sm:h-32 sm:w-48">
          {recruitment.thumbnailType === 'image' ? (
            <img
              src={recruitment.thumbnail}
              alt={recruitment.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-4xl">{recruitment.thumbnail}</span>
          )}
        </div>

        <div className="min-w-0 flex-1 pl-6">
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <h3 className="flex-1 truncate text-base font-bold md:text-lg">
              {recruitment.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-gray-500 md:text-sm">
              <div className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span>{recruitment.views}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bookmark className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span>{recruitment.bookmarks}</span>
              </div>
            </div>
          </div>

          <div className="mb-3 flex items-center gap-2 text-xs text-gray-600 md:text-sm">
            <User className="h-3.5 w-3.5 text-gray-400 md:h-4 md:w-4" />
            <span>모집 인원 : {recruitment.maxParticipants}명</span>
          </div>

          {recruitment.deadline && (
            <div className="mb-3 flex items-center gap-2 text-xs text-gray-500 md:text-sm">
              <Calendar className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span>마감일 : {recruitment.deadline}</span>
            </div>
          )}

          {recruitment.lectureList && recruitment.lectureList.length > 0 && (
            <div className="mb-3">
              <p className="mb-1 text-xs font-semibold text-gray-600 md:text-sm">
                강의 목록 :
              </p>
              <ul className="space-y-0.5 text-xs text-gray-600 md:text-sm">
                {recruitment.lectureList.map((lecture, index) => (
                  <li key={index}>• {lecture}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {recruitment.tags.map((tag, index) => (
              <span
                key={index}
                className="rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-800 md:px-3"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl p-4 md:p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:mb-8">
          <div>
            <h1 className="mb-2 text-2xl font-bold md:text-3xl">
              스터디 구인 공고
            </h1>
            <p className="text-sm text-gray-600 md:text-base">
              새로운 스터디 팀원을 찾거나 관심있는 스터디에 참여해보세요!
            </p>
          </div>
        </div>

        {isLoggedIn && (
          <div className="mb-6 rounded-lg border border-yellow-200 bg-amber-50 p-4 md:mb-8 md:p-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="flex items-center gap-2 text-lg font-bold md:text-xl">
                  <Sparkles className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  <span className="text-yellow-600">{userName}</span>님을 위한
                  맞춤 스터디 공고
                </h2>
                <span className="rounded bg-orange-400 px-2 py-0.5 text-[10px] text-white">
                  개인화 추천
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {recommendedRecruitments.map((recruitment) => (
                <div
                  key={recruitment.id}
                  className="cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg"
                  onClick={() => handleRecruitmentClick(recruitment.id)}
                >
                  <div className="relative p-4">
                    <div className="flex h-32 w-48 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                      {recruitment.thumbnailType === 'image' ? (
                        <img
                          src={recruitment.thumbnail}
                          alt={recruitment.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-4xl">
                          {recruitment.thumbnail}
                        </span>
                      )}
                    </div>

                    <div className="absolute top-6 right-6 translate-x-2 -translate-y-1">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Bookmark className="h-5 w-5" />
                          <span>{recruitment.bookmarks}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Eye className="h-5 w-5" />
                          <span>{recruitment.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pr-4 pb-4 pl-4">
                    <h3 className="mb-2 line-clamp-2 min-h-6 text-base font-bold">
                      {recruitment.title}
                    </h3>

                    <div className="mb-2 flex items-center gap-2 text-xs text-gray-600">
                      <User className="h-4 w-4 text-gray-400" />
                      <span>모집 인원 : {recruitment.maxParticipants}명</span>
                    </div>

                    {recruitment.deadline && (
                      <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>마감일 : {recruitment.deadline}</span>
                      </div>
                    )}

                    {recruitment.lectureList &&
                      recruitment.lectureList.length > 0 && (
                        <div className="mb-3">
                          <p className="mb-1 text-xs font-semibold text-gray-600">
                            강의 목록 :
                          </p>
                          <ul className="space-y-0.5 text-xs text-gray-600">
                            {recruitment.lectureList.map((lecture, index) => (
                              <li key={index}>• {lecture}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                    <div className="mt-3 flex flex-wrap gap-2">
                      {recruitment.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isLoggedIn && (
          <div className="relative mb-6 flex min-h-[400px] items-center justify-center rounded-lg border-2 border-yellow-200 bg-amber-50 p-8 md:mb-8 md:p-12">
            <div className="pointer-events-none relative grid grid-cols-1 gap-4 opacity-30 md:grid-cols-3">
              {[1, 2, 3].map((index) => (
                <div key={index} className="rounded-lg bg-white p-4 blur-sm">
                  <div className="mb-3 h-32 w-full animate-pulse rounded-lg bg-gray-200"></div>
                  <div className="mb-2 h-4 animate-pulse rounded bg-gray-200"></div>
                  <div className="mb-2 h-3 w-2/3 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200"></div>
                </div>
              ))}
            </div>

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 py-12">
              <Bell className="mb-6 h-16 w-16 text-yellow-500 md:mb-8 md:h-20 md:w-20" />
              <h3 className="mb-4 text-center text-2xl font-bold md:text-3xl">
                개인 맞춤 스터디 공고를 받아보세요
              </h3>
              <p className="mb-8 max-w-2xl text-center text-base leading-relaxed text-gray-600 md:text-lg">
                로그인하시면 관심 분야와 수강 강의를 바탕으로 맞춤형 스터디
                공고를 추천해드립니다
              </p>
              <div className="mb-6 flex flex-col justify-center gap-4 sm:flex-row">
                <button className="flex items-center justify-center gap-2 rounded-lg bg-yellow-400 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-yellow-500">
                  <LogIn className="h-5 w-5" />
                  로그인하기
                </button>
                <button className="flex items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-8 py-3 text-base font-medium transition-colors hover:bg-gray-50">
                  <UserPlus className="h-5 w-5" />
                  회원가입하기
                </button>
              </div>
              <p className="flex items-center justify-center gap-2 text-sm text-gray-500 md:text-base">
                로그인 후 맞춤 추천을 받을 수 있어요
              </p>
            </div>
          </div>
        )}

        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
          <div className="relative mb-4 max-w-md">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="공고 제목으로 검색해보세요"
              value={searchKeyword}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pr-4 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-yellow-400 focus:outline-none md:py-3 md:text-base"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row md:gap-4">
            <div className="flex-1">
              <label className="mb-2 block text-xs text-gray-600 md:text-sm">
                카테고리
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-yellow-400 focus:outline-none md:px-4 md:text-base"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  paddingRight: '36px',
                }}
              >
                <option>전체 카테고리</option>
                {allCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="mb-2 block text-xs text-gray-600 md:text-sm">
                정렬
              </label>
              <select
                value={selectedSort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-yellow-400 focus:outline-none md:px-4 md:text-base"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  paddingRight: '36px',
                }}
              >
                <option>최신순</option>
                <option>조회 많은 순</option>
                <option>북마크 많은 순</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="mb-4 text-xl font-bold">
            전체 공고 ({allRecruitments.length})
          </h2>
        </div>

        {allRecruitments.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">검색 결과가 없습니다.</p>
            <p className="mt-2 text-sm text-gray-400">
              다른 검색어나 필터를 시도해보세요.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {displayedRecruitments.map((recruitment) => (
                <RecruitmentCard
                  key={recruitment.id}
                  recruitment={recruitment}
                />
              ))}
            </div>

            {hasMore && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  className="flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <Plus className="h-5 w-5" />더 많은 공고 보기
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-3">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-400 text-white shadow-lg transition-colors hover:bg-gray-500"
            aria-label="top button"
          >
            <ArrowUp className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  )
}
