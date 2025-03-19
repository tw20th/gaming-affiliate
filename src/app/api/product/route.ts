import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const itemCode = searchParams.get('itemCode')

  if (!itemCode) {
    return NextResponse.json(
      { error: 'Item code is required' },
      { status: 400 }
    )
  }

  // ✅ リクエストURLをログ出力
  const apiUrl = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?applicationId=${process.env.RAKUTEN_APP_ID}&itemCode=${itemCode}&format=json`
  console.log(`Fetching from Rakuten API: ${apiUrl}`)

  try {
    const response = await fetch(apiUrl)

    if (!response.ok) {
      console.error('楽天APIエラー: HTTP', response.status)
      return NextResponse.json(
        {
          error: `楽天APIリクエストに失敗しました (Status: ${response.status})`,
        },
        { status: response.status }
      )
    }

    // ✅ レスポンスが空の場合の処理
    const textData = await response.text()
    if (!textData) {
      console.error('楽天APIエラー: 空のレスポンス')
      return NextResponse.json(
        { error: '楽天APIから空のレスポンスが返されました' },
        { status: 500 }
      )
    }

    // ✅ JSON変換
    let data
    try {
      data = JSON.parse(textData)
    } catch (jsonError) {
      console.error('楽天APIエラー: JSON解析に失敗', jsonError)
      return NextResponse.json(
        { error: '楽天APIから無効なJSONが返されました' },
        { status: 500 }
      )
    }

    if (!data.Items || data.Items.length === 0) {
      console.error('楽天APIエラー: 商品が見つかりません')
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // ✅ 取得した商品情報をログ出力
    console.log('楽天APIから取得した商品データ:', data.Items[0].Item)

    return NextResponse.json(data.Items[0].Item)
  } catch (error) {
    console.error('サーバーエラー:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
