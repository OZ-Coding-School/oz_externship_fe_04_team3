import LectureCard from '@/components/lecture/LectureCard'

export default function YeeunTest() {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  return (
    <div className="flex gap-3">
      <LectureCard></LectureCard>
    </div>
  )
}
