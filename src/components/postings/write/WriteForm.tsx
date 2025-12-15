import { Button, Select } from '@/components/common'
import { DashedBox } from '@/components/common/DashedBox'
import { DatePickerInput } from '@/components/common/date-picker/DatePickerInput'
import { MarkdownEditor } from '@/components/common/markdown'
import { Input } from '@/components/input'
import { ImageUp, Plus, TagIcon } from 'lucide-react'
import { useState } from 'react'

export default function WriteForm() {
  const [deadline, setDeadline] = useState<Date | undefined>()
  const [content, setContent] = useState('')

  const groutData = [
    { itemValue: 'study1', itemText: 'React 스터디' },
    { itemValue: 'study2', itemText: 'Vue 스터디' },
    { itemValue: 'study3', itemText: 'Angular 스터디' },
  ]
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
            data={groutData}
          />
        </div>
        <div className="flex-between flex-col gap-4 md:flex-row">
          <div className="w-full">
            <DatePickerInput
              label="공고 마감 기한"
              value={deadline}
              onChange={setDeadline}
            />
          </div>
          <div className="w-full">
            <Select
              name="대상 스터디 그룹"
              title="대상 스터디 그룹"
              placeHolder="스터디 그룹을 선택해주세요"
              data={groutData}
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
            <span>이미지 0/5개</span>
          </p>
          <MarkdownEditor value={content} onChange={setContent} />
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
          <p className="mb-2 text-sm text-gray-700">사용자 정의 태그</p>
          <DashedBox
            className="min-h-[168px] p-6"
            color="#D1D5DB"
            borderRadius={8}
          >
            <p className="flex-center absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 flex-col text-sm text-[#6B7280]">
              <ImageUp />
              <span>파일을 드래그하거나 클릭하여 업로드</span>
              <span>최대 3개 파일, 각 5MB 이하</span>
            </p>
          </DashedBox>
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
