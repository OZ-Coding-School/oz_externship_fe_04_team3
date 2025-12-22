import { z } from 'zod'
import { applicationSchema } from '@/schemas/applicationSchema'

export type ApplicationFormData = z.infer<typeof applicationSchema>

export interface RecruitmentApiItem {
  id: number
  title: string
  content?: string
  max_participants?: number
  deadline?: string
  study_type?: string
  views?: number
  created_at: string
  author?: {
    id: number
    name: string
  }
  thumbnail?: string
  thumbnailType?: string
  tags?: string[]
  participants?: number
  bookmarks?: number
  lecture_list?: Array<{
    id: number
    title: string
    instructor: string
    thumbnail: string
    price: number
    link: string
  }>
  attachments?: Array<{
    id: string
    name: string
    url: string
    size?: number
    type?: string
  }>
}

export interface Recruitment {
  id: number
  title: string
  content: string
  maxParticipants: number
  deadline?: string
  studyType?: string
  authorId?: number
  views: number
  createdAt: string
  thumbnail?: string
  thumbnailType?: string
  tags: string[]
  bookmarks: number
  lectureList?: Array<{
    id: number
    title: string
    instructor: string
    thumbnail: string
    price: number
    link: string
  }>
  attachments?: Array<{
    id: string
    name: string
    url: string
    size?: number
    type?: string
  }>
}
