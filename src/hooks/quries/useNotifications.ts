import { useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import { axiosInstance } from '@/api/axios'
import {
  alarmMapper,
  type NotificationListResponse,
} from '@/mappers/notification/mapper'
import type { AlarmItem } from '@/types/alarm'
import { useCursorInfiniteQuery } from './useCursorInfiniteQuery'

type FilterKey = 'all' | 'unread' | 'read'

// 알림 목록을 가져와서 AlarmItem 배열로 변환 + 카운트 메타 반환
const fetchNotifications = async (filter: FilterKey) => {
  const isReadParam = filter === 'all' ? undefined : filter === 'read'

  try {
    const { data } = await axiosInstance.get<NotificationListResponse>(
      '/v1/notifications',
      {
        params: {
          page_size: 10,
          ...(typeof isReadParam === 'boolean' ? { is_read: isReadParam } : {}),
        },
      }
    )
    return {
      alarms: data.results.map(alarmMapper),
      totalCount: data.total_count,
      unreadCount: data.unread_count,
    }
  } catch (err) {
    if (isAxiosError(err)) {
      const detail = (
        err.response?.data as { error_detail?: string } | undefined
      )?.error_detail
      throw new Error(detail || '알림을 불러오지 못했습니다.')
    }
    throw err
  }
}

export const useNotifications = (filter: FilterKey) =>
  useCursorInfiniteQuery<AlarmItem>({
    queryKey: ['notifications', filter],
    queryFn: async (cursor) => {
      try {
        const isReadParam = filter === 'all' ? undefined : filter === 'read'
        const { data } = await axiosInstance.get<NotificationListResponse>(
          '/v1/notifications',
          {
            params: {
              page_size: 4,
              ...(typeof isReadParam === 'boolean'
                ? { is_read: isReadParam }
                : {}),
              ...(cursor ? { cursor } : {}),
            },
          }
        )
        return {
          next: data.next,
          previous: data.previous,
          results: data.results.map(alarmMapper),
        }
      } catch (err) {
        if (isAxiosError(err)) {
          const detail = (
            err.response?.data as { error_detail?: string } | undefined
          )?.error_detail
          throw new Error(detail || '알림을 불러오지 못했습니다.')
        }
        throw err
      }
    },
  })

export const useNotificationActions = () => {
  // 전체 읽기 요청
  const markAllRead = () => axiosInstance.post('/v1/notifications/read-all')
  // 개별 읽기 요청
  const markRead = (id: string | number) =>
    axiosInstance.post(`/v1/notifications/${id}/read`)

  return { markAllRead, markRead }
}
