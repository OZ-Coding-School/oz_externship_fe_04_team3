export type StudyGroupStatus = 'PENDING' | 'ONGOING' | 'ENDED'

export type StudyGroupListItem = {
  id: number
  name: string
  is_leader: boolean
  start_at: string
  end_at: string
  max_headcount: number
  current_headcount: number
  profile_img_url: string
  status: StudyGroupStatus
  lectures: Array<{
    id: number
    title: string
    instructor: string
  }>
  reviews: Array<{
    id: number
    is_mine: boolean
    star_rating: number
    content: string
  }>
}

export type StudyGroupDetail = {
  id: number
  name: string
  introduction: string
  start_at: string
  end_at: string
  max_headcount: number
  current_headcount: number
  profile_img_url: string
  status: StudyGroupStatus
  lectures: Array<{
    id: number
    title: string
    instructor: string
    thumbnail_img_url: string
    url_link: string
  }>
  members: Array<{
    id: number
    nickname: string
    is_leader: boolean
    profile_img_url: string
  }>
}
