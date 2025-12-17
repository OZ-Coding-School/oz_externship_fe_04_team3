export type ModalProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title: string
  description?: string
  content: React.ReactNode //form,card,grid등등 올 예정
  contentClassName?: string
  bodyClassName?: string
  trigger?: {
    text: string
    icon?: React.ReactNode
    className?: string
    variant?:
      | 'primary'
      | 'outline'
      | 'secondary'
      | 'danger'
      | 'success'
      | 'ghost'
  }
  footer?: {
    // 모달의 footer는 옵셔널
    description?: string
    closeButton?: {
      text: string
    }
    footerButtons: React.ReactNode
  }
}
