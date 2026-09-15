import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  /** Phải khớp prop labelledBy của Section */
  id: string;
  overline?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  /** Trên nền đậm thì đảo màu chữ */
  onDeep?: boolean;
  className?: string;
}

export function SectionHeading({
  id,
  overline,
  title,
  description,
  align = 'left',
  onDeep = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-6 lg:mb-10',
        align === 'center' && 'mx-auto max-w-prose text-center',
        className,
      )}
    >
      {overline && (
        <p className={cn('text-overline uppercase', onDeep ? 'text-primary-300' : 'text-primary-700')}>
          {overline}
        </p>
      )}
      <h2 id={id} className={cn('mt-2 text-h2 lg:text-h2-lg', onDeep ? 'text-white' : 'text-ink')}>
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-3 max-w-prose text-body-lg lg:text-body-lg-d',
            align === 'center' && 'mx-auto',
            onDeep ? 'text-white/80' : 'text-ink-muted',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
