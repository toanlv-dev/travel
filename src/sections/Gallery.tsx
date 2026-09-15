import { useRef, useState } from 'react';
import { content } from '@content';
import { Lightbox } from '@/components/common/Lightbox';
import { Reveal } from '@/components/common/Reveal';
import { SmartImage } from '@/components/common/SmartImage';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { images } from '@/data/images';

const items = content.gallery.items.map((g) => ({
  image: images.gallery[g.slug],
  alt: g.alt,
  caption: g.caption,
}));

export function Gallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <Section id="gallery" bg="base" labelledBy="gallery-heading">
      <SectionHeading
        id="gallery-heading"
        overline={content.gallery.overline}
        title={content.gallery.heading}
        description={content.gallery.description}
      />

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {content.gallery.items.map((g, i) => (
          <Reveal as="li" key={g.slug} delay={i * 40}>
            <button
              ref={(el) => {
                tiles.current[i] = el;
              }}
              type="button"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              className="block w-full overflow-hidden rounded-md shadow-1 transition-shadow duration-hover hover:shadow-2"
            >
              <SmartImage
                image={images.gallery[g.slug]}
                alt={g.alt}
                ratio="4/3"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, calc(50vw - 1.5rem)"
              />
              <span className="sr-only">{content.gallery.openLabel}</span>
            </button>
          </Reveal>
        ))}
      </ul>

      <Lightbox
        items={items}
        open={open}
        index={index}
        onIndexChange={setIndex}
        onClose={() => setOpen(false)}
        onReturnFocus={(i) => tiles.current[i]?.focus()}
        labels={{
          close: content.gallery.closeLabel,
          prev: content.gallery.prevLabel,
          next: content.gallery.nextLabel,
          counter: content.gallery.counterLabel,
        }}
      />
    </Section>
  );
}
