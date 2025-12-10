import { getTypeIcon } from '@/helpers/icons'

type ManageDashboardProps = {
  totalCount: number
  openCount: number
  closedCount: number
}

export default function ManageDashboard({
  totalCount,
  openCount,
  closedCount,
}: ManageDashboardProps) {
  const cards = [
    {
      key: 'total' as const,
      label: '전체',
      value: totalCount,
      iconColor: 'accent-gray',
    },
    {
      key: 'open' as const,
      label: '모집중',
      value: openCount,
      iconColor: 'accent-green',
    },
    {
      key: 'closed' as const,
      label: '마감됨',
      value: closedCount,
      iconColor: 'accent-red',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="flex items-center gap-4 rounded-md border border-gray-200 bg-white p-[25px]"
        >
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-md ${card.iconColor}`}
          >
            {getTypeIcon(card.key)}
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xl font-semibold text-gray-900">
              {card.value}
            </span>
            <span className="text-sm text-gray-500">{card.label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
