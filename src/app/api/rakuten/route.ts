import { NextRequest, NextResponse } from 'next/server'
import { Product } from '@/utils/types' // ✅ Product 型をインポート

// 環境変数
const APPLICATION_ID = process.env.RAKUTEN_APPLICATION_ID

// 楽天APIのレスポンス型
interface RakutenResponse {
  Items: Array<{ Item: Product }>
}

// キャッシュ用の型を定義
interface CacheData {
  data: RakutenResponse
  expiresAt: number
}

// ✅ globalThis にキャッシュを追加するための型定義を拡張
declare global {
  interface Global {
    rakutenCache?: Map<string, CacheData>
  }
}

// ✅ 型アサーションを適用し、TypeScript の警告を防ぐ
const globalThisTyped = globalThis as unknown as {
  rakutenCache?: Map<string, CacheData>
}

if (!globalThisTyped.rakutenCache) {
  globalThisTyped.rakutenCache = new Map<string, CacheData>()
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const categoryId = searchParams.get('categoryId')
  const page = searchParams.get('page') || '1'
  const hits = searchParams.get('hits') || '10'

  if (!categoryId) {
    return NextResponse.json({ error: 'Missing categoryId' }, { status: 400 })
  }

  // キャッシュキー作成
  const cacheKey = `rakuten-${categoryId}-${page}-${hits}`
  const now = Date.now()

  // キャッシュ取得
  const cachedData = globalThisTyped.rakutenCache?.get(cacheKey)
  if (cachedData && cachedData.expiresAt > now) {
    return NextResponse.json(cachedData.data)
  }

  const url = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?format=json&applicationId=${APPLICATION_ID}&genreId=${categoryId}&page=${page}&hits=${hits}`

  try {
    const res = await fetch(url, { cache: 'no-store' }) // Next.jsのfetchのキャッシュを無効化

    if (!res.ok) {
      console.error('楽天APIエラー: HTTP', res.status)
      return NextResponse.json(
        { error: `楽天APIリクエストに失敗しました (Status: ${res.status})` },
        { status: res.status }
      )
    }

    const data: RakutenResponse = await res.json()

    // ✅ キャッシュに保存（60分間有効）
    globalThisTyped.rakutenCache?.set(cacheKey, {
      data,
      expiresAt: now + 60 * 60 * 1000,
    })

    return NextResponse.json(data)
  } catch (error: unknown) {
    console.error('サーバーエラー:', error)
    return NextResponse.json(
      { error: 'Internal Server Error', details: String(error) },
      { status: 500 }
    )
  }
}
