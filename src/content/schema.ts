/**
 * 宿の設定ファイル（src/inn.config.ts）の型
 * 営業用の見本は「ヒーロー＋タブだけ」。タブの先のページは「見本サイトのため表示されません。」を出す
 */

/** 色の組み合わせ（src/index.css の data-theme と対応。値を変えたら npm run contrast で確認する） */
export type ThemeName =
  | 'umi' //    海の紺 × 夕日の朱（漁師の宿・海辺の宿）
  | 'nagisa' // 海の青緑 × 砂浜の茶（海辺の素朴な宿）
  | 'mori' //   森の緑 × 柿色（高原・森の宿）
  | 'yama' //   山の緑 × 炭の茶（山あいの宿・温泉郷）
  | 'sora' //   空色 × 花の色（南房総など明るい土地の宿）

/** 仮の画像枠の色 */
export type PlaceholderTone = 'mori' | 'wood' | 'kaki' | 'sky' | 'moss'

export interface SiteImage {
  /** 仮の画像枠に表示するラベル（どんな写真を入れるか） */
  label: string
  /** 代替テキスト（写真の内容を説明する文） */
  alt: string
  tone: PlaceholderTone
  /** 本物の写真の URL（src/assets/photos/ に置いて import する）。未設定なら仮の画像枠を表示 */
  src?: string
  /** 枠に合わせて切り抜くときに残したい位置（CSS の object-position） */
  position?: string
}

/** タブ（メニュー）1つ。to は「/」で始まる英字のパス */
export interface NavItem {
  to: string
  label: string
  /** メニューの見出しに添える英語（inn.config.ts の en.tabs があるときだけ。見本の言語切り替えの訳をそのまま使う） */
  labelEn?: string
}

export interface InnPoint {
  /** 魅力の見出し（短い言葉） */
  text: string
  /** 見出しの下の説明（1〜2文。事実だけで、誇張はしない）。なければ null */
  description: string | null
  /** 魅力ごとに横幅いっぱいで流す写真（1〜3枚。見本の間はラベル付きの色の枠） */
  photos: SiteImage[]
}

/** 英語の表示（言語の切り替えボタンで英語を選んだとき）。日本語と同じ事実だけを訳す。書かない項目は日本語のまま */
export interface InnEnglish {
  name: string
  area: string
  description: string
  intro: string | null
  /** ヒーローの2行の短い言葉（日本語の catchcopy と同じ順）。書かない項目は日本語のまま */
  catchcopy: string[] | null
  /** タブの名前（キーはタブのパス） */
  tabs: Record<string, string>
  /** ヒーローの写真の枠（日本語の hero と同じ順） */
  hero: { label: string; alt: string }[]
  /** 宿の魅力（日本語の points と同じ順。photos も同じ順） */
  points: { text: string; description: string | null; photos: { label: string; alt: string }[] }[]
  pointsTitle: string | null
  access: string | null
  bookingLabel: string
}

export interface InnConfig {
  /** 宿名のローマ字（リポジトリ名・Worker 名は `<slug>-demo`）。npm run setup が書き込む */
  slug: string
  /** 種別（民宿・ペンション・旅館など） */
  kind: string
  name: string
  /** ロゴと見出しの上に添える地名 */
  area: string
  /** 検索結果に出る説明文（事実だけで1文） */
  description: string
  /** ヒーローの宿名の下に出す紹介文（1〜2文。事実だけで、誇張はしない）。なければ null */
  intro: string | null
  /**
   * ヒーローの短い2行の言葉（キャッチコピー）。あれば intro の代わりにヒーローへ大きく出す（明朝体）
   * 口コミの言葉は使わず、宿の立場で事実（土地・宿の雰囲気）から短く書く。新しい誇張表現は作らない。なければ null
   * 例：['雲見の海と、', '漁師の宿のもてなし。']
   */
  catchcopy: string[] | null
  theme: ThemeName
  /** タブ（メニュー）。中身は作らず、開くと「見本サイトのため表示されません。」。ふつうは客室・お料理・アクセスの3つ */
  tabs: NavItem[]
  /** ブラウザのアイコンに出す1文字 */
  logoChar: string
  /** 電話番号（分からない間は null。null の間は電話ボタンを出さない） */
  phone: string | null
  /** 「電話で予約」のボタン（ヘッダー・画面下・予約の帯・フッター）を出すか */
  phoneButton: boolean
  /** トップのスライドの写真（3枚まで。見本の間はラベル付きの色の枠） */
  hero: SiteImage[]
  /**
   * 宿の魅力（2〜3個。短い言葉で）。口コミで多く褒められている点から選び、口コミの文は写さず、事実を宿の立場の言葉にする
   * 魅力ごとに、番号・見出し・説明と、横幅いっぱいに流れる写真（photos）を出す
   * 例：[{ text: '伊勢海老漁を営む宿の海鮮舟盛り', description: null, photos: [{ label: '舟盛りの写真', alt: '伊勢海老の舟盛り', tone: 'kaki' }] }]
   */
  points: InnPoint[]
  /** 宿の魅力の見出し（例：「太郎の魅力」）。null なら見出しを出さない */
  pointsTitle: string | null
  /** アクセス（地名と最寄り駅・バス停・IC からの時間）。例：'伊豆急下田駅からバス約90分「雲見温泉」下車、歩いて2分' */
  access: string | null
  /** 住所（アクセスの Google マップに使う。分からない間は null で、地図を出さない） */
  address: string | null
  /** 「空室を見る」の行き先（予約システムや予約サイトの URL）。null の間は「見本サイトのため表示されません。」のページ */
  bookingUrl: string | null
  /** 予約ボタンの名前（ふつうは「空室を見る」。例：「ご予約」） */
  bookingLabel: string
  /** ヒーローの中の予約ボタンを出すか（省略すると出す。ヘッダーとスマホの画面下のボタンはそのまま） */
  heroBooking?: boolean
  /** 英語の表示。null なら言語の切り替えボタンを出さない */
  en: InnEnglish | null
}
