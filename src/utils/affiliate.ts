const RAKUTEN_AFFILIATE_ID = 'your_affiliate_id' // 自分の楽天アフィリエイトIDを設定
const RAKUTEN_MEDIA_ID = 'your_media_id' // 必要なら設定

export const generateAffiliateLink = (itemUrl: string): string => {
  const encodedUrl = encodeURIComponent(itemUrl)
  return `https://hb.afl.rakuten.co.jp/hgc/${RAKUTEN_AFFILIATE_ID}/?pc=${encodedUrl}&m=${RAKUTEN_MEDIA_ID}`
}
