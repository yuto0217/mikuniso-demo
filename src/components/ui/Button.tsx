import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Icon, type IconName } from './Icon'

type Variant = 'primary' | 'secondary' | 'outline' | 'light'

const variantClass: Record<Variant, string> = {
  // 電話など一番大事な操作は柿色
  primary: 'bg-kaki text-paper hover:bg-kaki-dark',
  secondary: 'bg-mori text-paper hover:bg-mori-dark',
  outline: 'border-2 border-mori bg-paper text-mori-dark hover:bg-mori-light',
  light: 'border-2 border-kaki-light bg-transparent text-kaki-light hover:bg-kaki-light/10',
}

const base =
  'inline-flex min-h-[56px] items-center justify-center gap-2 rounded-sm px-6 py-3 text-base font-medium tracking-wider leading-snug no-underline transition-colors'

interface ButtonLinkProps {
  to: string
  children: ReactNode
  variant?: Variant
  icon?: IconName
  className?: string
}

/** ボタンの見た目のリンク。`tel:`・`mailto:` などは <a> で出力する */
export function ButtonLink({ to, children, variant = 'primary', icon, className = '' }: ButtonLinkProps) {
  const classes = `${base} ${variantClass[variant]} ${className}`
  const content = (
    <>
      {icon && <Icon name={icon} className="size-6 shrink-0" />}
      <span>{children}</span>
    </>
  )

  if (/^(tel:|mailto:|https?:)/.test(to)) {
    return (
      <a href={to} className={classes}>
        {content}
      </a>
    )
  }

  return (
    <Link to={to} className={classes}>
      {content}
    </Link>
  )
}

/** 電話をかけるボタン（番号は site.ts から） */
export function PhoneButton({
  phone,
  href,
  label = 'ご予約',
  variant = 'primary',
  className = '',
}: {
  phone: string
  href: string
  label?: string
  variant?: Variant
  className?: string
}) {
  return (
    <a href={href} className={`${base} ${variantClass[variant]} text-xl ${className}`}>
      <Icon name="phone" className="size-6 shrink-0" />
      <span className="text-base">{label}</span>
      <span className="tracking-wider">{phone}</span>
    </a>
  )
}

export function TextLink({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link
      to={to}
      className={`inline-flex min-h-[48px] items-center gap-2 font-bold underline decoration-2 underline-offset-[6px] hover:decoration-4 ${className}`}
    >
      <span>{children}</span>
      <Icon name="arrow" className="size-5 shrink-0" />
    </Link>
  )
}
