import { Button, Select } from '@/components/common'
import { DashedBox } from '@/components/common/DashedBox'
import { DatePickerInput } from '@/components/common/date-picker/DatePickerInput'
import { MarkdownEditor } from '@/components/common/markdown'
import { Input } from '@/components/input'
import { Plus, TagIcon } from 'lucide-react'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getStudyGroupDetail, getStudyGroups } from '@/api/studyGroup'
import { getPresignedUrl, uploadToPresigned } from '@/api/uploads'
import { showToast } from '@/components/common/toast/Toast'
import {
  FileUploader,
  type UploadedFile,
} from '@/components/common/uploader/FileUploader'

export default function WriteForm() {
  const [deadline, setDeadline] = useState<Date | undefined>()
  const [content, setContent] = useState('')
  const [imageCount, setImageCount] = useState(0)
  const [imageUrls, setImageUrls] = useState<string[]>([])
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

  const headcountOptions =
    remainingHeadcount > 0
      ? Array.from({ length: remainingHeadcount }, (_, idx) => {
          const val = idx + 1
          return { itemValue: String(val), itemText: `${val}명` }
        })
      : []
  return (
    <form className="flex flex-col gap-8">
      <section className="flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-8">
        <h3 className="text-xl">기본정보</h3>
        <div>
          <Input
            className=""
            label="공고 제목"
            required
            placeholder="예: React 스터디 함께하실 분을 찾습니다!"
          />
        </div>
        <div>
          <Select
            name="대상 스터디 그룹"
            title="대상 스터디 그룹"
            placeHolder="스터디 그룹을 선택해주세요"
            required
            data={groupOptions}
            value={studyGroupId}
            onValueChange={(val) => {
              setStudyGroupId(val)
              setExpectedHeadcount('')
            }}
          />
        </div>
        <div className="flex-between flex-col gap-4 md:flex-row">
          <div className="w-full">
            <DatePickerInput
              label="공고 마감 기한"
              value={deadline}
              onChange={(next) => {
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
              }}
              required
            />
          </div>
          <div className="w-full">
            <Select
              name="예상 모집 인원"
              title="예상 모집 인원"
              placeHolder={
                studyGroupId
                  ? remainingHeadcount > 0
                    ? '모집 인원을 선택해주세요'
                    : '모집 가능한 인원이 없습니다'
                  : '스터디 그룹을 먼저 선택해주세요'
              }
              required
              data={headcountOptions}
              value={expectedHeadcount}
              disabled={!studyGroupId || headcountOptions.length === 0}
              onValueChange={setExpectedHeadcount}
            />
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-8">
        <h3 className="text-xl">공고내용</h3>
        <div>
          <p className="mb-2 text-sm text-gray-700">
            스터디 그룹 소개 <span className="ml-1 text-red-500">*</span>
          </p>
          <p className="flex-between mb-2 gap-4 text-sm text-gray-500">
            <span>마크다운 문법을 사용할 수 있습니다</span>
            <span>이미지 {imageCount}/5개</span>
          </p>
          <MarkdownEditor
            value={content}
            onChange={setContent}
            onImageCountChange={setImageCount}
            allowImageDrop
            onUploadImage={async (file) => {
              const ext = file.name.split('.').pop() ?? 'png'
              const presigned = await getPresignedUrl({
                type: 'RECRUITMENT_IMAGE',
                content_type: file.type,
                file_name: file.name.replace(`.${ext}`, ''),
                file_ext: ext,
              })
              // TODO: 백엔드 연동 시 presigned upload_url로 PUT 업로드 재활성화
              // await uploadToPresigned(presigned.upload_url, file, presigned.headers)
              return presigned.file_url
            }}
          />
        </div>
      </section>
      <section className="flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-8">
        <h3 className="text-xl">추가정보</h3>
        <div>
          <Input
            className=""
            label="예상 결제 비용"
            placeholder="미입력시 강의 비용 자동 계산"
          />
        </div>
        <div>
          <p className="flex-between mb-2 text-sm text-gray-700">
            사용자 정의 태그
            <Button variant={'primary'} type="button">
              <Plus className="h-6 w-6" />
              태그 추가
            </Button>
          </p>
          <DashedBox
            className="min-h-[106px] p-6"
            color="#D1D5DB"
            borderRadius={8}
          >
            <p className="flex-center absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 flex-col text-sm text-[#6B7280]">
              <TagIcon className="-scale-x-100" />
              <span>선택된 태그가 없습니다</span>
              <span className="text-[12px]">
                태그 검색 버튼을 클릭해서 태그를 추가해보세요
              </span>
            </p>
          </DashedBox>
          <span className="text-sm text-gray-700">
            태그는 최대 5개까지 선택할 수 있습니다 (0/5)
          </span>
        </div>

        <div>
          <p className="mb-2 text-sm text-gray-700">
            참고 파일 업로드 (선택사항)
          </p>
          <FileUploader
            files={uploadedFiles}
            onChange={setUploadedFiles}
            maxCount={3}
            maxSize={5 * 1024 * 1024}
            onUploadFile={async (file) => {
              const ext = file.name.split('.').pop() ?? 'dat'
              const presigned = await getPresignedUrl({
                type: 'RECRUITMENT_ATTACHMENT',
                content_type: file.type || 'application/octet-stream',
                file_name: file.name.replace(`.${ext}`, ''),
                file_ext: ext,
              })
              // TODO: 백엔드 연동 시 presigned upload_url로 PUT 업로드 재활성화
              // await uploadToPresigned(presigned.upload_url, file, presigned.headers)
              return presigned.file_url
            }}
          />
        </div>
      </section>
      <section className="my-8 flex justify-end gap-4 border-t border-gray-200 pt-[25px]">
        <Button variant="outline" type="button" className="px-6 py-3">
          취소
        </Button>
        <Button variant="primary" type="submit" className="px-6 py-3">
          공고 등록
        </Button>
      </section>
    </form>
  )
}
