'use client' // ✅ クライアントコンポーネントとして指定

import { useParams } from 'next/navigation'
import useProduct from '@/hooks/useProduct'
import Image from 'next/image'
import ShareButtons from '@/components/ShareButtons'
import { useEffect, useState } from 'react'

const ProductDetailPage = () => {
  const params = useParams()
  const [productId, setProductId] = useState<string | null>(null)
  const [currentUrl, setCurrentUrl] = useState('')

  // ✅ useEffect で params.id をチェックして、無効な場合は null にする
  useEffect(() => {
    if (typeof params.id === 'string') {
      setProductId(params.id)
    } else {
      setProductId(null)
    }

    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href)
    }
  }, [params.id])

  // ✅ フックをトップレベルで呼び出す（条件分岐の外）
  const { product, loading, error } = useProduct(productId || '')

  if (!productId) {
    return <p className="text-center text-red-500">無効な商品IDです。</p>
  }

  if (loading)
    return <p className="text-center text-gray-500">商品を読み込み中...</p>
  if (error || !product)
    return <p className="text-center text-red-500">商品が見つかりません。</p>

  return (
    <main className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 商品画像 */}
        <div>
          <Image
            src={product.imageUrl}
            alt={product.name || '商品画像'}
            width={300} // 任意の値
            height={300} // 任意の値
            className="object-contain w-full h-auto"
          />
        </div>

        {/* 商品情報 */}
        <div>
          <div className="p-4 border rounded-lg shadow-md bg-white">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl text-red-500 font-semibold mb-2">
              {product.price
                ? `${product.price.toLocaleString()} 円`
                : '価格不明'}
            </p>
            <p className="text-gray-700 mb-4">販売店: {product.shopName}</p>
          </div>

          {/* 楽天購入ボタン */}
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition block text-center mt-4"
          >
            楽天で購入する
          </a>

          {/* SNS共有ボタン */}
          <ShareButtons url={currentUrl} title={product.name} />
        </div>
      </div>
    </main>
  )
}

export default ProductDetailPage
