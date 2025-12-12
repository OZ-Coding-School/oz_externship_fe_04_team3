export default function YeeunTest() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">테스트 콘텐츠 - 스크롤 확인용</h1>

      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border-2 border-gray-300 bg-gray-100 p-4"
          >
            <h3 className="font-semibold">항목 {i + 1}</h3>
            <p className="text-sm text-gray-600">
              이것은 모달의 스크롤과 너비를 테스트하기 위한 긴 텍스트입니다.
              콘텐츠가 많아지면 스크롤이 생기는지 확인할 수 있습니다.
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg bg-blue-100 p-4">
        <h2 className="mb-2 text-xl font-bold">추가 정보</h2>
        <p>모달 너비가 sm:max-w-2xl로 제한되어 있습니다.</p>
        <p>최대 높이는 max-h-[80dvh]로 설정되어 있습니다.</p>
        <p>이 콘텐츠가 높이를 초과하면 스크롤이 생성됩니다.</p>
      </div>
    </div>
  )
}
