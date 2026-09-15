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

/** Bản build phụ để dựng sẵn HTML — xem scripts/prerender.mjs */
const ssrBuild = process.env.SSR_BUILD === '1';

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
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.mapsQuery,
    addressLocality: locale === 'vi' ? 'Hà Nội' : 'Hanoi',
    addressCountry: 'VN',
  },
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

/** sitemap.xml + robots.txt chỉ sinh ở bản 'en' — chúng nằm ở gốc domain, không nhân đôi cho /vi/. */
function siteFiles(): Plugin {
  return {
    name: 'sitemap-robots',
    apply: 'build',
    generateBundle() {
      if (locale !== 'en') return;
      const urls = ['/', '/vi/']
        .map(
          (path) => `  <url>
    <loc>${company.siteUrl}${path}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${company.siteUrl}/" />
    <xhtml:link rel="alternate" hreflang="vi" href="${company.siteUrl}/vi/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${company.siteUrl}/" />
  </url>`,
        )
        .join('\n');

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`,
      });

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\nSitemap: ${company.siteUrl}/sitemap.xml\n`,
      });
    },
  };
}

/** Nhúng thẳng CSS vào HTML.
 *  HTML đã dựng sẵn nên chữ vẽ được ngay khi tải xong HTML — nhưng <link rel="stylesheet"> chặn
 *  render thêm một vòng round-trip (Lighthouse báo 450–750ms trên 4G giả lập). Bộ CSS chỉ 7KB gzip
 *  nên nhúng luôn: mất một vòng đi về, và @font-face được phát hiện sớm hơn. */
function inlineCss(): Plugin {
  return {
    name: 'inline-css',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const bundle = ctx.bundle ?? {};
        for (const [file, asset] of Object.entries(bundle)) {
          if (!file.endsWith('.css') || asset.type !== 'asset') continue;
          let css = String(asset.source);
          if (process.env.FONT_DISPLAY) css = css.replace(/font-display:swap/g, `font-display:${process.env.FONT_DISPLAY}`);
          html = html
            .replace(new RegExp(`<link[^>]+href="[^"]*${file.split('/').pop()}"[^>]*>`), '')
            .replace('</head>', `<style>${css}</style></head>`);
          delete bundle[file];
        }
        return html;
      },
    },
  };
}

export default defineConfig({
  base,
  plugins: [react(), htmlMeta(), inlineCss(), siteFiles()],
  resolve: {
    alias: {
      // Component chỉ viết: import { content } from '@content'
      '@content': fileURLToPath(new URL(`./src/content/${locale}.ts`, import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: ssrBuild
    ? { ssr: 'src/entry-server.tsx', outDir: `dist-ssr/${locale}`, emptyOutDir: true }
    : {
        outDir: locale === 'en' ? 'dist' : 'dist/vi',
        // Chỉ bản 'en' được xoá dist — nếu không sẽ thổi bay dist/vi vừa build
        emptyOutDir: locale === 'en',
      },
});
