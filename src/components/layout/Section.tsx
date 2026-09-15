import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';

/** Hai section liền nhau không được cùng nền. */
type SectionBg = 'base' | 'soft' | 'deep';

interface SectionProps {
  id?: string;
  bg?: SectionBg;
  /** 'lg' cho section trọng tâm, 'xl' cho khối CTA lớn */
  size?: 'default' | 'lg' | 'xl';
  /** id của tiêu đề section, để screen reader biết vùng này nói về gì */
  labelledBy?: string;
  className?: string;
  /** Bỏ Container khi section cần tràn viền (carousel, ảnh full-bleed) */
  bare?: boolean;
  children: ReactNode;
}

const bgClass: Record<SectionBg, string> = {
  base: 'bg-base text-ink',
  soft: 'bg-soft text-ink',
  deep: 'bg-deep text-white',
};

const sizeClass = {
  default: 'py-section lg:py-section-lg',
  lg: 'py-section lg:py-section-lg xl:py-section-xl',
  xl: 'py-section-lg lg:py-section-xl',
};

export function Section({
  id,
  bg = 'base',
  size = 'default',
  labelledBy,
  className,
  bare = false,
  children,
}: SectionProps) {
  const content = bare ? children : <Container>{children}</Container>;
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(bgClass[bg], sizeClass[size], className)}
    >
      {content}
    </section>
  );
}
