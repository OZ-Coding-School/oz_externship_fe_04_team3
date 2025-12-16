import { http, HttpResponse } from 'msw'
import { mockStudyGroupDetail, mockStudyGroupList } from './mockData'

export const studyGroupHandlers = [
  http.get('/api/v1/study-groups', () => {
    return HttpResponse.json(mockStudyGroupList)
  }),
  http.get('/api/v1/study-groups/:id', ({ params }) => {
    const { id } = params
    if (String(id) === String(mockStudyGroupDetail.id)) {
      return HttpResponse.json(mockStudyGroupDetail)
    }
    const fallback = mockStudyGroupList.find((g) => String(g.id) === String(id))
    if (fallback) {
      return HttpResponse.json({
        ...mockStudyGroupDetail,
        id: fallback.id,
        name: fallback.name,
        max_headcount: fallback.max_headcount,
        current_headcount: fallback.current_headcount,
      })
    }
    return HttpResponse.json({ message: 'not found' }, { status: 404 })
  }),
]
