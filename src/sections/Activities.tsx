import * as Dialog from '@radix-ui/react-dialog';
import { Clock, MapPin, MessageCircle, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { content } from '@content';
import type { Region, Tour } from '@/content/types';
import { Reveal } from '@/components/common/Reveal';
import { SmartImage } from '@/components/common/SmartImage';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { buttonVariants } from '@/components/ui/button-variants';
import { company } from '@/data/company';
import { images } from '@/data/images';
import { cn } from '@/lib/cn';

type Filter = 'all' | Region;
const FILTERS: Filter[] = ['all', 'bac', 'trung', 'nam'];

const REGION_LABEL: Record<Region, string> = {
  bac: content.tours.filters.bac,
  trung: content.tours.filters.trung,
  nam: content.tours.filters.nam,
};

export function Activities() {
  const [filter, setFilter] = useState<Filter>('all');
  const [open, setOpen] = useState<Tour | null>(null);

  const shown =
    filter === 'all' ? content.tours.items : content.tours.items.filter((t) => t.region === filter);

  return (
    <Section id="tours" bg="soft" labelledBy="tours-heading">
      <SectionHeading
        id="tours-heading"
        overline={content.tours.overline}
        title={content.tours.heading}
        description={content.tours.description}
      />

      <div role="tablist" aria-label={content.tours.heading} className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((key) => (
          <button
            key={key}
            role="tab"
            aria-selected={filter === key}
            onClick={() => setFilter(key)}
            className={cn(
              'min-h-11 rounded-full px-4 text-body transition-colors duration-hover',
              filter === key
                ? 'bg-primary-600 font-semibold text-white'
                : 'bg-soft text-ink-muted hover:text-primary-700',
            )}
          >
            {content.tours.filters[key]}
          </button>
        ))}
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((tour, i) => (
          <Reveal as="li" key={tour.slug} delay={i * 60} className="h-full">
            {/* Cả card là một nút: không có nút đặt tour, bấm vào chỉ để xem lịch trình */}
            <button
              onClick={() => setOpen(tour)}
              className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-base text-left shadow-1 transition-shadow duration-hover hover:shadow-2"
            >
              <div className="relative">
                <SmartImage
                  image={images.tours[tour.slug]}
                  alt={tour.imageAlt}
                  ratio="4/3"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, calc(100vw - 2rem)"
                />
                <span className="bg-base/95 absolute left-3 top-3 rounded-full px-3 py-1 text-small font-semibold text-primary-700">
                  {REGION_LABEL[tour.region]}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="line-clamp-2 text-h3 text-ink">{tour.name}</h3>

                <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-small text-ink-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin aria-hidden="true" className="size-4" />
                    {tour.province}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock aria-hidden="true" className="size-4" />
                    {tour.duration}
                  </span>
                </p>

                <ul className="mt-3 flex-1 space-y-1.5">
                  {tour.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-small text-ink-muted">
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-primary-500"
                      />
                      {h}
                    </li>
                  ))}
                </ul>

                <span className="mt-4 text-body font-semibold text-primary-700">
                  {content.tours.detailCta}
                </span>
              </div>
            </button>
          </Reveal>
        ))}
      </ul>

      <Dialog.Root open={open !== null} onOpenChange={(v) => !v && setOpen(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
          <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-xl bg-base p-5 shadow-3 sm:inset-0 sm:m-auto sm:h-fit sm:max-w-lg sm:rounded-xl">
            {open && (
              <>
                <div className="flex items-start justify-between gap-4">
                  <Dialog.Title className="text-h3 text-ink">{open.name}</Dialog.Title>
                  <Dialog.Close
                    aria-label={content.header.closeMenu}
                    className="flex size-11 shrink-0 items-center justify-center rounded-md text-ink"
                  >
                    <X aria-hidden="true" className="size-5" />
                  </Dialog.Close>
                </div>

                <Dialog.Description className="mt-1 text-small text-ink-muted">
                  {open.province} · {content.tours.durationLabel}: {open.duration}
                </Dialog.Description>

                <h4 className="mt-5 text-h4 text-ink">{content.tours.itineraryLabel}</h4>
                <ol className="mt-2 space-y-3">
                  {open.itinerary.map((day) => (
                    <li key={day.label} className="border-l-2 border-primary-100 pl-4">
                      <p className="text-small font-semibold text-primary-700">{day.label}</p>
                      <p className="text-body text-ink-muted">{day.detail}</p>
                    </li>
                  ))}
                </ol>

                <p className="mt-5 rounded-md bg-soft p-3 text-small text-ink-muted">
                  {content.tours.quoteNote}
                </p>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <a href={`tel:${company.hotline}`} className={cn(buttonVariants(), 'flex-1')}>
                    <Phone aria-hidden="true" className="size-4" />
                    {content.mobileBar.call}
                  </a>
                  <a
                    href={company.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: 'outline' }), 'flex-1')}
                  >
                    <MessageCircle aria-hidden="true" className="size-4" />
                    {content.mobileBar.zalo}
                  </a>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Section>
  );
}
