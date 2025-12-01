import { ToastAlert } from '@/components/common'
import { toast, type ToastOptions, Slide } from 'react-toastify'

const defaultOptions: ToastOptions = {
  position: 'top-left',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
  transition: Slide,
  closeButton: false,
  icon: false,
  className: 'bg-transparent shadow-none p-0 border-none m-0',
}

export const showToast = {
  success: (title: string, message: string) => {
    toast.success(
      <ToastAlert type="success" title={title} message={message} />,
      defaultOptions
    )
  },
  warning: (title: string, message: string) => {
    toast.warning(
      <ToastAlert type="warning" title={title} message={message} />,
      defaultOptions
    )
  },
  error: (title: string, message: string) => {
    toast.error(
      <ToastAlert type="error" title={title} message={message} />,
      defaultOptions
    )
  },
}
