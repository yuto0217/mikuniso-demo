import { ButtonLink } from '../components/ui/Button'
import { PageMeta } from '../components/ui/PageMeta'
import { Section } from '../components/ui/Section'
import { useUi } from '../content/i18n'

export function NotFoundPage() {
  const ui = useUi()
  return (
    <>
      <PageMeta title={ui.notFound} />
      <Section tone="paper" className="!py-24">
        <h1 className="text-[1.75rem] font-medium text-mori-dark sm:text-4xl">{ui.notFound}</h1>
        <ButtonLink to="/" variant="secondary" icon="home" className="mt-8">
          {ui.home}
        </ButtonLink>
      </Section>
    </>
  )
}
