import getLecturesApi from '@/api/lecture'
import { useInfiniteQuery } from '@tanstack/react-query'

//불러온 강의목록으로 무한대 호출하는 로직(쿼리사용)
export default function useGetLectures() {
  return useInfiniteQuery({
    queryKey: ['get-lectures'],
    queryFn: ({ pageParam }) => {
      return getLecturesApi({ page: pageParam })
    },
    getNextPageParam: (last, allPages) => {
      return last.next ? allPages.length + 1 : undefined
    },
    initialPageParam: 1,
  })
}
