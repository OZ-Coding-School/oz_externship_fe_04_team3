export type RecruitmentApiItem = {
  uuid: string
  title: string
  thumbnail_img_url: string
  expected_headcount: number
  close_at: string
  views_count: number
  bookmark_count: number
  lectures: { id: number; title: string; instructor: string }[]
  tags: { id: number; name: string }[]
}

export type RecruitmentPageResponse = {
  count: number
  next: string | null
  previous: string | null
  results: RecruitmentApiItem[]
}

export type ManageRecruitment = {
  uuid: string
  title: string
  thumbnailImgUrl: string
  expectedHeadcount: number
  closeAt: string
  viewsCount: number
  bookmarkCount: number
  lectures: { id: number; title: string; instructor: string }[]
  tags: { id: number; name: string }[]
  isClosed: boolean
}
