import { ButtonLink } from '../components/ui/Button'
import { PageMeta } from '../components/ui/PageMeta'
import { Section } from '../components/ui/Section'
import { useUi } from '../content/i18n'
import { useSite } from '../content/site'

/** タブの先のページ（営業用の見本では中身を作らない）。to はタブのパス（「空室を見る」の仮のページは /booking） */
export function TabPage({ to }: { to: string }) {
  const site = useSite()
  const ui = useUi()
  const title = site.navItems.find((item) => item.to === to)?.label ?? site.bookingLabel
  return (
    <>
      <PageMeta title={title} />
      <Section tone="paper" className="!py-24">
        <h1 className="text-[1.75rem] font-medium text-mori-dark sm:text-4xl">{title}</h1>
        <p className="mt-6 text-lg">{ui.demoPage}</p>
        <ButtonLink to="/" variant="secondary" icon="home" className="mt-8">
          {ui.home}
        </ButtonLink>
      </Section>
    </>
  )
}
