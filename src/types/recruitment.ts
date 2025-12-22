import { z } from 'zod'

export const applicationSchema = z.object({
  introduction: z
    .string()
    .min(1, '자기소개를 입력해주세요')
    .max(500, '500자 이내로 작성해주세요'),
  motivation: z
    .string()
    .min(1, '지원 동기를 입력해주세요')
    .max(500, '500자 이내로 작성해주세요'),
  goal: z
    .string()
    .min(1, '스터디 목표를 입력해주세요')
    .max(500, '500자 이내로 작성해주세요'),
  availableTime: z
    .string()
    .min(1, '가능한 시간대를 입력해주세요')
    .max(500, '500자 이내로 작성해주세요'),
  hasExperience: z.boolean(),
  experienceDescription: z.string().max(500, '500자 이내로 작성해주세요'),
})

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
  participants?: number
  deadline?: string
  studyType?: string
  authorId?: number
  author?: { id: number; name: string }
  views: number
  createdAt: string
  thumbnail?: string
  thumbnailType?: string
  tags: string[]
  bookmarks: number
  points?: number
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
