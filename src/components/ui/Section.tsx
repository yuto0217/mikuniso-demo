import type { ReactNode } from 'react'

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-5xl px-5 sm:px-8 lg:max-w-7xl ${className}`}>{children}</div>
}

const toneClass = {
  cream: 'bg-cream',
  paper: 'bg-paper',
  wood: 'bg-wood-light',
  kaki: 'bg-kaki-light',
} as const

interface SectionProps {
  children: ReactNode
  /** 見出しの id（aria-labelledby に使う） */
  labelledBy?: string
  tone?: keyof typeof toneClass
  className?: string
}

/** ページ内の区切り（上下の余白と背景色） */
export function Section({ children, labelledBy, tone = 'cream', className = '' }: SectionProps) {
  return (
    <section aria-labelledby={labelledBy} className={`${toneClass[tone]} py-14 sm:py-20 ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}

interface SectionHeadingProps {
  title: ReactNode
  id?: string
  align?: 'left' | 'center'
  /** 見出しの上に添える英語（例：Features・Access）。azami-demo のエディトリアルな見出しにならう。省略すると添え字なし */
  eyebrow?: string
}

/** 見出し（中央ぞろえのときは英語の添え字の左右に同じ長さの線を引く） */
export function SectionHeading({ title, id, align = 'left', eyebrow }: SectionHeadingProps) {
  const center = align === 'center'
  return (
    <div className={`mb-8 flex flex-col gap-3 ${center ? 'items-center text-center' : ''}`}>
      {eyebrow ? (
        <p lang="en" aria-hidden="true" className="flex items-center gap-4 font-display text-base tracking-[0.35em] text-kaki-dark uppercase sm:text-lg">
          <span className="h-px w-10 bg-kaki" />
          <span className={center ? '-mr-[0.35em]' : ''}>{eyebrow}</span>
          {center && <span className="h-px w-10 bg-kaki" />}
        </p>
      ) : (
        <span aria-hidden="true" className="block h-1 w-10 rounded-full bg-kaki" />
      )}
      <h2 id={id} className="text-[1.5rem] font-medium text-mori-dark sm:text-3xl">
        {title}
      </h2>
    </div>
  )
}
