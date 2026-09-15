import { Clock, Headset, Map, Shield, Users, Wallet, type LucideIcon } from 'lucide-react';
import { content } from '@content';
import type { WhyIcon } from '@/content/types';
import { Reveal } from '@/components/common/Reveal';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';

const ICONS: Record<WhyIcon, LucideIcon> = {
  map: Map,
  wallet: Wallet,
  clock: Clock,
  users: Users,
  headset: Headset,
  shield: Shield,
};

export function WhyUs() {
  return (
    <Section id="why" bg="soft" labelledBy="why-heading">
      <SectionHeading
        id="why-heading"
        overline={content.whyUs.overline}
        title={content.whyUs.heading}
        description={content.whyUs.description}
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {content.whyUs.items.map((item, i) => {
          const Icon = ICONS[item.icon];
          return (
            <Reveal key={item.title} delay={i * 60}>
              <li className="h-full rounded-lg bg-base p-5 shadow-1">
                <span className="flex size-11 items-center justify-center rounded-md bg-primary-50">
                  <Icon aria-hidden="true" className="size-6 text-primary-600" />
                </span>
                <h3 className="mt-4 text-h3 text-ink">{item.title}</h3>
                <p className="mt-2 text-body text-ink-muted">{item.description}</p>
              </li>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
