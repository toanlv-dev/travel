import { BadgeCheck } from 'lucide-react';
import { content } from '@content';
import { Reveal } from '@/components/common/Reveal';
import { SmartImage } from '@/components/common/SmartImage';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { company } from '@/data/company';
import { images } from '@/data/images';

export function About() {
  return (
    <Section id="about" bg="base" labelledBy="about-heading">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Mobile xếp dọc và ảnh lên trước: người đọc thấy nơi chốn trước khi đọc chữ */}
        <Reveal className="order-1 lg:order-2">
          <SmartImage
            image={images.about}
            alt={content.about.imageAlt}
            ratio="3/2"
            sizes="(min-width: 1024px) 50vw, calc(100vw - 2rem)"
            className="rounded-xl shadow-2"
          />
        </Reveal>

        <div className="order-2 lg:order-1">
          <SectionHeading
            id="about-heading"
            overline={content.about.overline}
            title={content.about.heading}
          />
          {content.about.body.map((para) => (
            <p key={para.slice(0, 24)} className="mb-4 max-w-prose text-body text-ink-muted">
              {para}
            </p>
          ))}

          <p className="mt-6 inline-flex items-start gap-3 rounded-lg bg-soft p-4 text-small">
            <BadgeCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary-600" />
            <span className="text-ink">
              {content.about.licenseLabel}
              <span className="mt-0.5 block font-semibold">{company.licenseNo}</span>
            </span>
          </p>
        </div>
      </div>
    </Section>
  );
}
