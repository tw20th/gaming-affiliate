import fs from 'fs'
import path from 'path'

const BlogPage = () => {
  const blogDir = path.join(process.cwd(), 'src/content/blog')

  // フォルダがない場合は空の配列を返す
  const files = fs.existsSync(blogDir) ? fs.readdirSync(blogDir) : []

  const posts = files.map((file) => ({
    slug: file.replace('.mdx', ''),
    title: file.replace('.mdx', '').replace(/-/g, ' '),
  }))

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">ブログ</h1>
      <ul>
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.slug}>
              <a
                href={`/blog/${post.slug}`}
                className="text-blue-500 hover:underline"
              >
                {post.title}
              </a>
            </li>
          ))
        ) : (
          <p>ブログ記事がありません</p>
        )}
      </ul>
    </main>
  )
}

export default BlogPage
