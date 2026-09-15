import useEmblaCarousel from 'embla-carousel-react';
import { Quote } from 'lucide-react';
import { content } from '@content';
import { CarouselNav } from '@/components/common/CarouselNav';
import { Rating } from '@/components/common/Rating';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { useEmblaNav } from '@/lib/useEmblaNav';

/** Chữ cái đầu của từ đầu và từ cuối — "Trần Thu Hà" → "TH". */
const initials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
};

export function Testimonials() {
  const [emblaRef, embla] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' });
  const { canPrev, canNext } = useEmblaNav(embla);

  return (
    <Section id="testimonials" bg="soft" labelledBy="testi-heading" bare>
      <Container>
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            id="testi-heading"
            overline={content.testimonials.overline}
            title={content.testimonials.heading}
            description={content.testimonials.description}
            className="mb-6 lg:mb-8"
          />
          <CarouselNav
            prevLabel={content.testimonials.prevLabel}
            nextLabel={content.testimonials.nextLabel}
            canPrev={canPrev}
            canNext={canNext}
            onPrev={() => embla?.scrollPrev()}
            onNext={() => embla?.scrollNext()}
            className="mb-6 lg:mb-8"
          />
        </div>
      </Container>

      <div ref={emblaRef} className="overflow-hidden">
        {/* items-stretch: chiều cao dải bằng slide dài nhất nên chuyển slide không nhảy layout */}
        <ul className="ml-4 flex touch-pan-y items-stretch gap-4 md:ml-6 xl:ml-8">
          {content.testimonials.items.map((t) => (
            <li
              key={t.id}
              className="min-w-0 shrink-0 basis-[86%] sm:basis-[60%] lg:basis-[38%] xl:basis-[30%]"
            >
              <figure className="flex h-full flex-col rounded-lg bg-base p-5 shadow-1">
                <Quote aria-hidden="true" className="size-6 text-primary-300" />
                <blockquote className="mt-3 flex-1 font-serif text-body-lg italic text-ink">
                  {t.quote}
                </blockquote>
                <Rating
                  value={t.rating}
                  label={content.testimonials.ratingLabel}
                  className="mt-4"
                />
                <figcaption className="mt-3 flex items-center gap-3 border-t border-line pt-3">
                  {/* Chưa có ảnh khách thật — vòng tròn chữ cái thay cho ảnh đại diện */}
                  <span
                    aria-hidden="true"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-small font-semibold text-primary-700"
                  >
                    {initials(t.author)}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-body font-semibold text-ink">{t.author}</span>
                    <span className="block text-small text-ink-faint">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
          <li aria-hidden="true" className="w-1 shrink-0" />
        </ul>
      </div>

      <Container>
        <p data-placeholder="testimonials" className="mt-5 text-small text-ink-faint">
          {content.testimonials.placeholderNote}
        </p>
      </Container>
    </Section>
  );
}
