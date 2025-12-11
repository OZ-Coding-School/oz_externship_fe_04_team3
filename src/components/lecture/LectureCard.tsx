import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getDiscount } from '@/helpers/getDiscount'
import getRatingStarsIcon from '@/helpers/getRatingStarsIcon'
import { useBookmark } from '@/hooks/useBookmark'
import { LectureLevel } from '@/mappers/lectures/lecture'
import type { LoginState } from '@/store/loginStateStore'
import type { Lecture } from '@/types/lecture'
import { Bookmark, Plus } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../common/Button'
import { showToast } from '../common/toast/Toast'
import { Badge } from '../ui/badge'
import LectureReviewCard from './LectureReviewCard'

//강의목록 뿐만아니라, 로그인 상태도 타입으로 받기.
interface LectureCardProps extends Lecture {
  loginState: LoginState
}

export default function LectureCard(props: LectureCardProps) {
  const {
    id,
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
    loginState,
  } = props

  /* 리뷰보기 모달창 상태 */
  const [showReviewModal, setReviewShowModal] = useState(false)

  /* 북마크 커스텀 상태 */
  const { addBookmarkMutation, deleteBookmarkMutation, getBookmarkQuery } =
    useBookmark()
  const bookmarks = getBookmarkQuery.data?.results || []
  const isBookmarked = bookmarks.some((i) => i.id === id)

  const handleBookmarkClick = () => {
    /* props로 전달받은 유저 상태 분기 처리 */
    if (loginState === 'USER') {
      if (isBookmarked) {
        deleteBookmarkMutation.mutate(id)
      } else {
        addBookmarkMutation.mutate(id)
      }
    } else {
      showToast.warning('북마크 오류', '로그인유저만 북마크 기능이 가능합니다.')
    }
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardAction className="absolute z-10 justify-between px-3 py-3">
          <div className="top-2 flex flex-col gap-2">
            <Badge variant={'platform'}>{platform}</Badge>
            <Badge variant={'discount'}>
              {getDiscount(discounted_price, original_price)}% 할인
            </Badge>
          </div>
          <Button
            variant="outline"
            size={'icon'}
            className="rounded-full border-none"
            aria-label="강의 북마크하기"
            onClick={handleBookmarkClick}
          >
            <Bookmark
              className="size-[18px]"
              fill={isBookmarked ? '#EAB308' : 'none'}
              stroke={isBookmarked ? 'none' : 'gray'}
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
          {categories?.map((i) => (
            <Badge key={i.id}>{i.name}</Badge>
          ))}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{instructor}</CardDescription>
        {getRatingStarsIcon(average_rating)}
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
          className="text-primary-500"
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
            lecture={props}
          />
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
