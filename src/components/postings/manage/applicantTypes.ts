import type { ApplicantStatus } from './applicantStatus'

// 리스트용 공통 타입
export type Applicant = {
  id: string
  name: string
  gender: string
  status: ApplicantStatus
  appliedAt: string
  availableTime: string
  hasExperience: boolean
  thumbnail?: string
}

// 상세보기용 확장 타입
export type ApplicantDetail = Applicant & {
  selfIntro: string
  motivation: string
  goal: string
  experienceDetail: string
}
