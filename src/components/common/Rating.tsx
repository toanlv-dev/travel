import { Star } from 'lucide-react';
import { cn } from '@/lib/cn';

interface RatingProps {
  /** Số sao sáng, 0–5 */
  value: number;
  /** Mẫu chữ có {n}, ví dụ "{n} trên 5 sao" — sao là hình nên cần chữ cho screen reader */
  label: string;
  className?: string;
}

const MAX = 5;

export function Rating({ value, label, className }: RatingProps) {
  return (
    <p
      role="img"
      aria-label={label.replace('{n}', String(value))}
      className={cn('flex gap-0.5', className)}
    >
      {Array.from({ length: MAX }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn('size-4', i < value ? 'fill-accent text-accent' : 'text-line-strong')}
        />
      ))}
    </p>
  );
}
