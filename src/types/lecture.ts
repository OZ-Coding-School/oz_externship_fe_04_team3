export type Lecture = {
  id: number
  title: string
  instructor: string
  original_price: number
  discounted_price: number //디폴트가격으로 설정됨
  difficulty: 'EASY' | 'NORMAL' | 'HARD' //난이도,UI설정은 아직 미정
  thumbnail_img_url: string
  average_rating: string
  platform: 'UDEMY' | 'INFLEARN'
  url_link: string
  categories: Category[]
  reviews: Review[]
}

type Category = {
  id: number
  name: string
  created_at: string
  updated_at: string
}

type Review = {
  id: number
  rating: number
  content: string
  created_at: string
}

export type LecturePageResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Lecture[]
}
