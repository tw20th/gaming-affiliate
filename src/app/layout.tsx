import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '@/app/globals.css' // ✅ Tailwind 読み込み
console.log('globals.css is loaded') // ✅ ログで確認

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <title>Gaming Affiliate</title>
        <meta
          name="description"
          content="最新のゲーミングデバイス情報をお届けします。"
        />
      </head>
      <body className="bg-gray-100 text-gray-900">
        <Header /> {/* ✅ ヘッダーを追加 */}
        <main className="container mx-auto p-4">{children}</main>
        <Footer /> {/* ✅ フッターを追加 */}
      </body>
    </html>
  )
}
