import { content } from '@content';
import { Reveal } from '@/components/common/Reveal';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { clientLogos } from '@/data/clients';

export function Clients() {
  const waiting = content.clients.items.some((c) => !clientLogos[c.id]);

  return (
    <Section id="clients" bg="base" labelledBy="clients-heading">
      <SectionHeading
        id="clients-heading"
        overline={content.clients.overline}
        title={content.clients.heading}
        description={content.clients.description}
      />

      <Reveal>
        {/* Hộp cao cố định 64px: logo cao thấp khác nhau vẫn thẳng hàng */}
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {content.clients.items.map((c) => {
            const logo = clientLogos[c.id];
            return (
              <li key={c.id}>
                {logo ? (
                  <div className="flex h-16 items-center justify-center rounded-md border border-line bg-base px-4">
                    <img
                      src={`${import.meta.env.BASE_URL}images/clients/${logo}`}
                      alt={c.name}
                      loading="lazy"
                      className="max-h-10 w-auto object-contain opacity-70 grayscale transition duration-hover ease-out hover:opacity-100 hover:grayscale-0"
                    />
                  </div>
                ) : (
                  <div
                    data-placeholder="client-logo"
                    className="flex h-16 items-center justify-center rounded-md border border-dashed border-line-strong bg-soft px-3 text-center text-small text-ink-faint"
                  >
                    {c.name}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </Reveal>

      {waiting && <p className="mt-4 text-small text-ink-faint">{content.clients.placeholderNote}</p>}
    </Section>
  );
}
