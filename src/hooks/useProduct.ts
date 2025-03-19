import { useState, useEffect } from 'react'
import { Product } from '@/utils/types'

const useProduct = (itemCode: string) => {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!itemCode) {
      setLoading(false) // ✅ itemCodeが無い場合、ローディングを止める
      return
    }

    const fetchProduct = async () => {
      setLoading(true) // ✅ API呼び出し前にローディングを開始

      try {
        const res = await fetch(
          `/api/product?itemCode=${encodeURIComponent(itemCode)}`
        )
        const data = await res.json()

        if (!res.ok || !data || Object.keys(data).length === 0) {
          throw new Error('商品データが見つかりません')
        }

        // ✅ 商品データの適切な処理
        const formattedProduct: Product = {
          id: data.itemCode ?? '不明',
          itemCode: data.itemCode ?? '不明',
          name: data.itemName ?? data.catchcopy ?? '名前なし',
          price: data.itemPrice ?? null,
          imageUrl:
            data.mediumImageUrls?.[0]?.imageUrl ??
            data.smallImageUrls?.[0]?.imageUrl ??
            '/no-image.png',
          largeImageUrl: data.largeImageUrls?.[0]?.imageUrl || '',
          shopName: data.shopName ?? '不明な店舗',
          url: data.itemUrl ?? '',
        }

        setProduct(formattedProduct)
        setError(null)
      } catch (error: unknown) {
        console.error('楽天APIエラー:', error)
        setError(error instanceof Error ? error.message : '不明なエラー')
        setProduct(null)
      } finally {
        setLoading(false) // ✅ 必ずローディングを終了
      }
    }

    fetchProduct()
  }, [itemCode])

  return { product, loading, error }
}

export default useProduct
