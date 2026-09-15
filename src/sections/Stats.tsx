import { content } from '@content';
import { CountUp } from '@/components/common/CountUp';
import { Reveal } from '@/components/common/Reveal';
import { Section } from '@/components/layout/Section';

export function Stats() {
  return (
    <Section bg="deep" labelledBy="stats-heading">
      <h2 id="stats-heading" className="sr-only">
        {content.statsHeading}
      </h2>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
        {content.stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 80}>
            <div className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-h1 text-white lg:text-h1-lg">
                  <CountUp to={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                </span>
                <span className="mt-2 block text-small text-white/75">{stat.label}</span>
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
