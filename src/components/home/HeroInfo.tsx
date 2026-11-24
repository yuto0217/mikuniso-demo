import { useUi } from '../../content/i18n'
import { useSite } from '../../content/site'
import { MapEmbed } from '../sections/MapEmbed'
import { Icon } from '../ui/Icon'
import { Container, Section, SectionHeading } from '../ui/Section'
import { PointsSlider } from './PointsSlider'

/**
 * ヒーローの下に続く、宿の魅力（魅力ごとに番号・見出し・説明と、横幅いっぱいに流れる写真）とアクセス（地図つき）
 * 予約のボタンはヘッダー（パソコン）と画面下（スマホ）に出している
 */
export function HeroInfo() {
  const site = useSite()
  const ui = useUi()
  return (
    <>
      {site.points.length > 0 && (
        <section aria-labelledby="home-points" className="bg-paper py-14 sm:py-20">
          <Container>
            {site.pointsTitle ? (
              <SectionHeading id="home-points" title={site.pointsTitle} eyebrow="Features" align="center" />
            ) : (
              <h2 id="home-points" className="sr-only">
                {ui.pointsFallback}
              </h2>
            )}
          </Container>
          <ol className="mt-10 grid gap-14 sm:mt-14 sm:gap-20 lg:mx-auto lg:mt-16 lg:max-w-7xl lg:px-8">
            {site.points.map((point, i) => (
              <li
                key={i}
                className={`lg:grid lg:items-center lg:gap-14 ${i % 2 === 1 ? 'lg:grid-cols-[3fr_2fr]' : 'lg:grid-cols-[2fr_3fr]'}`}
              >
                <Container className="lg:px-0">
                  <div>
                    <p lang="en" aria-hidden="true" className="font-display text-3xl text-kaki-dark">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-2 text-2xl leading-snug font-medium text-mori-dark sm:text-[1.75rem]">
                      <span className={site.lang === 'ja' ? 'whitespace-nowrap max-sm:text-[min(1.25rem,5.2vw)]' : ''}>{point.text}</span>
                    </h3>
                    {point.description && <p className="mt-4 max-w-3xl text-justify text-lg leading-loose">{point.description}</p>}
                  </div>
                </Container>
                <div className={`mt-8 lg:mt-0 ${i % 2 === 1 ? 'lg:order-first' : ''}`}>
                  <PointsSlider photos={point.photos} label={point.text} />
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {(site.access || site.address) && (
        <Section labelledBy="home-access" className={site.points.length > 0 ? 'pt-0 sm:pt-0' : ''}>
          <SectionHeading id="home-access" title={ui.access} eyebrow="Access" />
          <div className="grid gap-6">
            {site.access && (
              <p className="flex items-start gap-3 text-lg leading-relaxed">
                <Icon name="train" className="mt-1 size-6 shrink-0 text-mori" />
                <span className="min-w-0 [overflow-wrap:anywhere]">{site.access}</span>
              </p>
            )}
            <MapEmbed />
          </div>
        </Section>
      )}
    </>
  )
}
