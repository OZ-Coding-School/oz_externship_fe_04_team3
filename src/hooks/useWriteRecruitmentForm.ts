import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { getStudyGroupDetail, getStudyGroups } from '@/api/studyGroup'
import { getPresignedUrl, uploadToPresigned } from '@/api/uploads'
import { showToast } from '@/components/common/toast/Toast'
import { axiosInstance } from '@/api/axios'
import type { UploadedFile } from '@/components/common/uploader/FileUploader'

const formatCloseAt = (date: Date) => {
  // 로컬 타임존 기준으로 00:00:00.000 시각을 ISO+오프셋 형태로 생성
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const offsetMin = -new Date().getTimezoneOffset()
  const sign = offsetMin >= 0 ? '+' : '-'
  const pad = (n: number) => String(Math.abs(n)).padStart(2, '0')
  const hhOffset = pad(Math.floor(Math.abs(offsetMin) / 60))
  const mmOffset = pad(Math.abs(offsetMin) % 60)
  return `${yyyy}-${mm}-${dd}T00:00:00.000${sign}${hhOffset}:${mmOffset}`
}

const RecruitmentPayloadSchema = z.object({
  study_group: z.number().int().positive(),
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
  expected_headcount: z.number().int().positive(),
  close_at: z.string().min(1),
  estimated_fee: z.number().int().nonnegative(),
  tags: z.array(z.number().int()).optional(),
  image_urls: z.array(z.string().url()).max(5).optional(),
  files: z
    .array(
      z.object({
        file_name: z.string().min(1),
        file_url: z.string().url(),
      })
    )
    .optional(),
})

export function useWriteRecruitmentForm() {
  const navigate = useNavigate()
  const [deadline, setDeadline] = useState<Date | undefined>()
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [estimatedFee, setEstimatedFee] = useState('')
  const [imageCount, setImageCount] = useState(0)
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [tagIds, setTagIds] = useState<number[]>([])
  const [studyGroupId, setStudyGroupId] = useState<string>('')
  const [expectedHeadcount, setExpectedHeadcount] = useState<string>('')
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const { data: studyGroups = [] } = useQuery({
    queryKey: ['study-groups'],
    queryFn: getStudyGroups,
  })

  const filteredGroups = studyGroups.filter(
    (g) => g.is_leader && g.status !== 'ENDED'
  )

  const groupOptions = filteredGroups.map((g) => ({
    itemValue: String(g.id),
    itemText: g.name,
  }))

  const { data: groupDetail } = useQuery({
    queryKey: ['study-group-detail', studyGroupId],
    queryFn: () => getStudyGroupDetail(studyGroupId),
    enabled: !!studyGroupId,
  })

  const remainingHeadcount = groupDetail
    ? Math.max(0, groupDetail.max_headcount - groupDetail.current_headcount)
    : 0

  const headcountOptions = useMemo(() => {
    if (remainingHeadcount <= 0) return []
    return Array.from({ length: remainingHeadcount }, (_, idx) => {
      const val = idx + 1
      return { itemValue: String(val), itemText: `${val}명` }
    })
  }, [remainingHeadcount])

  const handleDeadlineChange = (next: Date | undefined) => {
    if (next && groupDetail?.end_at) {
      const end = new Date(groupDetail.end_at).getTime()
      const sel = next.getTime()
      if (sel > end) {
        showToast.error(
          '마감일 설정 오류',
          `스터디 종료일(${groupDetail.end_at}) 이후로는 설정할 수 없습니다.`
        )
        return
      }
    }
    setDeadline(next)
  }

  const onUploadImage = async (file: File) => {
    const ext = (file.name.split('.').pop() ?? 'png').toLowerCase()
    const contentType = file.type || 'application/octet-stream'
    const presigned = await getPresignedUrl({
      type: 'RECRUITMENT_IMAGE',
      content_type: contentType,
      file_name: file.name, // 확장자 포함 원본 이름 그대로 전송
      file_ext: ext,
    })
    await uploadToPresigned(presigned.upload_url, file, presigned.headers)
    setImageUrls((prev) => [...prev, presigned.file_url])
    return presigned.file_url
  }

  const onUploadFile = async (file: File) => {
    const ext = (file.name.split('.').pop() ?? 'dat').toLowerCase()
    const contentType = file.type || 'application/octet-stream'
    const presigned = await getPresignedUrl({
      type: 'RECRUITMENT_ATTACHMENT',
      content_type: contentType,
      file_name: file.name, // 확장자 포함 원본 이름 그대로 전송
      file_ext: ext,
    })
    await uploadToPresigned(presigned.upload_url, file, presigned.headers)
    return { previewUrl: presigned.file_url, key: presigned.key }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (
      !studyGroupId ||
      !expectedHeadcount ||
      !deadline ||
      !title ||
      !content ||
      estimatedFee === ''
    ) {
      showToast.warning('입력값 확인', '필수 항목을 모두 입력해주세요.')
      return
    }

    const payload = {
      study_group: Number(studyGroupId),
      title,
      content,
      expected_headcount: Number(expectedHeadcount),
      close_at: formatCloseAt(deadline),
      estimated_fee: Number(estimatedFee),
      tags: tagIds.length ? tagIds : undefined,
      image_urls: imageUrls,
      files: uploadedFiles.map((f) => ({
        file_name: f.name, // 확장자 포함 원본 이름
        file_url: f.url, // presigned 응답의 file_url(전체 URL)
      })),
    }

    const parsed = RecruitmentPayloadSchema.safeParse(payload)
    if (!parsed.success) {
      const message =
        parsed.error.issues[0]?.message ?? '입력값을 다시 확인해주세요.'
      showToast.error('검증 실패', message)
      return
    }

    try {
      await axiosInstance.post('/v1/recruitments', parsed.data)
      showToast.success('공고 등록', '공고가 등록되었습니다.')
      navigate('/manage')
    } catch (err) {
      showToast.error('공고 등록 실패', (err as Error)?.message ?? '')
    }
  }

  const state = {
    deadline,
    content,
    title,
    estimatedFee,
    imageCount,
    studyGroupId,
    expectedHeadcount,
    uploadedFiles,
    tagIds,
    imageUrls,
  }

  const actions = {
    handleDeadlineChange,
    setContent,
    setTitle,
    setEstimatedFee,
    setImageCount,
    setStudyGroupId,
    setExpectedHeadcount,
    setUploadedFiles,
    setTagIds,
    onUploadImage,
    onUploadFile,
    handleSubmit,
  }

  const options = useMemo(
    () => ({
      groupOptions,
      headcountOptions,
      remainingHeadcount,
      groupDetail,
    }),
    [groupOptions, headcountOptions, remainingHeadcount, groupDetail]
  )

  return { state, actions, options }
}
