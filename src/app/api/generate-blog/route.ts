import { NextResponse } from 'next/server'

export async function GET() {
  const prompt = `ゲーミングデバイスの最新情報についてブログ記事を作成してください。
  記事は300〜500文字で、読みやすい見出しを含めてください。`

  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ 環境変数 OPENAI_API_KEY が設定されていません')
      return NextResponse.json(
        { error: 'OPENAI_API_KEY が設定されていません' },
        { status: 500 }
      )
    }

    console.log('✅ OpenAI API にリクエスト送信...')

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'system', content: prompt }],
        max_tokens: 500,
      }),
    })

    const data = await response.json()
    console.log('📝 OpenAI API のレスポンス:', data)

    if (!response.ok) {
      console.error('❌ OpenAI API エラー:', data)
      return NextResponse.json(
        { error: '記事生成に失敗しました', details: data },
        { status: response.status }
      )
    }

    if (!data.choices || !data.choices[0]?.message?.content) {
      console.error('❌ 予期しないレスポンス:', data)
      return NextResponse.json(
        { error: '記事生成に失敗しました', details: 'Unexpected API response' },
        { status: 500 }
      )
    }

    const content = data.choices[0].message.content.trim()

    console.log('✅ 記事生成成功')

    return NextResponse.json({ content })
  } catch (error) {
    console.error('❌ API 呼び出し中にエラー:', error)
    return NextResponse.json(
      { error: '記事生成に失敗しました', details: String(error) },
      { status: 500 }
    )
  }
}
