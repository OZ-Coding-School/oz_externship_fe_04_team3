import { axiosInstance } from '@/api/axios'
import { API_PATHS } from '@/constant/api'
import type { UserInformation } from '@/types/userInformation'

export const getUserInformationApi = async (): Promise<UserInformation[]> => {
  const { data } = await axiosInstance.get(API_PATHS.USER.GET)
  return data
}

//리프레쉬토큰값 보내서 액세스토큰값 받아오기
export const getAccessToken = async (): Promise<string> => {
  const { data } = await axiosInstance.post<{ accessToken: string }>(
    '/api/refresh'
  )
  return data.accessToken
}
