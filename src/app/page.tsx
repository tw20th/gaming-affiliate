import ProductSection from '@/components/ProductSection'

const HomePage = () => {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Gaming Affiliate</h1>

      {/* ✅ 各カテゴリのセクションをコンポーネント化（hits=5 を追加） */}
      <ProductSection title="ゲーミングチェア" categoryId="566790" hits={5} />
      <ProductSection title="ゲーミングマウス" categoryId="565171" hits={5} />
      <ProductSection
        title="ゲーミングキーボード"
        categoryId="560088"
        hits={5}
      />

      <div className="text-center mt-8">
        <a href="/ranking" className="text-blue-500 hover:underline">
          🎮 人気ランキングを見る →
        </a>
      </div>
    </main>
  )
}

export default HomePage
