import type { StudyGroupDetail, StudyGroupListItem } from '@/types/studyGroup'
import { axiosInstance } from './axios'

export async function getStudyGroups() {
  const { data } =
    await axiosInstance.get<StudyGroupListItem[]>('/v1/study-groups')
  return data
}

export async function getStudyGroupDetail(id: number | string) {
  const { data } = await axiosInstance.get<StudyGroupDetail>(
    `/v1/study-groups/${id}`
  )
  return data
}
