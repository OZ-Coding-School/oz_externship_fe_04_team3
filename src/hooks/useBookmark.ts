import { addBookmark, deleteBookmark, getBookmark } from '@/api/lecture'
import { showToast } from '@/components/common/toast/Toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useBookmark() {
  //queryClient 호출 invalidateQueries 사용 (캐시를 무효화 → 데이터 다시 fetch )
  const queryClient = useQueryClient()

  //목록 불러오기
  const getBookmarkQuery = useQuery({
    queryKey: ['bookmarkList'],
    queryFn: getBookmark,
  })

  //북마크 추가 useMutation (캐시무효화 사용되는 쿼리키)
  const addBookmarkMutation = useMutation({
    mutationFn: addBookmark,
    onSuccess: (msg) => {
      showToast.success('북마크 추가', msg)
      queryClient.invalidateQueries({ queryKey: ['lectures'] })
      queryClient.invalidateQueries({ queryKey: ['bookmarkList'] })
    },
  })

  //북마크 삭제 useMutation
  const deleteBookmarkMutation = useMutation({
    mutationFn: deleteBookmark,
    onSuccess: (msg) => {
      showToast.error('북마크 삭제', msg)
      queryClient.invalidateQueries({ queryKey: ['lectures'] })
      queryClient.invalidateQueries({ queryKey: ['bookmarkList'] })
    },
  })

  return { addBookmarkMutation, deleteBookmarkMutation, getBookmarkQuery }
}
