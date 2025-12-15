import { useInfiniteQuery, type QueryKey } from '@tanstack/react-query'

interface UseInfiniteScrollParams<T> {
  queryKey: QueryKey
  queryFn: (page: number) => Promise<T> // 페이지 번호만 받음
}

export default function useInfiniteScroll<T extends { next: string | null }>({
  queryKey,
  queryFn,
}: UseInfiniteScrollParams<T>) {
  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => queryFn(pageParam), // 여기서 변환
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined
    },
    initialPageParam: 1,
  })
}
