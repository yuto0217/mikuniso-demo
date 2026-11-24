import { Link } from 'react-router'
import { useUi } from '../../content/i18n'
import { useSite } from '../../content/site'
import { Icon } from '../ui/Icon'
import { Logo } from './Header'

export function Footer() {
  const site = useSite()
  const ui = useUi()
  return (
    <footer className="surface-dark bg-mori-dark text-cream">
      <div className="mx-auto grid max-w-5xl gap-10 lg:max-w-7xl px-5 py-14 sm:px-8 md:grid-cols-2">
        <div>
          <Logo tone="light" />
          {site.showPhoneButton && (
          <a
            href={site.phoneHref}
            className="mt-5 flex min-h-[48px] w-fit items-center gap-2 text-2xl font-medium tracking-wider text-paper no-underline"
          >
            <Icon name="phone" className="size-6" />
            <span className="text-base tracking-normal">{ui.reservations}</span>
            {site.phone}
          </a>
          )}
        </div>

        <nav aria-label={ui.footerMenu}>
          <ul className="grid gap-x-6 sm:grid-cols-2">
            <li>
              <Link to="/" className="inline-flex min-h-[48px] items-center text-cream underline-offset-4 hover:underline">
                {ui.home}
              </Link>
            </li>
            {site.navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="inline-flex min-h-[48px] items-center text-cream underline-offset-4 hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/15 px-5 py-5 text-center text-sm text-kaki-light">
        <p>{ui.demoFooter}</p>
        <p className="mt-2">{site.copyright}</p>
      </div>
    </footer>
  )
}
