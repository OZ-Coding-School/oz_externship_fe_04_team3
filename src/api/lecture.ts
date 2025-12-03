import type { LecturePageResponse, LecturesParams } from '@/types/lecture'
import { axiosInstance } from './axios'

export default async function getLecturesApi(
  params: LecturesParams = {}
): Promise<LecturePageResponse> {
  const { data } = await axiosInstance.get<LecturePageResponse>(
    '/v1/lectures',
    {
      params: {
        page: params.page ?? 1,
        page_size: params.page_size ?? 12,
        search: params.search,
        sort: params.sort,
        category: params.category,
      },
    }
  )
  return data
}
