import { http, HttpResponse } from 'msw'
import {
  mockRecruitments,
  filterByCategory,
  type MockRecruitment,
} from '@/mocks/recruitmentData'
import { applyRecruitmentHandler } from './applyRecruitment'

const mapToApiFormat = (recruitment: MockRecruitment) => ({
  id: recruitment.id,
  title: recruitment.title,
  content: recruitment.description,
  max_participants: recruitment.maxParticipants,
  deadline: recruitment.deadline,
  views: recruitment.views,
  created_at: recruitment.createdAt,
  author: recruitment.author,
  thumbnail: recruitment.thumbnail,
  thumbnailType: recruitment.thumbnailType,
  tags: recruitment.tags,
  participants: recruitment.participants,
  bookmarks: recruitment.bookmarks,
  lecture_list: recruitment.lectureList,
  attachments: recruitment.attachments,
})

export const recruitmentHandlers = [
  http.get('/api/v1/recruitments', ({ request }) => {
    const url = new URL(request.url)
    const search = url.searchParams.get('search') || ''
    const category = url.searchParams.get('category') || '전체 카테고리'
    const sort = url.searchParams.get('sort') || '최신순'

    let result: MockRecruitment[] = [...mockRecruitments]

    if (search.trim()) {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    result = filterByCategory(category, result)

    switch (sort) {
      case '조회 많은 순':
        result.sort((a, b) => b.views - a.views)
        break
      case '북마크 많은 순':
        result.sort((a, b) => b.bookmarks - a.bookmarks)
        break
      default:
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
    }

    return HttpResponse.json(result.map(mapToApiFormat))
  }),

  http.get('/api/v1/recruitments/:id', ({ params }) => {
    const numId = Number(params.id)

    if (Number.isNaN(numId)) {
      return HttpResponse.json({ message: 'Not Found' }, { status: 404 })
    }

    const recruitment = mockRecruitments.find((r) => r.id === numId)

    if (!recruitment) {
      return HttpResponse.json({ message: 'Not Found' }, { status: 404 })
    }

    return HttpResponse.json(mapToApiFormat(recruitment))
  }),

  http.post('/api/v1/recruitments/:id/views', ({ params }) => {
    const recruitment = mockRecruitments.find((r) => r.id === Number(params.id))

    if (!recruitment) {
      return HttpResponse.json({ message: 'Not Found' }, { status: 404 })
    }

    recruitment.views += 1
    return HttpResponse.json({ views: recruitment.views })
  }),

  ...applyRecruitmentHandler,
]
