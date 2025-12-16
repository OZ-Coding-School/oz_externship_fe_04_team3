import { getAccessTokenApi, getUserInformationApi } from '@/api/userInformation'
import { useAuthStore } from '@/store/userStore'
import { useEffect } from 'react'

export const useAuth = () => {
  useEffect(() => {
    const initAuth = async () => {
      try {
        // 1. 토큰 받기
        const accessToken = await getAccessTokenApi()
        useAuthStore.getState().setAccessToken(accessToken)

        // 2. 유저 정보 받기
        const userData = await getUserInformationApi()
        useAuthStore.getState().setUser(userData)
      } catch (error) {
        console.log('비회원입니다')
        // store는 초기값(null, 'GUEST') 유지
      }
    }

    initAuth()
  }, [])
}
