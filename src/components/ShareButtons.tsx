'use client' // ✅ クライアントコンポーネントとして明示

import { useEffect, useState } from 'react'

type ShareButtonsProps = {
  url: string
  title: string
}

const ShareButtons = ({ url, title }: ShareButtonsProps) => {
  const [encodedUrl, setEncodedUrl] = useState('')
  const [encodedTitle, setEncodedTitle] = useState('')

  useEffect(() => {
    setEncodedUrl(encodeURIComponent(url))
    setEncodedTitle(encodeURIComponent(title))
  }, [url, title])

  return (
    <div className="flex space-x-4 mt-4">
      {/* X（旧Twitter） */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        X で共有
      </a>

      {/* Instagram（リンクをプロフィールに追加する想定） */}
      <a
        href={`https://www.instagram.com/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition"
      >
        Instagram で共有
      </a>
    </div>
  )
}

export default ShareButtons
