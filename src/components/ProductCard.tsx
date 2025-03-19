'use client'

import React from 'react'
import Image from 'next/image'
import { Product } from '@/utils/types'
import Link from 'next/link'

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition bg-white">
      {/* 🔗 商品詳細ページへのリンクを追加 */}
      <Link href={`/product/${product.id}`} className="block">
        {/* 画像 */}
        <div className="relative w-full h-56 mb-4 bg-gray-100 flex items-center justify-center overflow-hidden rounded-lg">
          <Image
            src={
              product.imageUrl && product.imageUrl.startsWith('https')
                ? product.imageUrl
                : '/no-image.png'
            }
            alt={product.name || '商品画像'}
            width={300}
            height={300}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* 商品名 */}
        <h2 className="text-sm font-semibold mb-1 text-gray-800 leading-tight">
          {product.name || '商品名不明'}
        </h2>

        {/* 価格 */}
        <p className="text-lg font-bold text-red-600 mt-2">
          {product.price ? `${product.price.toLocaleString()} 円` : '価格不明'}
        </p>

        {/* ショップ名 */}
        <p className="text-xs text-gray-500 mt-1">
          {product.shopName || '店舗不明'}
        </p>
      </Link>

      {/* 楽天購入ボタン */}
      <div className="mt-3">
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition text-center block"
        >
          楽天で購入
        </a>
      </div>
    </div>
  )
}

export default ProductCard
