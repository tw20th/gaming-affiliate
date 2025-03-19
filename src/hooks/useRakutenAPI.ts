import { Product } from '@/utils/types'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function useRakutenAPI(
  categoryId: string,
  page: number = 1,
  hits: number = 10
) {
  const { data, error } = useSWR(
    categoryId
      ? `/api/rakuten?categoryId=${categoryId}&page=${page}&hits=${hits}`
      : null,
    fetcher,
    {
      refreshInterval: 60000,
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  )

  // ✅ `Product` 型にマッチするように型を明示
  const products: Product[] =
    data?.Items?.map(
      (item: {
        Item: {
          itemCode: string
          itemName: string
          itemPrice: number
          mediumImageUrls?: { imageUrl: string }[]
          largeImageUrls?: { imageUrl: string }[]
          shopName: string
          itemUrl: string
          reviewAverage?: number
        }
      }) => ({
        id: item.Item.itemCode,
        itemCode: item.Item.itemCode,
        name: item.Item.itemName,
        price: item.Item.itemPrice || null,
        imageUrl: item.Item.mediumImageUrls?.[0]?.imageUrl || '',
        largeImageUrl: item.Item.largeImageUrls?.[0]?.imageUrl || '',
        shopName: item.Item.shopName || '不明な店舗',
        url: item.Item.itemUrl,
        reviewAverage: item.Item.reviewAverage || 0,
      })
    ) || []

  return {
    products,
    loading: !data && !error,
    error,
  }
}
