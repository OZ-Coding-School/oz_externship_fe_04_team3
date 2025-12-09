import type { Lecture } from '@/types/lecture'
import { DialogClose, DialogPortal } from '@radix-ui/react-dialog'
import { Dialog, DialogContent } from '../common/Modal'
import LectureCard from './LectureCard'

type LectureReviewCardProps = {
  open: boolean
  setOpen: (open: boolean) => void
  lecture: Lecture
}

export default function LectureReviewCard({
  open,
  setOpen,
  lecture,
}: LectureReviewCardProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPortal>
        <DialogContent className="m-0 p-0">
          <DialogClose></DialogClose>
          <LectureCard {...lecture} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
