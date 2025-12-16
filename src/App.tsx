import AppRoutes from '@/routes/AppRoutes'
import { ToastContainer } from 'react-toastify'
import { useAuth } from './hooks/useAuth'

function App() {
  return (
    <>
      {/* 토큰으로 회원,비회원 확인 */}
      {useAuth()}
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        icon={false}
        closeButton={false}
      />
    </>
  )
}
export default App
