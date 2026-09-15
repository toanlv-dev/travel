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
    imageAlt: 'Terraced rice fields in northern Vietnam at sunrise',
  },
};
