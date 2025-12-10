import type {
  ManageRecruitment,
  MyRecruitmentApiItem,
} from '@/types/myRecruitment'

export const mapRecruitment = (
  item: MyRecruitmentApiItem
): ManageRecruitment => ({
  uuid: item.uuid,
  title: item.title,
  thumbnailImgUrl: item.thumbnail_img_url || '',
  expectedHeadcount: item.expected_headcount,
  closeAt: item.close_at,
  viewsCount: item.views_count,
  bookmarkCount: item.bookmark_count,
  lectures: item.lectures ?? [],
  tags: item.tags ?? [],
  isClosed: new Date(item.close_at).getTime() <= Date.now(),
})
