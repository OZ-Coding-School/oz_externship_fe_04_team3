import type { RecruitmentApiItem, Recruitment } from '@/types/recruitment'

export const mapRecruitmentDetail = (data: RecruitmentApiItem): Recruitment => {
  return {
    id: data.id,
    title: data.title,
    content: data.content ?? '',
    maxParticipants: data.max_participants ?? 0,
    deadline: data.deadline,
    studyType: data.study_type,
    authorId: data.author?.id,
    views: data.views ?? 0,
    createdAt: data.created_at,
    thumbnail: data.thumbnail,
    thumbnailType: data.thumbnailType,
    tags: data.tags ?? [],
    bookmarks: data.bookmarks ?? 0,
    lectureList: data.lecture_list,
    attachments: data.attachments,
  }
}
