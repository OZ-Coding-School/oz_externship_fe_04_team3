import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'

// //반올림,올림,내림 공식
// function decimalAdjust(type: string, value: number, exp: number) {
//   if (exp % 1 !== 0 || Number.isNaN(value)) {
//     return NaN
//   } else if (exp === 0) {
//     return Math[type](value)
//   }
//   const [magnitude, exponent = 0] = value.toString().split('e')
//   const adjustedValue = Math[type](`${magnitude}e${exponent - exp}`)
//   // 뒤로 이동
//   const [newMagnitude, newExponent = 0] = adjustedValue.toString().split('e')
//   return Number(`${newMagnitude}e${+newExponent + exp}`)
// }

// // 소수점 첫번째 자리에서 내림하는 로직
// const floor10 = (value: number, exp: number) =>
//   decimalAdjust('floor', value, exp)
// console.log(floor10(4.95, -1)) //4.9 별 4개반
// console.log(floor10(2.37, -1)) //2.3 별 2개

export default function getRatingStarsIcon(average_rating: number) {
  //별점은 5점 만점 , 아이콘 5개 있어야함
  const filledStarCount = Math.floor(average_rating) // 4.59 -> 4
  const hasHalfStar = average_rating - filledStarCount >= 0.5
  const emptyStar = hasHalfStar ? 5 - 1 - filledStarCount : 5 - filledStarCount

  return (
    <div className="flex items-center gap-2">
      <div className="star-rating flex">
        {[...Array(filledStarCount)].map((_, idx) => (
          <FaStar size={20} fill="#FACC15" key={idx}></FaStar>
        ))}
        {/* 왜 안되는걸까 다시 확ㅇ니해봐야징
                {hasHalfStar ?? (
          <FaStarHalfAlt size={20} fill="#FACC15"></FaStarHalfAlt>
        )
          }

        */}
        {hasHalfStar ? (
          <FaStarHalfAlt size={20} fill="#FACC15"></FaStarHalfAlt>
        ) : (
          ''
        )}
        {[...Array(emptyStar)].map((_, idx) => (
          <FaRegStar size={20} fill="#FACC15" key={idx} />
        ))}
      </div>
      <p className="text-sm font-medium">{average_rating}</p>
    </div>
  )
}
