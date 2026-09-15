/**
 * Quét a11y bằng axe-core trên cả hai bản ngôn ngữ, ở mobile và desktop.
 * Chạy: npm run a11y   (mặc định http://localhost:4173)
 */
import AxeBuilder from '@axe-core/playwright';
import { chromium } from 'playwright';

const BASE = process.argv[2] ?? 'http://localhost:4173';
const CASES = [
  { label: 'EN · 375px', path: '/', width: 375, height: 667 },
  { label: 'EN · 1280px', path: '/', width: 1280, height: 900 },
  { label: 'VI · 375px', path: '/vi/', width: 375, height: 667 },
  { label: 'VI · 1280px', path: '/vi/', width: 1280, height: 900 },
];

const browser = await chromium.launch({ channel: 'chrome' });
let total = 0;

for (const c of CASES) {
  const ctx = await browser.newContext({ viewport: { width: c.width, height: c.height } });
  const page = await ctx.newPage();
  await page.goto(BASE + c.path, { waitUntil: 'networkidle' });
  // Cuộn hết trang để mọi Reveal hiện ra — phần còn ẩn axe sẽ bỏ qua
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await page.waitForTimeout(400);

  const { violations } = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
    .analyze();

  console.log(`\n═══ ${c.label} — ${violations.length} lỗi`);
  for (const v of violations) {
    total++;
    console.log(`  ❌ [${v.impact}] ${v.id}: ${v.help}`);
    for (const n of v.nodes.slice(0, 3)) console.log(`       ${n.target.join(' ')} — ${n.failureSummary?.split('\n')[1]?.trim() ?? ''}`);
    if (v.nodes.length > 3) console.log(`       … và ${v.nodes.length - 3} chỗ nữa`);
  }
  await ctx.close();
}

await browser.close();
console.log(total === 0 ? '\n✅ axe-core: không có lỗi' : `\n❌ axe-core: ${total} loại lỗi`);
process.exit(total === 0 ? 0 : 1);
