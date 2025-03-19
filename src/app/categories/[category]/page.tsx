'use client'

import { useParams } from 'next/navigation'
import ProductList from '@/components/ProductList'

const categoryMap: { [key: string]: string } = {
  'gaming-chair': '566790',
  'gaming-mouse': '565171',
  'gaming-keyboard': '560088',
}

const CategoryPage = () => {
  const params = useParams()
  const categoryId = categoryMap[params.category as string] || ''

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">カテゴリーページ</h1>
      {categoryId ? (
        <ProductList categoryId={categoryId} />
      ) : (
        <p>カテゴリが見つかりませんでした。</p>
      )}
    </main>
  )
}

export default CategoryPage
