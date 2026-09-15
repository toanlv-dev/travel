import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

interface CarouselNavProps {
  prevLabel: string;
  nextLabel: string;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}

const arrow =
  'flex size-11 items-center justify-center rounded-full border border-line-strong bg-base text-ink disabled:opacity-40';

/** Dưới md đã vuốt được nên ẩn nút đi cho gọn. */
export function CarouselNav({
  prevLabel,
  nextLabel,
  canPrev,
  canNext,
  onPrev,
  onNext,
  className,
}: CarouselNavProps) {
  return (
    <div className={cn('hidden shrink-0 gap-2 md:flex', className)}>
      <button type="button" aria-label={prevLabel} onClick={onPrev} disabled={!canPrev} className={arrow}>
        <ChevronLeft aria-hidden="true" className="size-5" />
      </button>
      <button type="button" aria-label={nextLabel} onClick={onNext} disabled={!canNext} className={arrow}>
        <ChevronRight aria-hidden="true" className="size-5" />
      </button>
    </div>
  );
}
