import mockData from '@/mocks/data/lectureList.json'

import type { Lecture } from '@/types/lecture'
import { http, HttpResponse } from 'msw'
const generateMockData = () => {
  const base = mockData.results as Lecture[]
  const multiplied: Lecture[] = []

  //데이터 복제
  for (let i = 0; i < 5; i++) {
    base.forEach((lecture) => {
      multiplied.push({
        ...lecture,
        id: lecture.id + i * 1000,
        title: `${lecture.title} (${i + 1})`,
      })
    })
  }

  return multiplied
}

interface PaginatedResponse {
  count: number
  next: string | null
  previous: string | null
  results: Lecture[]
}

export const lectureHandlers = [
  http.get('/v1/lectures', async ({ request }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const page_size = parseInt(url.searchParams.get('page_size') || '12')
    const allLectures = generateMockData()
    const startIndex = (page - 1) * page_size
    const endIndex = startIndex + page_size
    const paginatedLectures = allLectures.slice(startIndex, endIndex)

    const response: PaginatedResponse = {
      count: allLectures.length,
      next:
        endIndex < allLectures.length
          ? `/v1/lectures?page=${page + 1}&page_size=${page_size}`
          : null,
      previous:
        page > 1
          ? `/v1/lectures?page=${page - 1}&page_size=${page_size}`
          : null,
      results: paginatedLectures,
    }

    return HttpResponse.json(response)
  }),
]
