export type ApplicantStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELED'

export const applicantStatusLabel: Record<ApplicantStatus, string> = {
  PENDING: '대기중',
  ACCEPTED: '승인됨',
  REJECTED: '거절됨',
  CANCELED: '취소됨',
}

export const applicantStatusColor: Record<
  ApplicantStatus,
  'primary' | 'success' | 'danger' | 'discount'
> = {
  PENDING: 'primary',
  ACCEPTED: 'success',
  REJECTED: 'danger',
  CANCELED: 'discount',
}
