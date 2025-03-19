import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const categoryId = searchParams.get('categoryId')

  if (!categoryId) {
    return NextResponse.json(
      { error: 'Category ID is required' },
      { status: 400 }
    )
  }

  try {
    const response = await fetch(
      `https://app.rakuten.co.jp/services/api/IchibaItem/Ranking/20220601?applicationId=${process.env.RAKUTEN_APP_ID}&genreId=${categoryId}&format=json`
    )
    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to fetch ranking data' },
      { status: 500 }
    )
  }
}
