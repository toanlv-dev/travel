import { useEffect, useRef, useState } from 'react';
import { content } from '@content';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

const LOCALE_TAG = content.locale === 'vi' ? 'vi-VN' : 'en-US';
const DURATION = 1400;

interface CountUpProps {
  to: number;
  decimals?: number;
  suffix?: string;
}

/** Đếm lên khi lộ ra viewport, chạy đúng một lần.
 *  Dấu phân cách nghìn khác nhau giữa hai ngôn ngữ (8,500 và 8.500) nên format theo locale. */
export function CountUp({ to, decimals = 0, suffix = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [counted, setCounted] = useState(0);
  const done = useRef(false);
  // Giảm chuyển động: hiện thẳng số cuối, không đếm
  const value = usePrefersReducedMotion() ? to : counted;

  useEffect(() => {
    const el = ref.current;
    if (!el || done.current) return;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        done.current = true;
        io.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / DURATION, 1);
          // easeOutCubic: nhanh lúc đầu rồi chậm dần, đỡ cảm giác máy móc
          setCounted(to * (1 - (1 - p) ** 3));
          if (p < 1) raf = requestAnimationFrame(tick);
          else setCounted(to);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  const text = value.toLocaleString(LOCALE_TAG, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} data-countup={value === to ? 'done' : 'running'}>
      {text}
      {suffix}
    </span>
  );
}
