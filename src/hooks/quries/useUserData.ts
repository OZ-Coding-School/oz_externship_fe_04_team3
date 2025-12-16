import { getAccessTokenApi, getUserInformationApi } from '@/api/userInformation'
import { useAuthStore } from '@/store/userStore'
import { useEffect } from 'react'

//환경변수MSW 로 분기처리 진행
//api를 호출하여 store저장하는 비동기함수 로직
export const useAuth = () => {
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (import.meta.env.VITE_NODE_ENV === 'development') {
          const userData = await getUserInformationApi()
          useAuthStore.getState().setUser(userData)
        } else {
          const accessToken = await getAccessTokenApi()
          useAuthStore.getState().setAccessToken(accessToken)

          const userData = await getUserInformationApi()
          useAuthStore.getState().setUser(userData)
        }
      } catch (error) {
        console.log('비회원입니다')
        //! 실제 서버 들어오면 아래 로직 삭제.
        useAuthStore.getState().setLoginState('GUEST')
      }
    }
    initAuth()
  }, [])
}
