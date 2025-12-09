export function getDiscount(discounted_price: number, original_price: number) {
  return Math.floor((discounted_price / original_price) * 100)
}
