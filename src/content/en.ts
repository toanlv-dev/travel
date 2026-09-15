import type { SiteContent } from './types.ts';

// TODO: thay bằng nội dung thật của công ty (tên, slogan, số liệu).
export const content: SiteContent = {
  locale: 'en',
  seo: {
    title: 'Vietnam Travel Co. — Guided tours across Vietnam since 2013',
    description:
      'A licensed Vietnamese tour operator running guided trips from Sapa to Phu Quoc. 12 years, 8,500+ travellers, 4.9/5 average rating.',
    ogLocale: 'en_US',
  },
  nav: [
    { anchor: 'about', label: 'About us' },
    { anchor: 'tours', label: 'Tours' },
    { anchor: 'destinations', label: 'Destinations' },
    { anchor: 'clients', label: 'Our clients' },
    { anchor: 'contact', label: 'Contact' },
  ],
  langSwitch: {
    toOther: 'Xem bản tiếng Việt',
    labelEn: 'EN',
    labelVi: 'VI',
  },
  header: {
    navLabel: 'Main navigation',
    callCta: 'Free consultation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    skipToContent: 'Skip to main content',
  },
  hero: {
    overline: 'Licensed tour operator · Since 2013',
    heading: 'Discover Vietnam with people who live here',
    tagline: 'every valley, every coastline, every meal worth stopping for',
    description:
      'We design and run guided trips across all three regions of Vietnam — from the terraced hills of Sa Pa to the caves of Quang Binh and the islands of the south.',
    ctaPrimary: 'Call for free advice',
    ctaSecondary: 'Browse our tours',
    trustLine: '12 years · 8,500+ travellers · 4.9/5 average rating',
    imageAlt: 'Golden terraced rice fields on the hillsides of Sa Pa, northern Vietnam',
  },
  statsHeading: 'Our track record in numbers',
  stats: [
    { value: 12, label: 'years guiding in Vietnam' },
    { value: 8500, suffix: '+', label: 'travellers hosted' },
    { value: 640, suffix: '+', label: 'departures organised' },
    { value: 4.9, decimals: 1, label: 'average rating out of 5' },
  ],
  about: {
    overline: 'About us',
    heading: 'A local operator, not a booking website',
    body: [
      'We are a Vietnamese tour operator based in Ho Chi Minh City. Every itinerary we sell is one we have walked ourselves, with guides who grew up in the region they show you.',
      'We run our own departures rather than reselling other people’s seats. That means when plans change — a storm in Quang Binh, a road closed near Sa Pa — you talk to the people who can actually change them.',
    ],
    licenseLabel: 'International tour operator licence',
    imageAlt: 'Lantern-lit street in the old town of Hoi An in the evening',
  },
  whyUs: {
    overline: 'Why travel with us',
    heading: 'What you get that a booking site cannot give you',
    description:
      'We only run trips inside Vietnam. That narrowness is the point — it is why we know which road floods in October and which homestay actually has hot water.',
    items: [
      { icon: 'map', title: 'We know every region', description: 'North, Centre and South — our guides live in the places they take you to.' },
      { icon: 'wallet', title: 'Priced per group', description: 'Tell us how many people and what you want. We quote the whole trip, no hidden extras.' },
      { icon: 'clock', title: 'Answer within the hour', description: 'Office hours 8:00–20:00, seven days a week, by phone or Zalo.' },
      { icon: 'users', title: 'Guides, not couriers', description: 'Licensed guides who explain what you are looking at, in English or Vietnamese.' },
      { icon: 'headset', title: 'Reachable on the road', description: 'One number that stays the same before, during and after your trip.' },
      { icon: 'shield', title: 'Licensed and insured', description: 'Full international tour operator licence, with travel insurance on every departure.' },
    ],
  },
  mobileBar: {
    call: 'Call now',
    zalo: 'Zalo',
    messenger: 'Message',
  },
};
