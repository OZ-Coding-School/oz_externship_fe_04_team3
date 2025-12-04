import WriteForm from '@/components/postings/write/WriteForm'
import WriteHeader from '@/components/postings/write/WriteHeader'

export default function Write() {
  return (
    <div className="mx-auto flex flex-col gap-6">
      <WriteHeader />
      <WriteForm />
    </div>
  )
}
