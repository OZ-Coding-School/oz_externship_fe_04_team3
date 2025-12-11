import { useState, useMemo, useEffect } from 'react'
import { getRecruitments } from '@/api/axios'
import { mockRecruitments, type Recruitment } from '@/mocks/recruitmentData'

export function useRecruitments() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('전체 카테고리')
  const [selectedSort, setSelectedSort] = useState('최신순')
  const [visibleCount, setVisibleCount] = useState(10)
  const [recruitments, setRecruitments] = useState<Recruitment[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // 맞춤(추천) 공고
  const recommendedRecruitments = useMemo(() => {
    const sorted = [...mockRecruitments].sort((a, b) => {
      const scoreA = a.views + a.bookmarks * 10
      const scoreB = b.views + b.bookmarks * 10
      return scoreB - scoreA
    })
    return sorted.slice(0, 3)
  }, [])

  useEffect(() => {
    const fetchRecruitments = async () => {
      setIsLoading(true)
      try {
        const data = await getRecruitments({
          search: searchKeyword,
          category: selectedCategory,
          sort: selectedSort,
        })
        setRecruitments(data)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch recruitments:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecruitments()
  }, [searchKeyword, selectedCategory, selectedSort])

  const displayedRecruitments = recruitments.slice(0, visibleCount)
  const hasMore = visibleCount < recruitments.length

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

  return {
    searchKeyword,
    selectedCategory,
    selectedSort,
    visibleCount,
    displayedRecruitments,
    filteredAndSorted: recruitments,
    recommendedRecruitments,
    hasMore,
    isLoading,
    handleSearchChange,
    handleCategoryChange,
    handleSortChange,
    handleLoadMore,
  }
}
