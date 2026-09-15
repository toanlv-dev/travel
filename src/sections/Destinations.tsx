import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useSyncExternalStore } from 'react';
import { content } from '@content';
import { SmartImage } from '@/components/common/SmartImage';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { images } from '@/data/images';
import { cn } from '@/lib/cn';

export function Destinations() {
  const [emblaRef, embla] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' });

  // Trạng thái nút nằm bên trong Embla, không phải state của React — đọc bằng
  // useSyncExternalStore thay vì chép sang useState qua effect
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!embla) return () => {};
      embla.on('select', onChange).on('reInit', onChange);
      return () => {
        embla.off('select', onChange).off('reInit', onChange);
      };
    },
    [embla],
  );

  const canPrev = useSyncExternalStore(subscribe, () => embla?.canScrollPrev() ?? false, () => false);
  const canNext = useSyncExternalStore(subscribe, () => embla?.canScrollNext() ?? false, () => false);

  const arrow = 'flex size-11 items-center justify-center rounded-full border border-line-strong bg-base text-ink disabled:opacity-40';

  return (
    <Section id="destinations" bg="base" labelledBy="dest-heading" bare>
      <Container>
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            id="dest-heading"
            overline={content.destinations.overline}
            title={content.destinations.heading}
            description={content.destinations.description}
            className="mb-6 lg:mb-8"
          />
          {/* Dưới md đã vuốt được nên ẩn nút đi cho gọn */}
          <div className="mb-6 hidden shrink-0 gap-2 md:flex lg:mb-8">
            <button
              type="button"
              aria-label={content.destinations.prevLabel}
              onClick={() => embla?.scrollPrev()}
              disabled={!canPrev}
              className={arrow}
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              aria-label={content.destinations.nextLabel}
              onClick={() => embla?.scrollNext()}
              disabled={!canNext}
              className={arrow}
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>
      </Container>

      {/* Tràn ra mép màn hình: slide cuối không bị cắt cụt ở mobile */}
      <div ref={emblaRef} className="overflow-hidden">
        <ul className="ml-4 flex touch-pan-y gap-4 md:ml-6 xl:ml-8">
          {content.destinations.items.map((dest) => (
            <li
              key={dest.slug}
              className="min-w-0 shrink-0 basis-[62%] sm:basis-[40%] lg:basis-[26%] xl:basis-[22%]"
            >
              <figure className="overflow-hidden rounded-xl bg-base shadow-1">
                <SmartImage
                  image={images.destinations[dest.slug]}
                  alt={dest.imageAlt}
                  ratio="3/4"
                  sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 26vw, (min-width: 640px) 40vw, 62vw"
                />
                <figcaption className="p-4">
                  <p className={cn('text-h4 text-ink')}>{dest.name}</p>
                  <p className="mt-0.5 text-small text-ink-muted">{dest.tourCount}</p>
                </figcaption>
              </figure>
            </li>
          ))}
          <li aria-hidden="true" className="w-1 shrink-0" />
        </ul>
      </div>
    </Section>
  );
}
