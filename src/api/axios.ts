import { API_BASE_URL } from '@/constant/api'
import { useAuthStore } from '@/store/userStore'
import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// 모든 요청에 공통 헤더(토큰 등) 주입
axiosInstance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

// 스터디 공고 목록 조회
export const getRecruitments = async (params: {
  search?: string
  category?: string
  sort?: string
}) => {
  const queryParams = new URLSearchParams()
  if (params.search) queryParams.append('search', params.search)
  if (params.category) queryParams.append('category', params.category)
  if (params.sort) queryParams.append('sort', params.sort)

  const response = await axiosInstance.get(
    `/api/recruitments?${queryParams.toString()}`
  )
  // 서버 응답이 배열인지 확인하고, 배열이 아니면 빈 배열 반환
  return Array.isArray(response.data)
    ? response.data
    : response.data?.data || []
}
