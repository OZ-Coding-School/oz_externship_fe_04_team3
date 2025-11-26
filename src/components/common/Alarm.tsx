import { useState } from 'react'

import AlarmCard from './AlarmCard'

import type { AlarmItem } from '../../types/alarm'

const mockAlarms: AlarmItem[] = [
  {
    id: '1',
    message: '스터디 지원이 접수되었어요. 승인 여부를 확인해 주세요.',
    date: '12월 1일',
    isRead: false,
    accent: 'blue',
    iconType: 'apply' as const,
  },
  {
    id: '2',
    message: '새로운 멤버가 합류했습니다. 환영 인사를 남겨보세요.',
    date: '12월 2일',
    isRead: false,
    accent: 'purple',
    iconType: 'newMember' as const,
  },
  {
    id: '3',
    message:
      '오늘 예정된 스케줄이 있어요. 준비가 잘 되고 있는지 확인해 주세요.',
    date: '12월 3일',
    isRead: true,
    accent: 'indigo',
    iconType: 'upcoming' as const,
  },
  {
    id: '4',
    message: '지원이 승인되었습니다! 스터디룸과 자료를 확인해 주세요.',
    date: '12월 4일',
    isRead: true,
    accent: 'green',
    iconType: 'approved' as const,
  },
  {
    id: '5',
    message: '기록 작성 시간이에요. 오늘 학습 내용을 남겨두세요.',
    date: '12월 5일',
    isRead: true,
    accent: 'teal',
    iconType: 'note' as const,
  },
  {
    id: '6',
    message: '요청이 거절되었습니다. 내용을 확인한 뒤 다시 시도해 주세요.',
    date: '12월 6일',
    isRead: false,
    accent: 'red',
    iconType: 'rejected' as const,
  },
  {
    id: '7',
    message: '스터디가 종료되었습니다. 마지막 기록을 남겨보세요.',
    date: '12월 7일',
    isRead: true,
    accent: 'orange',
    iconType: 'studyEnd' as const,
  },
  {
    id: '8',
    message: '오늘 진행되는 스케줄을 확인하고 참석을 준비해 주세요.',
    date: '12월 8일',
    isRead: false,
    accent: 'pink',
    iconType: 'today' as const,
  },
]

type FilterKey = 'all' | 'unread' | 'read'

export default function AlarmModal() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const unreadCount = mockAlarms.filter((alarm) => !alarm.isRead).length
  const readCount = mockAlarms.length - unreadCount

  const filterOptions = [
    { key: 'all' as FilterKey, label: '전체보기', count: mockAlarms.length },
    { key: 'unread' as FilterKey, label: '읽지않음', count: unreadCount },
    { key: 'read' as FilterKey, label: '읽음', count: readCount },
  ]

  const filteredAlarms =
    activeFilter === 'unread'
      ? mockAlarms.filter((alarm) => !alarm.isRead)
      : activeFilter === 'read'
        ? mockAlarms.filter((alarm) => alarm.isRead)
        : mockAlarms

  return (
    <div className="absolute top-10 left-20 max-h-[475px] max-w-[384px] overflow-hidden rounded-lg border border-gray-200 bg-gray-50 pb-[45px] shadow-xl">
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
        {filteredAlarms.map((alarm) => (
          <AlarmCard
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
