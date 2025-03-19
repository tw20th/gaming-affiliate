export interface Product {
  id: string
  itemCode: string
  name: string
  price: number | null
  imageUrl: string
  largeImageUrl?: string // ❗オプションにする
  shopName: string
  url: string
  reviewAverage?: number // ❗オプションにする
}
