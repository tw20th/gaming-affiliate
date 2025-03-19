import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    return NextResponse.json(
      { error: 'スラッグが指定されていません' },
      { status: 400 }
    )
  }

  const filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: '記事が見つかりません' }, { status: 404 })
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { content, data } = matter(fileContent)

  return NextResponse.json({
    title: data.title,
    date: data.date,
    content,
  })
}
