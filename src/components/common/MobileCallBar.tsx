import { MessageCircle, Phone, Send } from 'lucide-react';
import { content } from '@content';
import { company } from '@/data/company';

const itemClass =
  'flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 text-small font-semibold';

/** Thanh liên hệ dính đáy, chỉ hiện dưới `md` — trang không có form nên đây là lối chuyển đổi chính trên mobile. */
export function MobileCallBar() {
  return (
    <nav
      aria-label={content.mobileBar.navLabel}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-base shadow-3 md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-stretch">
        <a href={`tel:${company.hotline}`} className={`${itemClass} bg-primary-600 text-white`}>
          <Phone aria-hidden="true" className="size-5" />
          {content.mobileBar.call}
        </a>
        <a
          href={company.zalo}
          target="_blank"
          rel="noopener noreferrer"
          className={`${itemClass} text-ink`}
        >
          <MessageCircle aria-hidden="true" className="size-5" />
          {content.mobileBar.zalo}
        </a>
        <a
          href={company.messenger}
          target="_blank"
          rel="noopener noreferrer"
          className={`${itemClass} text-ink`}
        >
          <Send aria-hidden="true" className="size-5" />
          {content.mobileBar.messenger}
        </a>
      </div>
    </nav>
  );
}
