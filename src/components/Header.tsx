'use client' // ✅ Client Component であることを明示

import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-900">
          Gaming Affiliate
        </Link>
        <nav className="space-x-4">
          <Link href="/" className="text-gray-700 hover:text-gray-900">
            ホーム
          </Link>
          <Link
            href="/categories/gaming-chair"
            className="text-gray-700 hover:text-gray-900"
          >
            ゲーミングチェア
          </Link>
          <Link
            href="/categories/gaming-mouse"
            className="text-gray-700 hover:text-gray-900"
          >
            ゲーミングマウス
          </Link>
          <Link
            href="/categories/gaming-keyboard"
            className="text-gray-700 hover:text-gray-900"
          >
            ゲーミングキーボード
          </Link>
          <Link href="/ranking" className="text-gray-700 hover:text-gray-900">
            ランキング
          </Link>
          <Link href="/blog" className="text-gray-700 hover:text-gray-900">
            ブログ
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
