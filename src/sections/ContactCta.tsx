import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { content } from '@content';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { buttonVariants } from '@/components/ui/button-variants';
import { company, mapsUrl } from '@/data/company';
import { cn } from '@/lib/cn';

// dl > div chỉ được chứa dt/dd → icon nằm TRONG dt, không phải bọc ngoài
const dtClass = 'flex items-center gap-2 text-small text-white/60';
const infoIcon = 'size-5 shrink-0 text-primary-300';

export function ContactCta() {
  return (
    <Section id="contact" bg="deep" size="lg" labelledBy="contact-heading">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <SectionHeading
            id="contact-heading"
            overline={content.contact.overline}
            title={content.contact.heading}
            description={content.contact.description}
            onDeep
            className="mb-6"
          />

          {/* Hotline là lối chuyển đổi chính — để cỡ chữ lớn nhất khối này */}
          <a
            href={`tel:${company.hotline}`}
            className="inline-flex min-h-11 items-center gap-3 text-h1 font-bold text-white lg:text-h1-lg"
          >
            <Phone aria-hidden="true" className="size-7 text-primary-300" />
            {company.hotlineDisplay}
          </a>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={company.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'onDeep' }), 'flex-1')}
            >
              <MessageCircle aria-hidden="true" className="size-5" />
              {content.mobileBar.zalo}
            </a>
            <a
              href={company.messenger}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'flex-1 border-white/40 bg-transparent text-white hover:border-white hover:text-white',
              )}
            >
              <Send aria-hidden="true" className="size-5" />
              {content.mobileBar.messenger}
            </a>
          </div>
        </div>

        <dl className="grid gap-5 self-center rounded-xl bg-white/5 p-6 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <dt className={dtClass}>
              <Mail aria-hidden="true" className={infoIcon} />
              {content.contact.emailLabel}
            </dt>
            <dd>
              <a
                href={`mailto:${company.email}`}
                className="inline-flex min-h-11 items-center text-body text-white"
              >
                {company.email}
              </a>
            </dd>
          </div>

          <div>
            <dt className={dtClass}>
              <Clock aria-hidden="true" className={infoIcon} />
              {content.contact.hoursLabel}
            </dt>
            <dd className="mt-1 text-body text-white">{content.contact.hours}</dd>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <dt className={dtClass}>
              <MapPin aria-hidden="true" className={infoIcon} />
              {content.contact.addressLabel}
            </dt>
            <dd className="mt-1 text-body text-white">{company.address}</dd>
            <dd>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-body font-semibold text-primary-300 underline underline-offset-4"
              >
                {content.contact.mapCta}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </Section>
  );
}
