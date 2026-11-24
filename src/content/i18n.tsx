/**
 * 日本語と英語の切り替え（英語の文章は src/inn.config.ts の en に書く）
 * 選んだ言語はブラウザに覚えておく。URL に ?lang=en を付けると英語で開く
 */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { inn } from '../inn.config'

export type Lang = 'ja' | 'en'

/** 言語のリスト（ボタンを押すと開く一覧の順）。言語を足すときは Lang・ここ・下の ui・inn.config.ts の訳を足す */
export const languages: { code: Lang; label: string; short: string }[] = [
  { code: 'ja', label: '日本語', short: 'JA' },
  { code: 'en', label: 'English', short: 'EN' },
]

const STORAGE_KEY = 'lang'

function initialLang(): Lang {
  if (!inn.en || typeof window === 'undefined') return 'ja'
  const isLang = (v: string | null): v is Lang => languages.some((l) => l.code === v)
  const param = new URLSearchParams(window.location.search).get('lang')
  if (isLang(param)) return param
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return isLang(saved) ? saved : 'ja'
  } catch {
    return 'ja'
  }
}

const LangContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void }>({ lang: 'ja', setLang: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // 保存できなくても切り替えはできる
    }
  }

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}

/** 画面の操作に使う短い言葉 */
const ui = {
  ja: {
    skip: '本文へスキップ',
    mainMenu: 'メインメニュー',
    footerMenu: 'フッターメニュー',
    menu: 'メニュー',
    close: '閉じる',
    home: 'トップページ',
    demoBanner: 'ご提案用の見本サイトです。',
    demoFooter: 'このサイトはホームページのご提案用の見本です。',
    demoPage: '見本サイトのため表示されません。',
    notFound: 'ページが見つかりません',
    pointsFallback: '宿の魅力',
    access: 'アクセス',
    callToBook: '電話で予約',
    reservations: 'ご予約',
    carousel: 'カルーセル',
    slide: 'スライド',
    slideOf: (i: number, n: number) => `${i}枚目（全${n}枚）`,
    photosOf: (label: string) => `${label}の写真`,
    mapTitle: (name: string) => `${name}の地図（Google マップ）`,
    language: '言語',
    scroll: 'SCROLL',
  },
  en: {
    skip: 'Skip to main content',
    mainMenu: 'Main menu',
    footerMenu: 'Footer menu',
    menu: 'Menu',
    close: 'Close',
    home: 'Home',
    demoBanner: 'This is a sample website for a proposal.',
    demoFooter: 'This website is a sample made for a proposal.',
    demoPage: 'This page is not available on the sample website.',
    notFound: 'Page not found',
    pointsFallback: 'Highlights',
    access: 'Access',
    callToBook: 'Call to book',
    reservations: 'Reservations',
    carousel: 'carousel',
    slide: 'slide',
    slideOf: (i: number, n: number) => `${i} of ${n}`,
    photosOf: (label: string) => `Photos: ${label}`,
    mapTitle: (name: string) => `Map of ${name} (Google Maps)`,
    language: 'Language',
    scroll: 'SCROLL',
  },
} as const

export function useUi() {
  return ui[useLang().lang]
}
