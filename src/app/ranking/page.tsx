import ProductList from '@/components/ProductList'

const RankingPage = () => {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        🎮 ゲーミングデバイスランキング
      </h1>

      {/* ✅ 各ランキングのリストで hits=5 を指定 */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          ゲーミングチェアランキング
        </h2>
        <ProductList categoryId="566790" hits={5} />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          ゲーミングマウスランキング
        </h2>
        <ProductList categoryId="565171" hits={5} />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          ゲーミングキーボードランキング
        </h2>
        <ProductList categoryId="560088" hits={5} />
      </section>

      {/* トップページへのリンク */}
      <div className="text-center mt-8">
        <a href="/" className="text-blue-500 hover:underline">
          🏠 トップページへ戻る →
        </a>
      </div>
    </main>
  )
}

export default RankingPage
