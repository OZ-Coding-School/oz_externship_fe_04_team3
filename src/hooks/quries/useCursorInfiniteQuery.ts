import { useInfiniteQuery, type QueryKey } from '@tanstack/react-query'

type CursorPage<T> = {
  next: string | null
  previous: string | null
  results: T[]
}

type UseCursorInfiniteQueryParams<T> = {
  queryKey: QueryKey
  // pageParam: cursor 문자열(undefined면 첫 페이지)
  queryFn: (cursor?: string) => Promise<CursorPage<T>>
  enabled?: boolean
}

const extractCursor = (nextUrl: string | null) => {
  if (!nextUrl) return undefined
  try {
    const url = new URL(nextUrl)
    return url.searchParams.get('cursor') ?? undefined
  } catch {
    return undefined
  }
}

export function useCursorInfiniteQuery<T>({
  queryKey,
  queryFn,
  enabled = true,
}: UseCursorInfiniteQueryParams<T>) {
  return useInfiniteQuery<CursorPage<T>, Error>({
    queryKey,
    queryFn: ({ pageParam }) => queryFn(pageParam as string | undefined),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => extractCursor(lastPage.next),
    enabled,
  })
}
