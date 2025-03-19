'use client'

import React, { useState } from 'react'

type FilterProps = {
  onSortChange: (value: string) => void
}

const Filter = ({ onSortChange }: FilterProps) => {
  const [sortType, setSortType] = useState('price-asc')

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setSortType(value)
    onSortChange(value) // 親コンポーネント(ProductList) に通知
  }

  return (
    <div className="mb-4">
      <label className="mr-2">並び替え:</label>
      <select
        value={sortType}
        onChange={handleSortChange}
        className="border p-2 rounded"
      >
        <option value="price-asc">価格が安い順</option>
        <option value="price-desc">価格が高い順</option>
        <option value="new-arrival">新着順</option> {/* 🆕 新着順の追加 */}
      </select>
    </div>
  )
}

export default Filter
