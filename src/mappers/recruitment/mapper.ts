import type { ManageRecruitment, RecruitmentApiItem } from '@/types/recruitment'

export const mapRecruitment = (
  item: RecruitmentApiItem
): ManageRecruitment => ({
  uuid: item.uuid,
  title: item.title,
  thumbnailImgUrl: item.thumbnail_img_url,
  expectedHeadcount: item.expected_headcount,
  closeAt: item.close_at,
  viewsCount: item.views_count,
  bookmarkCount: item.bookmark_count,
  lectures: item.lectures,
  tags: item.tags,
  isClosed: new Date(item.close_at).getTime() <= Date.now(),
})
