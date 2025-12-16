import { API_BASE_URL } from '@/constant/api'
import { useAuthStore } from '@/store/userStore'
import axios from 'axios'
import { getAccessTokenApi } from './userInformation'

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

// 응답처리 401에러시 리프레쉬토큰 재발급
// 재발급 받고 다시 요청헤더에 넣기.

axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    const originalRequest = error.config //에러헤더
    const status = error.respone?.status //에러응답코드

    if (status === 401) {
      try {
        const access_token = await getAccessTokenApi()
        useAuthStore.getState().setAccessToken(access_token)
        originalRequest.headers.Authorization = `Bearer ${access_token}`
        return axiosInstance(originalRequest) //헤더에 토큰 다시 넣어서 재요청
      } catch (refreshError) {
        useAuthStore.getState().clearAuth()
        //갱신 실패시, 로그인 페이지 이동
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login'
        }
        return Promise.reject(refreshError)
      }
    }
  }
)

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
