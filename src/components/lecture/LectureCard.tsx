import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/common/card'
import { getDiscount } from '@/helpers/getDiscount'
import getRatingStarsIcon from '@/helpers/getRatingStarsIcon'
import { useIsDesktop } from '@/hooks'
import { useBookmark } from '@/hooks/useBookmark'
import { LectureLevel } from '@/mappers/lectures/lecture'
import LoginStateStore from '@/store/loginStateStore'
import type { Lecture } from '@/types/lecture'
import { AnimatePresence } from 'framer-motion'
import { Bookmark, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../common/accordion'
import { Badge } from '../common/badge'
import { Button } from '../common/Button'
import { Item, ItemContent, ItemDescription, ItemTitle } from '../common/item'
import { Skeleton } from '../common/skeleton'
import { showToast } from '../common/toast/Toast'
import LectureReviewCard from './LectureReviewCard'

export default function LectureCard(lecture: Lecture) {
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
    reviews,
  } = lecture

  /* 리뷰보기 모달창 상태 */
  const [showReviewModal, setReviewShowModal] = useState(false)
  /* 로그인 분기 처리 */
  const { loginState } = LoginStateStore()
  const isLoggedIn = loginState === 'USER' ? true : false
  /* 북마크 커스텀 상태 */
  const { addBookmarkMutation, deleteBookmarkMutation, getBookmarkQuery } =
    useBookmark(isLoggedIn)

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
  const isDesktop = useIsDesktop()

  useEffect(() => {
    if (!isDesktop) {
      setReviewShowModal(false)
    }
  }, [isDesktop])
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
        {thumbnail_img_url ? (
          <img
            src={thumbnail_img_url}
            alt={title}
            className="h-auto w-full object-cover"
            loading="lazy"
          />
        ) : (
          <Skeleton></Skeleton>
        )}
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
      <CardFooter className="relative">
        {isDesktop && (
          <>
            <Button
              variant={'ghost'}
              className="text-primary-500"
              aria-label={`${title} 리뷰 페이지로 이동`}
              onClick={() => setReviewShowModal(!showReviewModal)}
            >
              <Plus size={14} />
              리뷰 보러 가기
            </Button>
            <AnimatePresence initial={false}>
              {showReviewModal ? (
                <LectureReviewCard
                  open={showReviewModal}
                  setOpen={setReviewShowModal}
                  lecture={lecture}
                />
              ) : null}
            </AnimatePresence>
          </>
        )}
        {/* 모바일 버전 */}
        {!isDesktop && (
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger
                className="text-primary-500"
                aria-label={`${title} 리뷰 페이지로 이동`}
              >
                리뷰 보러 가기
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                {reviews.length === 0 ? (
                  <Item className="w-full">
                    <ItemContent>
                      <ItemTitle>{getRatingStarsIcon(0)}</ItemTitle>
                      <ItemDescription>리뷰가 없습니다</ItemDescription>
                    </ItemContent>
                  </Item>
                ) : (
                  reviews.map((i) => (
                    <Item key={i.id} className="w-full">
                      <ItemContent>
                        <ItemTitle>{getRatingStarsIcon(i.rating)}</ItemTitle>
                        <ItemDescription>{i.content}</ItemDescription>
                      </ItemContent>
                    </Item>
                  ))
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        <Button
          className="absolute top-6 right-2"
          aria-label={`${title} 강의 페이지로 이동`}
          onClick={() => {
            window.open(url_link, '_blank')
          }}
        >
          강의 보러가기
        </Button>
      </CardFooter>
    </Card>
  )
}
