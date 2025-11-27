import { http, HttpResponse } from 'msw'

import { getNotificationList } from './mockData'

export const notificationHandlers = [
  http.get('/api/v1/notifications', ({ request }) => {
    const url = new URL(request.url)
    const cursor =
      url.searchParams.get('cursor') || url.searchParams.get('cousor')
    const pageSize = Number(url.searchParams.get('page_size')) || 5
    const isReadParam = url.searchParams.get('is_read')
    const isRead =
      isReadParam === null ? undefined : isReadParam === 'true' ? true : false

    return HttpResponse.json(
      getNotificationList(url.origin, pageSize, cursor, isRead)
    )
  }),
]
