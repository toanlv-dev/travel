import { content } from '@content';
import { MobileCallBar } from '@/components/common/MobileCallBar';
import { About } from '@/sections/About';
import { Activities } from '@/sections/Activities';
import { Clients } from '@/sections/Clients';
import { ContactCta } from '@/sections/ContactCta';
import { Destinations } from '@/sections/Destinations';
import { Footer } from '@/sections/Footer';
import { Gallery } from '@/sections/Gallery';
import { Header } from '@/sections/Header';
import { Hero } from '@/sections/Hero';
import { Posts } from '@/sections/Posts';
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
        <Posts />
        <ContactCta />
      </main>

      <Footer />
      <MobileCallBar />
    </>
  );
}
