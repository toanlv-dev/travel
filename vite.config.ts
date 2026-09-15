import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import { content as en } from './src/content/en.ts';
import { content as vi } from './src/content/vi.ts';
import { company } from './src/data/company.ts';
import type { Locale, SiteContent } from './src/content/types.ts';

const byLocale: Record<Locale, SiteContent> = { en, vi };
const requested = process.env.VITE_LOCALE ?? 'en';

if (requested !== 'en' && requested !== 'vi') {
  throw new Error(`VITE_LOCALE không hợp lệ: "${requested}" (chỉ nhận 'en' hoặc 'vi')`);
}

const locale: Locale = requested;
const content = byLocale[locale];

/** '/' là tiếng Anh (mặc định), '/vi/' là tiếng Việt */
const base = locale === 'en' ? '/' : '/vi/';
const canonical = `${company.siteUrl}${base}`;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: company.name,
  url: canonical,
  telephone: company.hotline,
  address: { '@type': 'PostalAddress', streetAddress: company.address, addressCountry: 'VN' },
  areaServed: { '@type': 'Country', name: 'Vietnam' },
  inLanguage: locale,
});

/** Điền metadata theo ngôn ngữ vào index.html lúc build. */
function htmlMeta(): Plugin {
  return {
    name: 'html-meta-per-locale',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) =>
        html
          .replace(/%LANG%/g, locale)
          .replace(/%TITLE%/g, esc(content.seo.title))
          .replace(/%DESCRIPTION%/g, esc(content.seo.description))
          .replace(/%OG_LOCALE%/g, content.seo.ogLocale)
          .replace(/%CANONICAL%/g, canonical)
          .replace(/%URL_EN%/g, `${company.siteUrl}/`)
          .replace(/%URL_VI%/g, `${company.siteUrl}/vi/`)
          .replace(/%JSONLD%/g, jsonLd),
    },
  };
}

export default defineConfig({
  base,
  plugins: [react(), htmlMeta()],
  resolve: {
    alias: {
      // Component chỉ viết: import { content } from '@content'
      '@content': fileURLToPath(new URL(`./src/content/${locale}.ts`, import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: locale === 'en' ? 'dist' : 'dist/vi',
    // Chỉ bản 'en' được xoá dist — nếu không sẽ thổi bay dist/vi vừa build
    emptyOutDir: locale === 'en',
  },
});
