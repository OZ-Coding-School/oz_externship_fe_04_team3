import Modal from '@/components/common/Modal'
import { BookText, Check, Plus, Send, X } from 'lucide-react'
import { useState } from 'react'

export default function YeeunTest() {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  return (
    <div className="flex-center my-4 h-50 flex-col gap-4">
      <Modal
        trigger={{ text: '지원하기', variant: 'primary', icon: <Send /> }}
        title="스터디 지원"
        description="지원서 작성"
        content={<div>컨텐츠내용</div>}
        footer={{
          description: '*필수 항목입니다',
          closeButton: { text: '취소' },
          submitButton: {
            text: '지원하기',
            icon: <Send />,
          },
        }}
      />
      <Modal
        trigger={{
          text: '지원내역',
          className: 'btn-active-blue',
          icon: <BookText />,
        }}
        title="지원 현황 관리"
        description="Node.js 백엔드 개발 스터디원 구합니다 - 총 3명이 지원했습니다"
        content={
          <div
            onClick={() => setIsDetailModalOpen(!isDetailModalOpen)}
            className="border"
          >
            지원자 현황 카드 리스트
          </div>
        }
      />
      {isDetailModalOpen && (
        <Modal
          open={isDetailModalOpen}
          onOpenChange={setIsDetailModalOpen}
          title="지원자 상세 정보"
          content={<div>컨텐츠내용</div>}
          footer={{
            closeButton: { text: '거절', variant: 'danger', icon: <X /> },
            submitButton: {
              text: '승인',
              variant: 'success',
              icon: <Check />,
            },
          }}
        />
      )}
      <Modal
        trigger={{
          text: '태그검색',
          icon: <Plus />,
        }}
        title="태그 선택"
        description="공고에 추가할 태그를 선택하세요 (0/5)"
        content={<div>컨텐츠내용</div>}
        footer={{
          description: '선택된 태그가 없습니다',
          closeButton: { text: '취소' },
          submitButton: {
            text: '선택완료',
          },
        }}
      />
    </div>
  )
}
