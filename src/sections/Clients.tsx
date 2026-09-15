import {
  Briefcase,
  Building2,
  Factory,
  GraduationCap,
  Landmark,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';
import { content } from '@content';
import type { ClientIcon } from '@/content/types';
import { clientLogos } from '@/data/clients';
import { Reveal } from '@/components/common/Reveal';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';

const ICONS: Record<ClientIcon, LucideIcon> = {
  tech: Building2,
  finance: Landmark,
  factory: Factory,
  school: GraduationCap,
  mice: Briefcase,
  group: UsersRound,
};

export function Clients() {
  return (
    <Section id="clients" bg="base" labelledBy="clients-heading">
      <SectionHeading
        id="clients-heading"
        overline={content.clients.overline}
        title={content.clients.heading}
        description={content.clients.description}
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.clients.segments.map((seg, i) => {
          const Icon = ICONS[seg.icon];
          return (
            <Reveal
              as="li"
              key={seg.id}
              delay={i * 60}
              className="flex h-full gap-4 rounded-lg border border-line bg-base p-5"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary-50">
                <Icon aria-hidden="true" className="size-5 text-primary-600" />
              </span>
              <div>
                <h3 className="text-h4 text-ink">{seg.name}</h3>
                <p className="mt-1 text-small text-ink-muted">{seg.description}</p>
              </div>
            </Reveal>
          );
        })}
      </ul>

      {clientLogos.length > 0 && (
        <Reveal className="mt-10">
          <h3 className="text-center text-overline uppercase text-ink-faint">
            {content.clients.logosHeading}
          </h3>
          {/* Hộp cao cố định 64px: logo cao thấp khác nhau vẫn thẳng hàng */}
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {clientLogos.map((logo) => (
              <li
                key={logo.file}
                className="flex h-16 items-center justify-center rounded-md border border-line bg-base px-4"
              >
                <img
                  src={`${import.meta.env.BASE_URL}images/clients/${logo.file}`}
                  alt={logo.name}
                  loading="lazy"
                  className="max-h-10 w-auto object-contain opacity-70 grayscale transition duration-hover ease-out hover:opacity-100 hover:grayscale-0"
                />
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      <p className="mt-4 text-small text-ink-faint">{content.clients.placeholderNote}</p>
    </Section>
  );
}
