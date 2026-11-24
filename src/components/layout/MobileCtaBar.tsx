import { useUi } from '../../content/i18n'
import { useSite } from '../../content/site'
import { BookingLink } from '../ui/BookingLink'
import { Icon } from '../ui/Icon'

/**
 * スマホ・タブレットで画面下部に固定表示する予約のボタン
 * 「空室を見る」と電話を並べる。電話番号が未確認か、phoneButton が false なら「空室を見る」だけ
 */
export function MobileCtaBar() {
  const site = useSite()
  const ui = useUi()
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-paper/95 px-3 pt-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur xl:hidden">
      <div className="mx-auto flex max-w-xl gap-2">
        <BookingLink className="flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-sm bg-mori px-2 py-1.5 font-medium tracking-wider text-paper no-underline">
          <Icon name="calendar" className="size-6 shrink-0" />
          <span className="text-base leading-tight">{site.bookingLabel}</span>
        </BookingLink>
        {site.showPhoneButton && (
          <a
            href={site.phoneHref}
            className="flex min-h-[52px] flex-1 flex-col items-center justify-center rounded-sm bg-kaki px-2 py-1.5 font-medium text-paper no-underline"
          >
            <span className="flex items-center gap-1.5 text-base leading-tight">
              <Icon name="phone" className="size-5 shrink-0" />
              {ui.callToBook}
            </span>
            <span className="text-sm leading-tight tracking-wider">{site.phone}</span>
          </a>
        )}
      </div>
    </div>
  )
}
