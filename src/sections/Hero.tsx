import { ArrowRight, Phone } from 'lucide-react';
import { content } from '@content';
import { SmartImage } from '@/components/common/SmartImage';
import { Container } from '@/components/layout/Container';
import { buttonVariants } from '@/components/ui/button-variants';
import { company } from '@/data/company';
import { images } from '@/data/images';
import { cn } from '@/lib/cn';

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative min-h-hero overflow-hidden">
      <SmartImage
        image={images.hero}
        alt={content.hero.imageAlt}
        fill
        priority
        sizes="100vw"
        imgClassName="object-[50%_40%]"
      />
      {/* Ảnh khách gửi sáng tối khó lường — luôn phủ overlay để chữ trắng đọc được */}
      <div aria-hidden="true" className="absolute inset-0 bg-overlay-media" />

      <Container className="relative flex min-h-hero flex-col justify-center py-20 lg:py-28">
        <div className="max-w-prose">
          <p className="text-overline uppercase text-primary-300">{content.hero.overline}</p>

          <h1 id="hero-heading" className="mt-3 text-display text-white lg:text-display-lg">
            {content.hero.heading}
          </h1>

          <p className="mt-3 font-serif text-body-lg italic text-white/85 lg:text-body-lg-d">
            {content.hero.tagline}
          </p>

          {/* Màn hẹp: bỏ đoạn mô tả để hero vừa đúng một màn hình, CTA không bị đẩy xuống dưới */}
          <p className="mt-4 hidden text-body text-white/85 sm:block lg:text-body-lg-d">
            {content.hero.description}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
            <a href={`tel:${company.hotline}`} className={buttonVariants({ variant: 'primary', size: 'lg' })}>
              <Phone aria-hidden="true" className="size-5" />
              {content.hero.ctaPrimary}
            </a>
            <a
              href="#tours"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'border border-white/70 bg-white/10 text-white backdrop-blur hover:bg-white/20',
              )}
            >
              {content.hero.ctaSecondary}
              <ArrowRight aria-hidden="true" className="size-5" />
            </a>
          </div>

          <p className="mt-6 text-small text-white/75 sm:mt-7">{content.hero.trustLine}</p>
        </div>
      </Container>
    </section>
  );
}
