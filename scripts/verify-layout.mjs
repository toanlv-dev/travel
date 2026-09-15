/**
 * Kiểm layout bằng Chrome thật: tràn ngang, vùng chạm, nền section, reduced-motion.
 * Chạy: npm run verify           (mặc định http://localhost:4173)
 *       npm run verify -- <url>
 */
import { chromium } from 'playwright';

const BASE = process.argv[2] ?? 'http://localhost:4173';
const PAGES = [
  { label: 'EN', path: '/' },
  { label: 'VI', path: '/vi/' },
];
const WIDTHS = [375, 390, 414, 768, 1024, 1280, 1440];

let failed = 0;
const check = (ok, msg) => {
  if (!ok) failed++;
  console.log(`${ok ? '  ✅' : '  ❌'} ${msg}`);
};

const browser = await chromium.launch({ channel: 'chrome' });

for (const { label, path } of PAGES) {
  console.log(`\n═══ ${label} — ${BASE}${path}`);
  const ctx = await browser.newContext({ viewport: { width: 375, height: 667 } });
  const page = await ctx.newPage();
  await page.goto(BASE + path, { waitUntil: 'networkidle' });

  // <html lang> đúng bản
  const lang = await page.getAttribute('html', 'lang');
  check(lang === (label === 'EN' ? 'en' : 'vi'), `<html lang="${lang}">`);

  // Tràn ngang ở mọi breakpoint
  for (const w of WIDTHS) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.waitForTimeout(120);
    const overflow = await page.evaluate((vw) => {
      const bad = [...document.querySelectorAll('*')].filter(
        (el) => el.getBoundingClientRect().right > vw + 0.5,
      );
      return { count: bad.length, doc: document.documentElement.scrollWidth, sample: bad[0]?.tagName };
    }, w);
    check(
      overflow.count === 0 && overflow.doc <= w + 0.5,
      `${w}px — không tràn ngang (scrollWidth=${overflow.doc}${overflow.count ? `, ${overflow.count} phần tử tràn, vd <${overflow.sample}>` : ''})`,
    );
  }

  // Vùng chạm ≥ 44px ở mobile
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(120);
  const smallTargets = await page.evaluate(() =>
    [...document.querySelectorAll('a, button, [role="button"]')]
      .map((el) => ({ t: el.tagName, txt: el.textContent?.trim().slice(0, 24), r: el.getBoundingClientRect() }))
      .filter((x) => x.r.width > 0 && (x.r.height < 44 || x.r.width < 44))
      .map((x) => `<${x.t}> "${x.txt}" ${Math.round(x.r.width)}×${Math.round(x.r.height)}`),
  );
  check(smallTargets.length === 0, `vùng chạm ≥ 44px (${smallTargets.length} vi phạm) ${smallTargets.join(' | ')}`);

  // Nền section phải xen kẽ — hai section liền nhau không cùng màu nền
  const bgs = await page.evaluate(() =>
    [...document.querySelectorAll('section')].map((s) => getComputedStyle(s).backgroundColor),
  );
  const alternating = bgs.every((bg, i) => i === 0 || bg !== bgs[i - 1]);
  check(alternating && bgs.length >= 3, `nền xen kẽ (${bgs.length} section: ${bgs.join(' → ')})`);

  await ctx.close();
}

// Reduced motion: Reveal phải hiện sẵn, không có transform
console.log('\n═══ prefers-reduced-motion: reduce');
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  reducedMotion: 'reduce',
});
const page = await ctx.newPage();
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.waitForTimeout(300);
const reveal = await page.evaluate(() => {
  const el = document.querySelector('#s-soft article')?.parentElement;
  if (!el) return null;
  const cs = getComputedStyle(el);
  return { opacity: cs.opacity, transform: cs.transform };
});
check(reveal !== null, 'tìm thấy phần tử Reveal');
check(reveal?.opacity === '1', `Reveal hiện sẵn (opacity=${reveal?.opacity})`);
check(
  reveal?.transform === 'none' || reveal?.transform === 'matrix(1, 0, 0, 1, 0, 0)',
  `Reveal không dịch chuyển (transform=${reveal?.transform})`,
);
await ctx.close();

// Đối chứng: KHÔNG bật reduced-motion thì Reveal phải thật sự ẩn rồi mới hiện.
// Thiếu bước này, một Reveal hỏng (luôn trả div thường) vẫn qua được test ở trên.
console.log('\n═══ đối chứng: prefers-reduced-motion: no-preference');
const ctx2 = await browser.newContext({
  viewport: { width: 1280, height: 700 },
  reducedMotion: 'no-preference',
});
const p2 = await ctx2.newPage();
await p2.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
const sel = '#s-soft article';
await p2.waitForSelector(sel);
const before = await p2.evaluate((s) => {
  const el = document.querySelector(s)?.parentElement;
  return el ? getComputedStyle(el).opacity : null;
}, sel);
check(before !== null && Number(before) < 1, `trước khi cuộn tới: Reveal đang ẩn (opacity=${before})`);

await p2.locator(sel).first().scrollIntoViewIfNeeded();
await p2.waitForTimeout(700);
const after = await p2.evaluate((s) => {
  const el = document.querySelector(s)?.parentElement;
  return el ? getComputedStyle(el).opacity : null;
}, sel);
check(after === '1', `sau khi cuộn tới: Reveal đã hiện (opacity=${after})`);
await ctx2.close();

// SmartImage: trình duyệt phải chọn WebP, và chọn đúng mốc theo bề rộng hiển thị
console.log('\n═══ SmartImage — định dạng & mốc srcset');
// iPhone 8 là DPR 2: 375px CSS ở 1 cột cần ~750 device px → phải chọn mốc 960w, không phải 480w.
// Nếu chỉ test DPR 1 thì mốc nào cũng ra 480w và test không chứng minh được gì.
for (const [w, dpr, expect] of [[375, 2, '960'], [375, 1, '480'], [1440, 1, '480']]) {
  const c = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: dpr });
  const pg = await c.newPage();
  const imgReqs = [];
  pg.on('request', (r) => {
    if (r.resourceType() === 'image') imgReqs.push(r.url().split('/').pop());
  });
  await pg.goto(BASE + '/', { waitUntil: 'networkidle' });
  await pg.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await pg.waitForTimeout(900);
  const picked = imgReqs.filter((u) => u.startsWith('test-landscape'));
  check(
    picked.length > 0 && picked.every((u) => u.endsWith('.webp')),
    `${w}px @${dpr}x — chỉ tải WebP, không tải JPEG (${[...new Set(picked)].join(', ') || 'không có ảnh nào'})`,
  );
  check(
    picked.some((u) => u.includes(`-${expect}.`)),
    `${w}px @${dpr}x — chọn mốc ${expect}w theo sizes (đã tải: ${[...new Set(picked)].join(', ')})`,
  );
  await c.close();
}

// CLS: SmartImage khoá aspect-ratio nên ảnh tải xong không được làm nhảy layout
console.log('\n═══ CLS (ngân sách ≤ 0.05)');
const c3 = await browser.newContext({ viewport: { width: 375, height: 667 }, deviceScaleFactor: 2 });
const p3 = await c3.newPage();
await p3.addInitScript(() => {
  window.__cls = 0;
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
  }).observe({ type: 'layout-shift', buffered: true });
});
await p3.goto(BASE + '/', { waitUntil: 'networkidle' });
for (let i = 0; i < 6; i++) {
  await p3.evaluate(() => window.scrollBy(0, window.innerHeight));
  await p3.waitForTimeout(250);
}
const cls = await p3.evaluate(() => window.__cls);
check(cls <= 0.05, `CLS = ${cls.toFixed(4)}`);
await c3.close();

await browser.close();
console.log(failed === 0 ? '\n✅ TẤT CẢ PASS' : `\n❌ ${failed} kiểm tra THẤT BẠI`);
process.exit(failed === 0 ? 0 : 1);
