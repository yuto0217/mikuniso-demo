import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { useSite } from '../../content/site'

/** 「空室を見る」のリンク。行き先が予約サイトなど外のサイトなら <a>、見本の注記のページなら <Link> */
export function BookingLink({
  className,
  children,
  onClick,
}: {
  className: string
  children: ReactNode
  onClick?: () => void
}) {
  const site = useSite()
  if (site.bookingIsExternal) {
    return (
      <a href={site.bookingHref} className={className} onClick={onClick}>
        {children}
      </a>
    )
  }
  return (
    <Link to={site.bookingHref} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}
