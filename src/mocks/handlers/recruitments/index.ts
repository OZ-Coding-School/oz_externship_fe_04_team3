import { http, HttpResponse } from 'msw'
import recruitmentData from '../../data/recruitmentList.json'

interface Recruitment {
  uuid: string
  title: string
  thumbnail_img_url: string
  expected_headcount: number
  close_at: string
  views_count: number
  bookmark_count: number
  lectures: Array<{
    id: number
    title: string
    instructor: string
  }>
  tags: Array<{
    id: number
    name: string
  }>
}

interface RecruitmentResponse {
  count: number
  next: string | null
  previous: string | null
  results: Recruitment[]
}

export const recruitmentHandlers = [
  http.get('/api/v1/recruitments', ({ request }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const pageSize = parseInt(url.searchParams.get('page_size') || '10')
    const search = url.searchParams.get('search') || ''
    const sort = url.searchParams.get('sort') || 'latest'
    const tagsParam = url.searchParams.getAll('tags')

    let results = [...recruitmentData.results]

    // 검색 필터
    if (search) {
      results = results.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    // 태그 필터
    if (tagsParam.length > 0) {
      results = results.filter((item) =>
        item.tags.some((tag) => tagsParam.includes(tag.name))
      )
    }

    const sortRecruitments = (
      list: Recruitment[],
      sortKey: RecruitmentSortKey
    ) => {
      const sorted = [...list]
      switch (sortKey) {
        case 'latest':
          return sorted.sort(
            (a, b) =>
              new Date(b.close_at).getTime() - new Date(a.close_at).getTime()
          )
        case 'oldest':
          return sorted.sort(
            (a, b) =>
              new Date(a.close_at).getTime() - new Date(b.close_at).getTime()
          )
        case 'most_views':
          return sorted.sort((a, b) => b.views_count - a.views_count)
        case 'most_bookmarks':
          return sorted.sort((a, b) => b.bookmark_count - a.bookmark_count)
        default:
          return sorted
      }
    }

    type RecruitmentSortKey =
      | 'latest'
      | 'oldest'
      | 'most_views'
      | 'most_bookmarks'

    results = sortRecruitments(
      results,
      (sort as RecruitmentSortKey | undefined) ?? 'latest'
    )

    // 페이지네이션
    const totalCount = results.length
    const startIdx = (page - 1) * pageSize
    const endIdx = startIdx + pageSize
    const paginatedResults = results.slice(startIdx, endIdx)

    // next/previous URL 생성
    const baseUrl = new URL(request.url).origin + '/api/v1/recruitments?'
    const searchParams = new URLSearchParams({
      page_size: pageSize.toString(),
      ...(search && { search }),
      ...(sort !== 'latest' && { sort }),
    })
    tagsParam.forEach((tag) => searchParams.append('tags', tag))

    const nextPage = endIdx < totalCount ? page + 1 : null
    const previousPage = page > 1 ? page - 1 : null
    const buildPageUrl = (pageNum: number) =>
      `${baseUrl}page=${pageNum}&${searchParams.toString()}`

    const response: RecruitmentResponse = {
      count: totalCount,
      next: nextPage ? buildPageUrl(nextPage) : null,
      previous: previousPage ? buildPageUrl(previousPage) : null,
      results: paginatedResults,
    }

    return HttpResponse.json(response)
  }),
]
