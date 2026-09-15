import useEmblaCarousel from 'embla-carousel-react';
import { content } from '@content';
import { CarouselNav } from '@/components/common/CarouselNav';
import { SmartImage } from '@/components/common/SmartImage';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { images } from '@/data/images';
import { useEmblaNav } from '@/lib/useEmblaNav';

export function Destinations() {
  const [emblaRef, embla] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' });
  const { canPrev, canNext } = useEmblaNav(embla);

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
          <CarouselNav
            prevLabel={content.destinations.prevLabel}
            nextLabel={content.destinations.nextLabel}
            canPrev={canPrev}
            canNext={canNext}
            onPrev={() => embla?.scrollPrev()}
            onNext={() => embla?.scrollNext()}
            className="mb-6 lg:mb-8"
          />
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
                  <p className="text-h4 text-ink">{dest.name}</p>
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
