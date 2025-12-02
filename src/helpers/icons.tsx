import {
  CalendarCheck,
  CalendarDays,
  CalendarRange,
  Check,
  FileSignature,
  UserPlus,
  UsersRound,
  X,
} from 'lucide-react'

import type { AlarmIconType } from '@/types/alarm'
import type { JSX } from 'react'

const iconByType: Record<AlarmIconType, JSX.Element> = {
  apply: <UserPlus size={16} />,
  approved: <Check size={16} />,
  rejected: <X size={16} />,
  newMember: <UsersRound size={16} />,
  studyEnd: <CalendarCheck size={16} />,
  upcoming: <CalendarRange size={16} />,
  today: <CalendarDays size={16} />,
  note: <FileSignature size={16} />,
}

export const getTypeIcon = (iconType: AlarmIconType) =>
  iconByType[iconType] ?? iconByType.apply
