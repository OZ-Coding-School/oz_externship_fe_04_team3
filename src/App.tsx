import AppRoutes from '@/routes/AppRoutes'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
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
