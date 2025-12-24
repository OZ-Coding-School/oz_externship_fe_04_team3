import { getUserRecommendsLecturesApi } from '@/api/lecture'
import { useAuthStore } from '@/store/userStore'
import { useQuery } from '@tanstack/react-query'
import { Badge } from '../common/badge'
import LectureCard from './LectureCard'
import LectureCardSkeleton from './LectureCardSkeleton'

export default function LectureRecommendSection() {
  /* 추천 강의 불러오기 */
  const { user, loginState } = useAuthStore()
  const { isLoading, data } = useQuery({
    queryKey: ['lecture-recommend'],
    queryFn: async () => {
      console.time('API 호출 시간')
      const data = await getUserRecommendsLecturesApi()
      console.timeEnd('API 호출 시간')
      return data
    },
    enabled: loginState === 'USER',
  })
  return (
    <div className="border-primary-200 rounded-xl border bg-linear-to-r from-[#FFF7ED] to-[#FEFCE8] px-4 py-8 md:p-8">
      <div>
        <div className="section-header flex items-baseline gap-2">
          <h3 className="pb-6 text-left text-balance text-gray-900">
            {user?.name} 님을 위한 추천 강의
          </h3>
          <Badge variant={'danger'}>개인맞춤</Badge>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <LectureCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data?.map((i) => (
              <LectureCard key={i.id} {...i}></LectureCard>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
