import { getDiscount } from '@/helpers/getDiscount'
import getRatingStarsIcon from '@/helpers/getRatingStarsIcon'
import { LectureLevel } from '@/mappers/lectures/lecture'
import type { Lecture } from '@/types/lecture'
import { Dialog, DialogContent } from '../common/Modal'
import { Badge } from '../ui/badge'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Item, ItemContent, ItemDescription, ItemTitle } from '../ui/item'

type LectureReviewCardProps = {
  open: boolean
  setOpen: (open: boolean) => void
  lecture: Lecture
}

export default function LectureReviewCard({
  open,
  setOpen,
  lecture,
}: LectureReviewCardProps) {
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
    reviews,
  } = lecture
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="m-0 p-0" showCloseButton>
        <Card className="w-full">
          <CardHeader>
            <CardAction className="absolute z-10 justify-between px-3 py-3">
              <div className="top-2 flex flex-col gap-2">
                <Badge variant={'platform'}>{platform}</Badge>
                <Badge variant={'discount'}>
                  {getDiscount(discounted_price, original_price)}% 할인
                </Badge>
              </div>
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
          <CardFooter className="flex w-full flex-col items-start gap-2">
            <CardTitle className="mb-2 text-left">리뷰보기</CardTitle>
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
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
