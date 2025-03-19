import Link from 'next/link'

const categories = [
  { name: 'ゲーミングチェア', slug: 'gaming-chair' },
  { name: 'ゲーミングマウス', slug: 'gaming-mouse' },
  { name: 'ゲーミングキーボード', slug: 'gaming-keyboard' },
]

const CategoryNav = () => {
  return (
    <nav className="flex space-x-4 mb-6">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/categories/${category.slug}`}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          {category.name}
        </Link>
      ))}
    </nav>
  )
}

export default CategoryNav
