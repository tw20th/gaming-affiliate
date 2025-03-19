import fs from 'fs'
import path from 'path'
import { format } from 'date-fns'

const generatePost = async () => {
  const response = await fetch('http://localhost:3000/api/generate-blog')
  const { content } = await response.json()

  if (!content) {
    console.error('記事の生成に失敗しました')
    return
  }

  // 記事タイトルの取得
  const rawTitle = content.split('\n')[0].replace('# ', '').trim()

  // 記号を削除し、英数字とハイフンのみにする
  const sanitizedTitle = rawTitle.replace(/[^\w\s-]/g, '')

  // スラグを生成（小文字に変換し、スペースをハイフンに）
  const slug = sanitizedTitle.toLowerCase().replace(/\s+/g, '-')

  // 日付を取得
  const date = format(new Date(), 'yyyy-MM-dd')

  // 記事タイトルを統一フォーマットに
  const formattedTitle = `最新ゲーミングデバイス情報 - ${date}`

  // MDXコンテンツのフォーマット
  const mdxContent = `---
title: "${formattedTitle}"
date: "${date}"
---

${content}
`

  // 記事ファイルを保存
  const filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.mdx`)
  fs.writeFileSync(filePath, mdxContent)

  console.log(`✅ 記事を生成しました: ${filePath}`)
}

generatePost()
