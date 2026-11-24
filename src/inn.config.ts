/**
 * ★宿の設定ファイル（営業用の見本は、このファイルだけを書き換えて作る）
 *
 * 営業用の見本は「ヒーロー＋タブだけ」。ヒーローの下に宿の魅力（points、写真の枠つき）・アクセス（access と address の地図）・予約ボタン（電話で予約／空室を見る）を出す
 * 客室・お料理・アクセスはタブ（メニュー）だけ出し、中身は作らない
 * - 宿名・地名・電話・アクセスは、出典をたどれる公開情報（予約サイト・観光協会など）の事実だけを書く。出典は CLAUDE.md に残す
 * - 宿の魅力は口コミで多く褒められている点から選ぶ。口コミの文は写さず、宿の立場の短い言葉にする。誇張（絶品・最高級など）はしない
 * - 分からないものは null のまま（仮の値で埋めない）
 * - 写真は使わない。ヒーローはラベル付きの色の枠（label にどんな写真を入れるかを書く）
 * - 書き終えたら npm run check
 */
import type { InnConfig } from './content/schema'

export const inn: InnConfig = {
  slug: 'mikuniso',
  kind: '民宿',
  name: '苗場三国荘',
  area: '苗場',
  description: '苗場の民宿「苗場三国荘」。',
  intro: null,
  catchcopy: null,
  theme: 'sora',
  tabs: [
    { to: '/rooms', label: '客室' },
    { to: '/cuisine', label: 'お料理' },
    { to: '/access', label: 'アクセス' },
  ],
  logoChar: '三',
  phone: '025-789-2638',
  phoneButton: true,
  hero: [
    { label: '雪の苗場スキー場のゲレンデの写真', alt: '宿の近くの苗場スキー場のゲレンデ', tone: 'sky' },
    { label: 'ゲレンデが見える食堂の写真', alt: '苗場のゲレンデが見える食堂', tone: 'wood' },
    { label: '宿の外観の写真', alt: '苗場三国荘の外観', tone: 'moss' },
  ],
  points: [
    {
      text: '苗場スキー場のすぐそば',
      description: '苗場スキー場の隣にあり、食堂からはゲレンデを眺められます。夏はフジロックでもご利用いただいています。',
      photos: [
        { label: 'ゲレンデの写真', alt: '苗場スキー場のゲレンデ', tone: 'sky' },
        { label: '食堂からの眺めの写真', alt: '食堂から見えるゲレンデ', tone: 'wood' },
      ],
    },
    {
      text: 'ジェットバス付きのお風呂と貸切家族風呂',
      description: '活性石を使ったミネラル人工温泉のジェットバスがあります。平日や空いている時間は、無料の貸切家族風呂としてお使いいただけます。',
      photos: [
        { label: 'ジェットバスのお風呂の写真', alt: 'ジェットバス付きのお風呂', tone: 'kaki' },
      ],
    },
  ],
  pointsTitle: '三国荘の魅力',
  access: 'JR越後湯沢駅からバスで約45分。関越自動車道 越後湯沢ICから車で約30分',
  address: '新潟県南魚沼郡湯沢町三国44-1',
  bookingUrl: null,
  bookingLabel: '空室を見る',
  heroBooking: true,
  en: null,
}
