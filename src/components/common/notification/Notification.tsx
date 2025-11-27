import { useState } from 'react'

import { useNotifications } from '@/hooks/quries/useNotifications'

import NotificationCard from './NotificationCard'

export default function NotificationModal() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'read'>(
    'all'
  )
  const { data, isLoading, error } = useNotifications(activeFilter)
  const alarms = data?.alarms ?? []
  const errorMessage = error ? error.message : null
  const totalCount = data?.totalCount ?? 0
  const unreadCount = data?.unreadCount ?? 0
  const readCount = totalCount - unreadCount

  const filterOptions = [
    { key: 'all' as const, label: '전체보기', count: totalCount },
    { key: 'unread' as const, label: '읽지않음', count: unreadCount },
    { key: 'read' as const, label: '읽음', count: readCount },
  ]

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 max-h-[475px] w-full overflow-hidden rounded-t-2xl border border-gray-200 bg-gray-50 pb-[45px] shadow-[0_-8px_24px_rgba(0,0,0,0.08)] md:absolute md:inset-auto md:top-10 md:right-0 md:w-[384px] md:rounded-lg md:shadow-xl">
      <div className="flex-between h-[60px] border-b border-gray-200 bg-white p-4">
        <h5>알람</h5>
        <button className="text-primary-600 text-sm">모두 읽음</button>
      </div>
      <div className="flex h-[47px] items-center border-b border-gray-100 bg-white text-sm font-medium">
        {filterOptions.map(({ key, label, count }) => {
          const isActive = activeFilter === key
          return (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`relative flex h-full flex-1 items-center justify-center border-b-2 transition-colors ${
                isActive
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="mr-1">{label}</span>
              <span>({count})</span>
            </button>
          )
        })}
      </div>
      <div className="no-scrollbar h-[323px] overflow-y-auto">
        {isLoading && (
          <div className="p-4 text-sm text-gray-500">불러오는 중...</div>
        )}
        {errorMessage && (
          <div className="p-4 text-sm text-red-500">{errorMessage}</div>
        )}
        {!isLoading &&
          !errorMessage &&
          alarms.map((alarm) => (
            <NotificationCard
              key={alarm.id}
              message={alarm.message}
              date={alarm.date}
              isRead={alarm.isRead}
              accent={alarm.accent}
              iconType={alarm.iconType}
            />
          ))}
      </div>
    </div>
  )
}
