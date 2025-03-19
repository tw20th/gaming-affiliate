import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import matter from 'gray-matter'

const getBlogPosts = () => {
  const blogDir = path.join(process.cwd(), 'src/content/blog')

  if (!fs.existsSync(blogDir)) return [] // ディレクトリがない場合は空配列を返す

  const files = fs.readdirSync(blogDir)
  console.log('取得したブログファイル:', files) // 確認用ログ

  return files.map((file) => {
    const filePath = path.join(blogDir, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    return {
      slug: file.replace('.mdx', ''),
      title: data.title || file.replace('.mdx', '').replace(/-/g, ' '),
      date: data.date || '日付不明',
      excerpt: content.substring(0, 100) + '...', // 記事の最初の100文字をプレビュー
    }
  })
}

const BlogPage = () => {
  const posts = getBlogPosts()

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">
        📝 最新のブログ記事
      </h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">ブログ記事がありません。</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition bg-white"
            >
              <h2 className="text-xl font-semibold mb-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-500 hover:underline"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <p className="text-gray-700">{post.excerpt}</p>
              <div className="mt-4">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md inline-block"
                >
                  記事を読む →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default BlogPage
