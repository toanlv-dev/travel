import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

interface RevealProps {
  /** Phải khớp thẻ cha: trong <ul> thì 'li', trong <dl> thì 'div' — nếu không, danh sách mất ngữ nghĩa */
  as?: ElementType;
  children: ReactNode;
  /** Trễ nhẹ để các item trong một lưới hiện lần lượt */
  delay?: number;
  className?: string;
}

/** Hiện dần khi cuộn tới, chạy một lần. */
export function Reveal({ as: Tag = 'div', children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [scrolledTo, setScrolledTo] = useState(false);
  const reduced = usePrefersReducedMotion();
  // Giảm chuyển động: hiện sẵn, khỏi quan sát gì cả
  const shown = scrolledTo || reduced;

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setScrolledTo(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <Tag
      ref={ref}
      data-reveal={shown ? 'shown' : 'hidden'}
      style={{ transitionDelay: shown && delay ? `${delay}ms` : undefined }}
      className={cn(
        'transition-[opacity,transform] duration-reveal ease-out motion-reduce:transition-none',
        shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
