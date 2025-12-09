import type { LecturePageResponse, LecturesParams } from '@/types/lecture'
import { axiosInstance } from './axios'

export default async function getLecturesApi(
  params: LecturesParams = {}
): Promise<LecturePageResponse> {
  // 객체타입 Record<키값:키밸류>
  const queryParams: Record<string, string | number> = {}

  if (params.page) queryParams.page = params.page
  if (params.page_size) queryParams.page_size = params.page_size
  if (params.search) queryParams.search = params.search
  if (params.sort) queryParams.sort = params.sort
  if (params.category) queryParams.category = params.category

  const { data } = await axiosInstance.get<LecturePageResponse>(
    '/v1/lectures',
    { params: queryParams }
  )
  return data
}
