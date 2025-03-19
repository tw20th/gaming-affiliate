'use client'

import React, { useState, useEffect } from 'react'
import useRakutenAPI from '@/hooks/useRakutenAPI'
import ProductCard from '@/components/ProductCard'
import Pagination from '@/components/Pagination'
import Filter from '@/components/Filter'
import { Product } from '@/utils/types'

const ProductList = ({
  categoryId,
  hits = 10,
}: {
  categoryId: string
  hits?: number
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { products, loading, error } = useRakutenAPI(
    categoryId,
    currentPage,
    hits
  )
  const [sortedProducts, setSortedProducts] = useState<Product[]>([])

  // ✅ 無限ループ防止: products が変わったときのみセットする
  useEffect(() => {
    if (JSON.stringify(sortedProducts) !== JSON.stringify(products)) {
      setSortedProducts(products)
    }
  }, [products, sortedProducts]) // ✅ `products.length` に依存

  const handleSortChange = (sortType: string) => {
    const sorted = [...products].sort((a, b) => {
      const priceA = a.price ?? Infinity
      const priceB = b.price ?? Infinity

      if (sortType === 'price-asc') return priceA - priceB
      if (sortType === 'price-desc') return priceB - priceA
      if (sortType === 'new-arrival')
        return b.itemCode.localeCompare(a.itemCode)
      return 0
    })

    setSortedProducts(sorted)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (loading) return <p>商品を読み込み中...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div>
      <Filter onSortChange={handleSortChange} />
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>商品が見つかりませんでした</p>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default ProductList
