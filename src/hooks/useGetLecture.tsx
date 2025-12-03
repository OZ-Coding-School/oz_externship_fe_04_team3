import { axiosInstance } from '@/api/axios'
import type { Lecture } from '@/types/lecture'
import { useInfiniteQuery } from '@tanstack/react-query'

//강의목록응답값
interface LectureListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Lecture[]
}

//요청 params
interface FetchLecturesParams {
  page?: number
  page_size?: number
  search?: string
  sort?:
    | 'latest'
    | 'oldest'
    | 'low_price'
    | 'high_price'
    | 'high_rating'
    | 'low_rating'
  category?:
    | 'artificial-intelligence'
    | 'Applied-ai'
    | 'it-programming'
    | 'game-dev-all'
    | 'data-science'
    | 'it'
    | 'hardware'
    | 'design'
}

//강의목록 불러오는 로직
export async function fetchLectures(
  params: FetchLecturesParams = {}
): Promise<LectureListResponse> {
  const { data } = await axiosInstance.get<LectureListResponse>(
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

//불러온 강의목록으로 무한대 호출하는 로직(쿼리사용)
export default function useGetLectures() {
  return useInfiniteQuery({
    //query name으로 캐싱 관리
    queryKey: ['get-lectures'],
    queryFn: ({ pageParam }) => {
      return fetchLectures({ page: pageParam })
    },
    // lastPage는 "방금" 호출한 결과값 (객체 형태) → { count, next, previous, results: [] } 객체 형태
    // allPages는 지금까지 호출한 "모든" 응답의 배열 [page1, page2, page3, ...]
    //allPages는 useInfiniteQuery가 자동으로 관리하는 누적 배열임.
    // next가 존재하면 다음 페이지 번호 반환 (allPages.length + 1)
    // next가 null이면 undefined 반환 → 무한스크롤 종료
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined
      // return 값이 다음 호출의 pageParam이 됨
    },
    //첫호출 페이지번호 초기화
    initialPageParam: 1,
  })
}
