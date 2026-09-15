import { content } from '@content';
import { MobileCallBar } from '@/components/common/MobileCallBar';
import { Reveal } from '@/components/common/Reveal';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { About } from '@/sections/About';
import { Header } from '@/sections/Header';
import { Hero } from '@/sections/Hero';
import { Stats } from '@/sections/Stats';
import { WhyUs } from '@/sections/WhyUs';

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-base focus:px-4 focus:py-3 focus:text-ink focus:shadow-3"
      >
        {content.header.skipToContent}
      </a>

      <Header />

      <main id="main">
        <Hero />
        <Stats />
        <About />
        <WhyUs />

        {/* Chỗ giữ cho các section sắp làm — đủ để kiểm anchor scroll và nền xen kẽ */}
        {content.nav
          .filter((item) => item.anchor !== 'about')
          .map((item, i) => (
            <Section
              key={item.anchor}
              id={item.anchor}
              bg={i % 2 === 0 ? 'base' : 'soft'}
              labelledBy={`h-${item.anchor}`}
            >
              <SectionHeading id={`h-${item.anchor}`} title={item.label} />
              <Reveal>
                <p className="text-body text-ink-muted">…</p>
              </Reveal>
            </Section>
          ))}
      </main>

      <MobileCallBar />
    </>
  );
}
