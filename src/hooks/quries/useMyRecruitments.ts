import getRecruitmentsApi from '@/api/recruitment'
import { mapRecruitment } from '@/mappers/myRecruitment/mapper'
import type {
  ManageRecruitment,
  MyRecruitmentParams,
} from '@/types/myRecruitment'
import { useQuery } from '@tanstack/react-query'

const CACHE_STALE_TIME = 1000 * 60 * 5 // 5분 동안 신선한 데이터로 간주
const CACHE_GC_TIME = 1000 * 60 * 15 // 15분 후 가비지 컬렉션

export const useRecruitments = ({
  page = 1,
  page_size = 10,
  search,
  sort,
  tags,
  is_closed,
}: MyRecruitmentParams = {}) => {
  // 1) 모집중 카운트용 (is_closed=false)
  const openCountQuery = useQuery<number>({
    queryKey: ['manageRecruitments-open-count'],
    queryFn: async () => {
      const data = await getRecruitmentsApi({
        is_closed: false,
      })
      return data?.count ?? 0
    },
    staleTime: CACHE_STALE_TIME,
    gcTime: CACHE_GC_TIME,
  })

  // 2) 마감 카운트용 (is_closed=true)
  const closedCountQuery = useQuery<number>({
    queryKey: ['manageRecruitments-closed-count'],
    queryFn: async () => {
      const data = await getRecruitmentsApi({
        is_closed: true,
      })
      return data?.count ?? 0
    },
    staleTime: CACHE_STALE_TIME,
    gcTime: CACHE_GC_TIME,
  })

  // 3) 리스트용 (is_closed 전달하지 않음: 전체, 혹은 외부에서 넘긴 상태)
  const listQuery = useQuery<ManageRecruitment[]>({
    queryKey: [
      'manageRecruitments',
      { page, page_size, search, sort, tags, is_closed },
    ],
    queryFn: async () => {
      const data = await getRecruitmentsApi({
        page,
        page_size,
        search,
        sort,
        tags,
        is_closed,
      })
      const postings = (data?.results ?? []).map(mapRecruitment)
      return postings
    },
    staleTime: CACHE_STALE_TIME,
    gcTime: CACHE_GC_TIME,
    enabled:
      openCountQuery.status !== 'error' && closedCountQuery.status !== 'error',
  })

  return {
    data: listQuery.data,
    totalCount: (openCountQuery.data ?? 0) + (closedCountQuery.data ?? 0),
    openCount: openCountQuery.data ?? 0,
    closedCount: closedCountQuery.data ?? 0,
    isLoading:
      listQuery.isLoading ||
      openCountQuery.isLoading ||
      closedCountQuery.isLoading,
    error: listQuery.error || openCountQuery.error || closedCountQuery.error,
  }
}
