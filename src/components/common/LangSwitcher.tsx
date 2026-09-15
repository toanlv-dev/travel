import { content } from '@content';
import { cn } from '@/lib/cn';

/** Hai bản ngôn ngữ là hai URL khác nhau, nên đây là link thật chứ không phải nút đổi state. */
const OTHER_BASE = content.locale === 'en' ? '/vi/' : '/';

interface LangSwitcherProps {
  /** Khi header còn trong suốt, nằm trên ảnh hero */
  onDark?: boolean;
  className?: string;
}

export function LangSwitcher({ onDark = false, className }: LangSwitcherProps) {
  const isEn = content.locale === 'en';

  // href tĩnh để crawler và middle-click dùng được; click thường thì mang theo
  // anchor đang đứng (/#tours → /vi/#tours) — hash chỉ biết được tại thời điểm click
  const keepAnchor = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { hash } = window.location;
    if (!hash) return;
    e.preventDefault();
    window.location.assign(OTHER_BASE + hash);
  };

  const current = onDark
    ? 'font-semibold text-white drop-shadow-[0_1px_8px_rgba(0,0,0,.5)]'
    : 'font-semibold text-primary-700';
  const other = onDark
    ? 'text-white/75 drop-shadow-[0_1px_8px_rgba(0,0,0,.5)] hover:text-white'
    : 'text-ink-muted hover:text-primary-700';

  return (
    <div className={cn('flex items-center gap-1 text-small', className)}>
      <span className={cn('px-1', isEn ? current : undefined)} aria-current={isEn ? 'true' : undefined}>
        {isEn ? (
          content.langSwitch.labelEn
        ) : (
          <a
            href={OTHER_BASE}
            hrefLang="en"
            lang="en"
            aria-label={content.langSwitch.toOther}
            onClick={keepAnchor}
            className={cn('flex min-h-11 min-w-11 items-center justify-center', other)}
          >
            {content.langSwitch.labelEn}
          </a>
        )}
      </span>
      <span aria-hidden="true" className={onDark ? 'text-white/40' : 'text-line-strong'}>
        |
      </span>
      <span className={cn('px-1', !isEn ? current : undefined)} aria-current={!isEn ? 'true' : undefined}>
        {!isEn ? (
          content.langSwitch.labelVi
        ) : (
          <a
            href={OTHER_BASE}
            hrefLang="vi"
            lang="vi"
            aria-label={content.langSwitch.toOther}
            onClick={keepAnchor}
            className={cn('flex min-h-11 min-w-11 items-center justify-center', other)}
          >
            {content.langSwitch.labelVi}
          </a>
        )}
      </span>
    </div>
  );
}
