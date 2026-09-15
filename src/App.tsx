import { content } from '@content';
import { MobileCallBar } from '@/components/common/MobileCallBar';
import { Reveal } from '@/components/common/Reveal';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { About } from '@/sections/About';
import { Activities } from '@/sections/Activities';
import { Clients } from '@/sections/Clients';
import { Destinations } from '@/sections/Destinations';
import { Gallery } from '@/sections/Gallery';
import { Header } from '@/sections/Header';
import { Hero } from '@/sections/Hero';
import { Stats } from '@/sections/Stats';
import { Testimonials } from '@/sections/Testimonials';
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
        <Activities />
        <Destinations />
        <WhyUs />
        <Clients />
        <Testimonials />
        <Gallery />

        {/* Chỗ giữ cho các section sắp làm — đủ để kiểm anchor scroll và nền xen kẽ */}
        {content.nav
          .filter((item) => !['about', 'tours', 'destinations', 'clients'].includes(item.anchor))
          .map((item) => (
            <Section key={item.anchor} id={item.anchor} bg="soft" labelledBy={`h-${item.anchor}`}>
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
