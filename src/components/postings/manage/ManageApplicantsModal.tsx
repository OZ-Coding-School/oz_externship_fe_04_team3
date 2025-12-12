import { Dialog, DialogClose, DialogContent } from '@/components/common/Modal'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { getTypeIcon } from '@/helpers/icons'
import { Button } from '@/components/common'
import { applicantStatusColor, applicantStatusLabel } from './applicantStatus'
import type { Applicant } from './applicantTypes'

type ManageApplicantsModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  recruitmentTitle: string
  totalCount: number
  applicants: Applicant[]
  onApplicantClick?: (id: string) => void
}

export default function ManageApplicantsModal({
  open,
  onOpenChange,
  recruitmentTitle,
  totalCount,
  applicants,
  onApplicantClick,
}: ManageApplicantsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="h-[80dvh] w-[calc(100%-32px)] max-w-4xl gap-0 overflow-hidden p-0 sm:max-w-max md:h-full md:max-h-[593px] md:max-w-4xl"
        showCloseButton={false}
      >
        <div className="flex-between h-[100px] gap-4 border-b border-gray-200 px-4 py-5 sm:px-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">지원현황관리</h3>
            <p className="text-sm text-gray-600">
              {recruitmentTitle} - 총 {totalCount}명이 지원했습니다
            </p>
          </div>
          <DialogClose asChild>
            {/* <button className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700">
              {getTypeIcon('rejected')}
            </button> */}
            <Button variant={'ghost'} className="h-10 w-10 rounded-full">
              {getTypeIcon('rejected')}
            </Button>
          </DialogClose>
        </div>
        <div className="grid h-[calc(80dvh-100px)] grid-cols-1 gap-3 overflow-y-auto p-4 sm:h-auto sm:p-6 md:grid-cols-2">
          {applicants.map((applicant) => (
            <div
              onClick={() => onApplicantClick?.(applicant.id)}
              className="flex cursor-pointer gap-3 rounded-lg bg-gray-100 p-4 text-left transition hover:bg-gray-200"
              key={applicant.id}
            >
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full">
                {applicant.thumbnail ? (
                  <img
                    src={applicant.thumbnail}
                    alt={applicant.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Skeleton className="h-full w-full bg-gray-400" />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex-between gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-base font-semibold">
                      {applicant.name}
                    </span>
                    <span className="text-sm text-gray-600">
                      {applicant.gender}
                    </span>
                  </div>
                  <Badge variant={applicantStatusColor[applicant.status]}>
                    {applicantStatusLabel[applicant.status]}
                  </Badge>
                </div>
                <div className="text-sm text-gray-700">
                  <div className="mb-3 flex items-center gap-1">
                    <span className="text-gray-500">지원 일시:</span>
                    <span>{applicant.appliedAt}</span>
                  </div>
                  <div className="mb-3 flex flex-col">
                    <span className="mb-1 text-[12px] font-medium text-gray-700">
                      가능한 시간대
                    </span>
                    <span className="line-clamp-2">
                      {applicant.availableTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-medium text-gray-700">
                      스터디 경험
                    </span>
                    <Badge
                      variant={applicant.hasExperience ? 'success' : 'danger'}
                    >
                      {applicant.hasExperience ? '경험 있음' : '경험 없음'}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
