import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@radix-ui/react-select'
import { Button } from '../common/Button'
import { Badge } from '../ui/badge'

type Categories = {
  id: number
  name: string
}
type LectureCardProps = {
  id: number
  title: string
  instructor: string
  thumbnailUrl: string
  categories: Categories[]
  difficulty: string
  originalPrice: number
  discountedPrice: number
  platform: 'Udemy' | 'Inflearn'
  rating: number
  lectureLink: string
  isBookmarked?: boolean // 북마크 상태 (옵션)
}
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
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <Badge>기본</Badge>
        <Badge variant="primary">주요</Badge>
        <Badge variant="danger">위험</Badge>
        <Badge variant="success">성공</Badge>
      </CardContent>
      <Separator className="my-4"></Separator>
      <CardFooter>
        <div>리뷰 보러 가기</div>
        <Button>강의보러가기</Button>
      </CardFooter>
    </Card>
  )
}
