import { http, HttpResponse } from 'msw'
import recruitmentData from '../../data/recruitmentList.json'

export const recruitmentCreateHandler = [
  http.post('/api/v1/recruitments', async ({ request }) => {
    const body = (await request.json()) as Record<string, any>

    const requiredFields: Array<{ key: string; type: 'number' | 'string' }> = [
      { key: 'study_group', type: 'number' },
      { key: 'title', type: 'string' },
      { key: 'content', type: 'string' },
      { key: 'expected_headcount', type: 'number' },
      { key: 'close_at', type: 'string' },
    ]

    const missing = requiredFields.find(({ key, type }) => {
      const val = body[key]
      if (val === undefined || val === null) return true
      return typeof val !== type
    })

    if (missing) {
      return HttpResponse.json(
        { message: `invalid or missing field: ${missing.key}` },
        { status: 400 }
      )
    }

    const newRecruitment = {
      uuid: `uuid-${Date.now()}`,
      title: body.title,
      thumbnail_img_url:
        body.image_urls?.[0] ?? 'https://picsum.photos/seed/new/400/240',
      expected_headcount: body.expected_headcount,
      close_at: body.close_at,
      views_count: 0,
      bookmark_count: 0,
      lectures: body.lectures ?? [],
      tags: (body.tags ?? []).map((id: number, idx: number) => ({
        id,
        name: `태그${idx + 1}`,
      })),
    }

    recruitmentData.results.unshift(newRecruitment)
    recruitmentData.count += 1

    return HttpResponse.json(newRecruitment, { status: 201 })
  }),
]
