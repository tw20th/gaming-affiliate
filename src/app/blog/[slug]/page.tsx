import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import ShareButtons from '@/components/ShareButtons'

const getPost = (slug: string) => {
  const filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { content, data } = matter(fileContent)

  return { content, metadata: data }
}

const BlogPostPage = ({ params }: { params: { slug: string } }) => {
  const post = getPost(params.slug)
  if (!post) return notFound()

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* 記事タイトル */}
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
          {post.metadata.title}
        </h1>

        {/* 日付 */}
        <p className="text-gray-500 text-sm mb-6">{post.metadata.date}</p>

        {/* 記事本文 */}
        <article className="prose prose-lg prose-gray max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>

        {/* SNS共有ボタン */}
        <div className="mt-8 flex justify-center gap-4">
          <ShareButtons
            url={typeof window !== 'undefined' ? window.location.href : ''}
            title={post.metadata.title}
          />
        </div>
      </div>
    </main>
  )
}

export default BlogPostPage
