import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LectureLevel } from '@/mappers/lectures/lecture'
import type { Lecture } from '@/types/lecture'
import { Bookmark, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { Button } from '../common/Button'
import { Badge } from '../ui/badge'

export default function LectureCard(lecture: Lecture) {
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

  /* 북마크 및 리뷰보기 모달창 상태 */
  const [isBookMarked, setIsBookMarked] = useState(false)
  const [showReviewModal, setReviewShowModal] = useState(false)
  console.log(`showReviewModal ${showReviewModal}`)
  useEffect(() => {
    console.log(isBookMarked)
  }, [isBookMarked])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardAction className="absolute z-10 justify-between px-3 py-3">
          <div className="top-2 flex flex-col gap-2">
            <Badge variant={'platform'}>{platform}</Badge>
            {/* 할인율계산은 추후 헬퍼함수를 통해 구현할 예정 */}
            <Badge variant={'discount'}>32% 할인</Badge>
          </div>
          <Button
            variant="outline"
            size={'icon'}
            className="rounded-full border-none"
            aria-label="강의 북마크하기"
            onClick={() => setIsBookMarked(!isBookMarked)}
          >
            <Bookmark
              className="size-[18px]"
              fill={isBookMarked ? '#EAB308' : 'none'}
              stroke={isBookMarked ? 'none' : 'gray'}
            />
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
          <Badge variant={'success'}>{LectureLevel[difficulty]}</Badge>
          {categories.map((i) => (
            <Badge key={i.id}>{i.name}</Badge>
          ))}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{instructor}</CardDescription>
        <div className="flex items-center gap-2">
          <div className="star-rating flex">
            <FaStar size={20} fill="#FACC15"></FaStar>
            <FaStar size={20} fill="#FACC15"></FaStar>
            <FaStar size={20} fill="#FACC15"></FaStar>
            <FaStarHalfAlt size={20} fill="#FACC15"></FaStarHalfAlt>
            <FaRegStar size={20} fill="#FACC15" />
          </div>
          <p className="text-sm font-medium">{average_rating}</p>
        </div>
        <div className="Card-Content-price flex items-center gap-2">
          <h4>₩{discounted_price.toLocaleString('ko-KR')}</h4>
          <h6 className="text-sm text-gray-400 line-through">
            ₩{original_price.toLocaleString('ko-KR')}
          </h6>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant={'ghost'}
          aria-label={`${title} 리뷰 페이지로 이동`}
          onClick={() => setReviewShowModal(!showReviewModal)}
        >
          <Plus size={14} />
          리뷰 보러 가기
        </Button>
        {showReviewModal && (
          <LectureReviewCard
            open={showReviewModal}
            setOpen={setReviewShowModal}
            lectures={lecture}
          ></LectureReviewCard>
        )}
        <Button
          aria-label={`${title} 강의 페이지로 이동`}
          onClick={() => {
            window.open(url_link, '_blank')
          }}
        >
          강의보러가기
        </Button>
      </CardFooter>
    </Card>
  )
}
