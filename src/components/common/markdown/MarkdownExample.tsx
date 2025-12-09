export function MarkdownExample() {
  return (
    <div className="text-custom-gray-600 border-custom-gray-200 bg-custom-gray-50 flex h-18 flex-col justify-center gap-2 border-t px-4 text-xs font-medium sm:h-12 md:h-8 md:flex-row md:items-center md:justify-start">
      <p className="font-normal">마크다운 문법을 사용할 수 있습니다.</p>
      <div className="flex flex-col gap-0.5 sm:flex-row md:gap-2">
        <div className="flex gap-2">
          <span>**굵게**</span>
          <span>*기울임*</span>
          <span>`코드`</span>
          <span>[링크](URL)</span>
        </div>
        <div className="flex gap-2">
          <span>## 제목</span>
          <span>- 목록</span>
          <span>![설명](이미지URL)</span>
        </div>
      </div>
    </div>
  )
}
