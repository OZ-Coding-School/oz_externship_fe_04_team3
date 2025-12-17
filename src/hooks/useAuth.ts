import { getAccessTokenApi, getUserInformationApi } from '@/api/userInformation'
import { useAuthStore } from '@/store/userStore'
import { useEffect } from 'react'

export const useAuth = () => {
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (import.meta.env.VITE_NODE_ENV === 'development') {
          const userData = await getUserInformationApi()
          useAuthStore.getState().setUser(userData)
        } else {
          try {
            const accessToken = await getAccessTokenApi()
            useAuthStore.getState().setAccessToken(accessToken)
          } catch (error) {
            console.log(error, '토큰발급에러')
            return
          }
          const userData = await getUserInformationApi()
          useAuthStore.getState().setUser(userData)
        }
      } catch (error) {
        console.log(error, '비회원입니다')
      }
    }
    initAuth()
  }, [])
}
