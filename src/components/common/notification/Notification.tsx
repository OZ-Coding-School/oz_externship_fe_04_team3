import { useNotifications } from '@/hooks/quries/useNotifications'

import NotificationCard from './NotificationCard'

export default function NotificationModal() {
  const { data: alarms = [], isLoading, error } = useNotifications()
  const errorMessage = error ? error.message : null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 max-h-[475px] w-full overflow-hidden rounded-t-2xl border border-gray-200 bg-gray-50 pb-[45px] shadow-[0_-8px_24px_rgba(0,0,0,0.08)] md:absolute md:inset-auto md:top-10 md:right-0 md:w-[384px] md:rounded-lg md:shadow-xl">
      <div className="flex-between h-[60px] border-b border-gray-200 bg-white p-4">
        <h5>알람</h5>
        <button className="text-primary-600 text-sm">모두 읽음</button>
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
