import { content } from '@content';
import { Reveal } from '@/components/common/Reveal';
import { SmartImage } from '@/components/common/SmartImage';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button-variants';
import type { ImageRef } from '@/types';

/** Trang tạm để kiểm bộ component nền. */
const demoImage: ImageRef = { name: 'demo/test-landscape', widths: [480, 960, 1600] };

export default function App() {
  return (
    <main id="main">
      <Section id="s-base" bg="base" labelledBy="h-base">
        <SectionHeading
          id="h-base"
          overline={content.hero.overline}
          title={content.hero.heading}
          description={content.hero.description}
        />
        <p className="mb-6 font-serif text-body-lg italic text-ink-muted">{content.hero.tagline}</p>
        <div className="flex flex-wrap gap-3">
          <Button>{content.hero.ctaPrimary}</Button>
          <a href="#s-soft" className={buttonVariants({ variant: 'outline' })}>
            {content.hero.ctaSecondary}
          </a>
        </div>
      </Section>

      <Section id="s-soft" bg="soft" labelledBy="h-soft">
        <SectionHeading id="h-soft" title="Section nền soft + Reveal + SmartImage" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Reveal key={i} delay={i * 80}>
              <article className="overflow-hidden rounded-lg bg-base shadow-1">
                <SmartImage
                  image={demoImage}
                  alt={content.hero.imageAlt}
                  ratio="4/3"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="p-4">
                  <h3 className="text-h3 text-ink">Card {i + 1}</h3>
                  <p className="mt-1 text-small text-ink-muted">{content.hero.trustLine}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="s-deep" bg="deep" size="lg" labelledBy="h-deep">
        <SectionHeading id="h-deep" onDeep overline="Deep" title="Section nền đậm" align="center" />
        <div className="flex justify-center">
          <a href="#s-base" className={buttonVariants({ variant: 'onDeep', size: 'lg' })}>
            {content.header.callCta}
          </a>
        </div>
      </Section>
    </main>
  );
}
