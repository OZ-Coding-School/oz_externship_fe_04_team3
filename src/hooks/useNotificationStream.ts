import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { API_BASE_URL } from '@/constant/api'
import {
  alarmMapper,
  type NotificationApiItem,
} from '@/mappers/notification/mapper'

type UseNotificationStreamOptions = {
  onMessage?: (data: ReturnType<typeof alarmMapper>) => void
}

export function useNotificationStream(options?: UseNotificationStreamOptions) {
  const queryClient = useQueryClient()

  useEffect(() => {
    const streamUrl = `${API_BASE_URL}/v1/notifications/stream`
    const es = new EventSource(streamUrl, { withCredentials: true })

    es.onmessage = (event) => {
      try {
        const raw = JSON.parse(event.data) as NotificationApiItem
        const alarm = alarmMapper(raw)
        // 새 알림이 올 때 무한스크롤 쿼리 갱신
        queryClient.invalidateQueries({ queryKey: ['notifications'] })
        options?.onMessage?.(alarm)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('SSE parse error', e)
      }
    }

    es.onerror = () => {
      es.close()
    }

    return () => {
      es.close()
    }
  }, [options, queryClient])
}
