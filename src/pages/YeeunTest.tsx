import Select from '@/components/common/Select'

export default function YeeunTest() {
  const sampledata = [
    { itemValue: '1', itemText: '사과' }, // itemValue에 서버 ID로 매핑
    { itemValue: '2', itemText: '바나나' },
    { itemValue: '123', itemText: '오렌지' },
  ]
  return (
    <div>
      YeeunTest
      <Select
        data={sampledata}
        title="과일 선택"
        placeHolder="좋아하는 과일을 고르세요"
        onValueChange={(e) => console.log(e)} //디버깅
      ></Select>
    </div>
  )
}
