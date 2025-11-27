import { useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import { axiosInstance } from '@/api/axios'
import {
  alarmMapper,
  type NotificationListResponse,
} from '@/mappers/notification/mapper'
import type { AlarmItem } from '@/types/alarm'

// 알림 목록을 가져와서 AlarmItem 배열로 변환
const fetchNotifications = async (): Promise<AlarmItem[]> => {
  try {
    const { data } = await axiosInstance.get<NotificationListResponse>(
      '/api/v1/notifications',
      { params: { page_size: 10 } }
    )
    return data.results.map(alarmMapper)
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

export const useNotifications = () =>
  useQuery<AlarmItem[], Error>({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    // 컴포넌트에서 초기 렌더 시 map 오류가 나지 않도록 빈 배열을 기본값으로 둔다
    initialData: [] as AlarmItem[],
  })
