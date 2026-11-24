import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { languages, useLang, useUi } from "../../content/i18n";
import { hasEnglish, useSite } from "../../content/site";
import { BookingLink } from "../ui/BookingLink";
import { Icon } from "../ui/Icon";

/** ロゴ（地名の添え字＋宿名）。濃い背景の上では明るい色を使う */
export function Logo({ tone = "default" }: { tone?: "default" | "light" }) {
  const site = useSite();
  const light = tone === "light";
  return (
    <Link
      to="/"
      className="inline-flex min-h-[48px] flex-col justify-center no-underline"
    >
      <span
        className={`text-xs font-medium whitespace-nowrap ${site.lang === 'en' ? 'tracking-wider' : 'tracking-[0.2em]'} ${light ? "text-kaki-light" : "text-kaki-dark"}`}
      >
        {site.area}
      </span>
      <span
        className={`mt-0.5 font-serif leading-tight font-medium whitespace-nowrap ${site.lang === 'en' ? 'text-base max-[359px]:text-sm sm:text-lg' : 'text-lg tracking-wider'} ${light ? "text-paper" : "text-mori-dark"}`}
      >
        {site.name}
      </span>
    </Link>
  );
}

/**
 * ヘッダー（高級宿のサイト（st-anton.jp・ラビスタ南阿蘇）の分析を取り入れた構成、2026年11月22日）
 * ロゴ・空室を見るボタン・電話ボタン・MENU ボタン・言語の切り替え（英語の表示があるときだけ）を一段に並べる
 * 言語の切り替えは MENU ボタンのすぐ右に置く（Yuto の指示、2026年11月22日）
 * MENU ボタンはパソコン・スマホとも同じ全画面メニューを開く（常時表示のタブの列は出さない）
 */
export function Header() {
  const site = useSite();
  const ui = useUi();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const [lastPath, setLastPath] = useState(pathname);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // ページが変わったらメニューを閉じる
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  const menuItems = [{ to: "/", label: ui.home, labelEn: "Home" }, ...site.navItems];

  return (
    <>
    <header className="border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-2 max-[359px]:gap-2 max-[359px]:px-3 sm:px-8">
        <Logo />

        <div className="flex shrink-0 items-center gap-2">
          <BookingLink className="hidden min-h-[48px] items-center justify-center gap-2 rounded-sm bg-mori px-4 py-1 font-medium tracking-wider whitespace-nowrap text-paper no-underline hover:bg-mori-dark sm:inline-flex">
            <Icon name="calendar" className="size-5" />
            <span className="text-sm">{site.bookingLabel}</span>
          </BookingLink>
          {site.showPhoneButton && (
            <a
              href={site.phoneHref}
              aria-label={`${ui.callToBook} ${site.phone}`}
              className="hidden min-h-[48px] items-center justify-center gap-2 rounded-sm bg-kaki px-4 py-1 font-medium whitespace-nowrap text-paper no-underline hover:bg-kaki-dark lg:inline-flex"
            >
              <Icon name="phone" className="size-5" />
              <span className="tracking-wider">{site.phone}</span>
            </a>
          )}
          <button
            type="button"
            className="inline-flex min-h-[48px] min-w-[48px] shrink-0 items-center justify-center gap-1 rounded-sm border border-line px-3 font-medium whitespace-nowrap text-mori-dark"
            aria-expanded={open}
            aria-controls="main-menu"
            onClick={() => setOpen(true)}
          >
            <Icon name="menu" className="size-6" />
            <span className="text-sm">{ui.menu}</span>
          </button>
          <LangSwitch />
        </div>
      </div>
    </header>

      {open && (
        <div
          id="main-menu"
          role="dialog"
          aria-modal="true"
          aria-label={ui.mainMenu}
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-paper"
        >
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-2 max-[359px]:px-3 sm:px-8">
            <Logo />
            <button
              ref={closeButtonRef}
              type="button"
              className="inline-flex min-h-[48px] min-w-[48px] shrink-0 items-center justify-center gap-1 rounded-sm border border-line px-3 font-medium whitespace-nowrap text-mori-dark"
              onClick={() => setOpen(false)}
            >
              <Icon name="close" className="size-6" />
              <span className="text-sm">{ui.close}</span>
            </button>
          </div>

          <nav aria-label={ui.mainMenu} className="flex flex-1 flex-col items-center justify-center gap-6 px-5 py-10 sm:gap-8">
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1.5 px-2 py-1 text-center no-underline ${
                    isActive ? "text-kaki-dark" : "text-ink hover:text-mori-dark"
                  }`
                }
              >
                {item.labelEn && (
                  <span lang="en" aria-hidden="true" className="font-display text-xs tracking-[0.3em] text-kaki uppercase">
                    {item.labelEn}
                  </span>
                )}
                <span className="font-serif text-2xl leading-snug font-medium sm:text-3xl">{item.label}</span>
              </NavLink>
            ))}

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <BookingLink
                onClick={() => setOpen(false)}
                className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-sm bg-mori px-6 font-medium tracking-wider whitespace-nowrap text-paper no-underline hover:bg-mori-dark"
              >
                <Icon name="calendar" className="size-5" />
                {site.bookingLabel}
              </BookingLink>
              {site.showPhoneButton && (
                <a
                  href={site.phoneHref}
                  className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-sm bg-kaki px-6 font-medium whitespace-nowrap text-paper no-underline hover:bg-kaki-dark"
                >
                  <Icon name="phone" className="size-5" />
                  <span className="tracking-wider">{site.phone}</span>
                </a>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

/** 言語の切り替え（英語の表示があるときだけ）。押すと言語の一覧が開き、そこから選ぶ */
function LangSwitch() {
  const { lang, setLang } = useLang()
  const ui = useUi()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const listId = useId()

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        ref.current?.querySelector('button')?.focus()
      }
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!hasEnglish) return null
  const current = languages.find((l) => l.code === lang) ?? languages[0]

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`Language: ${current.label}`}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center gap-1 rounded-sm border border-line px-2.5 font-medium whitespace-nowrap text-kaki-dark hover:bg-mori-light"
      >
        <Icon name="globe" className="size-4 shrink-0" />
        <span className="text-xs">{current.short}</span>
        <Icon name="chevron" className={`size-3.5 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul
          id={listId}
          aria-label={ui.language}
          className="absolute right-0 z-50 mt-2 min-w-[10rem] overflow-hidden rounded-sm border border-line bg-paper py-1 shadow-lg"
        >
          {languages.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                lang={l.code}
                aria-current={l.code === lang ? 'true' : undefined}
                onClick={() => {
                  setLang(l.code)
                  setOpen(false)
                }}
                className={`flex min-h-[48px] w-full items-center gap-2 px-4 text-left font-medium hover:bg-mori-light ${
                  l.code === lang ? 'text-kaki-dark' : 'text-ink'
                }`}
              >
                <Icon name="check" className={`size-5 shrink-0 ${l.code === lang ? 'text-kaki' : 'invisible'}`} />
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
