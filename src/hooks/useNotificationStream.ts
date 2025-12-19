import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { EventSourcePolyfill } from 'event-source-polyfill'
import { API_BASE_URL } from '@/constant/api'
import {
  alarmMapper,
  type NotificationApiItem,
} from '@/mappers/notification/mapper'
import { useAuthStore } from '@/store/userStore'

type UseNotificationStreamOptions = {
  onMessage?: (data: ReturnType<typeof alarmMapper>) => void
  onUnauthorized?: () => void
}

export function useNotificationStream(options?: UseNotificationStreamOptions) {
  const queryClient = useQueryClient()
  const accessToken = useAuthStore((s) => s.accessToken)

  useEffect(() => {
    if (!accessToken) return

    const streamUrl = `${API_BASE_URL}/v1/notifications/stream`
    const es = new EventSourcePolyfill(streamUrl, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    es.onmessage = (event: MessageEvent) => {
      try {
        const raw = JSON.parse(event.data) as NotificationApiItem
        const alarm = alarmMapper(raw)
        queryClient.invalidateQueries({ queryKey: ['notifications'] })
        options?.onMessage?.(alarm)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('SSE parse error', e)
      }
    }

    type SSEErrorEvent = Event & { status?: number }

    es.onerror = (event: SSEErrorEvent) => {
      if (event.status === 401) options?.onUnauthorized?.()
      es.close()
    }

    return () => {
      es.close()
    }
  }, [accessToken, options, queryClient])
}
