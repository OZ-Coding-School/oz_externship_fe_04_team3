import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/userStore'
import { showToast } from '@/components/common/toast/Toast'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const loginState = useAuthStore((state) => state.loginState)
  const location = useLocation()

  useEffect(() => {
    if (loginState === 'GUEST') {
      showToast.error('로그인 필요', '로그인이 필요한 페이지입니다.')
    }
  }, [loginState])

  if (loginState === 'GUEST') {
    return (
      <Navigate
        to="/recruitments"
        replace
        state={{ from: location.pathname }}
      />
    )
  }

  return children
}

export default ProtectedRoute
