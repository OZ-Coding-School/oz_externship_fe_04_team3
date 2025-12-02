import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Lecture } from '@/types/lecture'
import { ArrowDown, Bookmark, Star, StarHalf } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Button } from '../common/Button'
import { Badge } from '../ui/badge'

export default function LectureCard(lecture: Lecture) {
  const navigate = useNavigate()
  const {
    title,
    instructor,
    thumbnail_img_url,
    difficulty,
    original_price,
    discounted_price,
    platform,
    average_rating,
    categories,
    url_link,
  } = lecture

  // 난이도 매핑
  const difficultyMap = {
    EASY: '초급자',
    NORMAL: '중급자',
    HARD: '고급자',
  }

  return (
    <Card className="w-full max-w-sm" onClick={() => navigate(`${url_link}`)}>
      <CardHeader>
        <CardAction className="absolute z-10 justify-between px-1 py-2">
          <div className="flex flex-col gap-2">
            <Badge variant={'primary'}>{platform}</Badge>
            {/* 할인율계산은 추후 헬퍼함수를 통해 구현할 예정 */}
            <Badge variant={'danger'}>32% 할인</Badge>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            aria-label="강의 북마크하기"
          >
            <Bookmark />
          </Button>
        </CardAction>
        <img
          src={thumbnail_img_url}
          alt={title}
          className="h-auto w-full object-cover"
          loading="lazy"
        />
      </CardHeader>
      <CardContent>
        <div className="Card-Content-badge flex gap-1">
          <Badge variant={'success'}>{difficultyMap[difficulty]}</Badge>
          {categories.map((i) => (
            <Badge key={i.id}>{i.name}</Badge>
          ))}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{instructor}</CardDescription>
        <div className="flex">
          <div className="star-rating flex">
            <div className="flex">
              <Star fill="#FACC15" strokeWidth={0} />
              <Star fill="#FACC15" strokeWidth={0} />
              <StarHalf fill="#FACC15" strokeWidth={0} />
            </div>
          </div>
          <p>{average_rating}</p>
        </div>
        <div className="Card-Content-price flex gap-2">
          <h4>₩ {discounted_price.toLocaleString('ko-KR')}</h4>
          <h4 className="text-gray-400 line-through">
            ₩ {original_price.toLocaleString('ko-KR')}
          </h4>
        </div>
      </CardContent>
      <CardFooter>
        <div
          className="text-primary-500 flex"
          onClick={() => navigate(`${url_link}`)}
        >
          <ArrowDown />
          리뷰 보러 가기
        </div>
        <Button aria-label={`${title} 강의 페이지로 이동`}>강의보러가기</Button>
      </CardFooter>
    </Card>
  )
}
