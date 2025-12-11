import { addBookmark, deleteBookmark, getBookmark } from '@/api/lecture'
import { showToast } from '@/components/common/toast/Toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
/* 북마크 처리 커스텀 리액트쿼리 (로그인상태 boolean) */
export function useBookmark(isLoggedIn: boolean) {
  //queryClient 호출 invalidateQueries 사용 (캐시를 무효화 → 데이터 다시 fetch )
  const queryClient = useQueryClient()

  //목록 불러오기
  const getBookmarkQuery = useQuery({
    queryKey: ['bookmarkList'],
    queryFn: getBookmark,
    enabled: isLoggedIn,
  })

  //북마크 추가 useMutation (캐시무효화 사용되는 쿼리키)
  const addBookmarkMutation = useMutation({
    mutationFn: addBookmark,
    onSuccess: (msg) => {
      showToast.success('북마크 추가', msg)
      queryClient.invalidateQueries({ queryKey: ['bookmarkList'] })
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 400) {
        showToast.error('잘못된 접근', 'lecture_id 필드는 필수 항목입니다')
      } else if (error.response?.status === 401) {
        showToast.error('인증오류', '다시 로그인 해주세요')
      } else if (error.response?.status === 404) {
        showToast.error('오류', '강의를 찾을 수 없습니다')
      } else {
        showToast.error('오류', '북마크 삭제 중 오류가 발생했습니다')
      }
    },
  })

  //북마크 삭제 useMutation
  const deleteBookmarkMutation = useMutation({
    mutationFn: deleteBookmark,
    onSuccess: (msg) => {
      showToast.warning('북마크 삭제', msg)
      queryClient.invalidateQueries({ queryKey: ['bookmarkList'] })
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        showToast.error('인증오류', '다시 로그인 해주세요')
      } else if (error.response?.status === 404) {
        showToast.error('오류', '북마크 정보를 찾을 수 없습니다.')
      } else {
        showToast.error('오류', '북마크 삭제 중 오류가 발생했습니다')
      }
    },
  })

  return { addBookmarkMutation, deleteBookmarkMutation, getBookmarkQuery }
}
