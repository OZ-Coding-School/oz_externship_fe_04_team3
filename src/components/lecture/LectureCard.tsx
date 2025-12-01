import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowDown, Bookmark, Star } from 'lucide-react'
import { Button } from '../common/Button'
import { Badge } from '../ui/badge'

// type Categories = {
//   id: number
//   name: string
// }
// type LectureCardProps = {
//   id: number
//   title: string
//   instructor: string
//   thumbnailUrl: string
//   categories: Categories[]
//   difficulty: string
//   originalPrice: number
//   discountedPrice: number
//   platform: 'Udemy' | 'Inflearn'
//   rating: number
//   lectureLink: string
//   isBookmarked?: boolean // 북마크 상태 (옵션)
// }
export default function LectureCard() {
  // {
  // id,
  // title,
  // instructor,
  // thumbnailUrl,
  // categories,
  // difficulty,
  // originalPrice,
  // discountedPrice,
  // platform,
  // rating,
  // lectureLink,
  // isBookmarked,
  // }: LectureCardProps
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardAction className="">
          <div className="flex flex-col gap-2">
            <Badge variant={'primary'}>Inflearn</Badge>
            <Badge variant={'danger'}>32% 할인</Badge>
          </div>
          <Button variant="outline" size="icon" className="rounded-full">
            <Bookmark />
          </Button>
        </CardAction>
        <img
          src={`https://i.pinimg.com/736x/5a/6e/f3/5a6ef30c1993b1e96dbf3837cadcd4b8.jpg`}
          alt={'예시'}
          className="object-cover"
        />
      </CardHeader>
      <CardContent>
        <Badge>초급자</Badge>
        <CardTitle>Vue.js 실전 프로젝트</CardTitle>
        <CardDescription>정뷰</CardDescription>
        <div className="flex gap-2">
          <div className="flex">
            <Star></Star>
            <Star></Star>
            <Star></Star>
            <Star></Star>
            <Star></Star>
          </div>
          <p>4.5</p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="text-primary-500 flex">
          <ArrowDown />
          리뷰 보러 가기
        </div>
        <Button>강의보러가기</Button>
      </CardFooter>
    </Card>
  )
}
