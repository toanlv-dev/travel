/**
 * Lighthouse mobile cho cả hai bản ngôn ngữ, đối chiếu ngân sách ở DESIGN_SYSTEM §9.
 * Chạy: npm run serve rồi npm run lh   (mặc định http://localhost:4180)
 * Đo bằng vite preview sẽ sai: preview không nén, JS về 364KB thay vì 113KB.
 */
import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';
import { writeFile } from 'node:fs/promises';

const BASE = process.argv[2] ?? 'http://localhost:4180';
// Lighthouse dao động mạnh giữa các lần chạy → lấy TRUNG VỊ, đừng tin một lần đo
const RUNS = Number(process.env.LH_RUNS ?? 3);
const median = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];
const PAGES = [
  { label: 'EN', path: '/' },
  { label: 'VI', path: '/vi/' },
];
const MIN = { performance: 90, accessibility: 95, 'best-practices': 95, seo: 95 };

const chrome = await launch({ chromeFlags: ['--headless=new', '--no-sandbox'] });
let failed = 0;

for (const { label, path } of PAGES) {
  const runs = [];
  for (let i = 0; i < RUNS; i++) {
    const { lhr, report } = await lighthouse(
      BASE + path,
      { port: chrome.port, output: 'html', logLevel: 'error' },
      undefined,
    );
    runs.push(lhr);
    if (i === 0) await writeFile(`lighthouse-${label.toLowerCase()}.html`, report);
  }

  console.log(`\n═══ ${label} — ${BASE}${path} (trung vị ${RUNS} lần)`);
  for (const [key, min] of Object.entries(MIN)) {
    const all = runs.map((r) => Math.round((r.categories[key]?.score ?? 0) * 100));
    const score = median(all);
    const ok = score >= min;
    if (!ok) failed++;
    console.log(`  ${ok ? '✅' : '❌'} ${key}: ${score} (cần ≥ ${min}) — các lần: ${all.join(', ')}`);
  }

  const a = runs[0].audits;
  const num = (id) => median(runs.map((r) => r.audits[id]?.numericValue ?? 0));
  const lcp = num('largest-contentful-paint') / 1000;
  const cls = num('cumulative-layout-shift');
  const weight = num('total-byte-weight') / 1024 / 1024;
  const checks = [
    [lcp <= 2.5, `LCP ${lcp.toFixed(2)}s (≤ 2.5s)`],
    [cls <= 0.05, `CLS ${cls.toFixed(3)} (≤ 0.05)`],
    [weight <= 1.2, `tổng trang ${weight.toFixed(2)}MB (≤ 1.2MB)`],
  ];
  for (const [ok, msg] of checks) {
    if (!ok) failed++;
    console.log(`  ${ok ? '✅' : '❌'} ${msg}`);
  }

  const problems = Object.values(a).filter(
    (x) => x.score !== null && x.score < 1 && ['opportunity', 'diagnostic'].includes(x.details?.type),
  );
  if (problems.length) {
    console.log('  ── điểm trừ đáng chú ý:');
    for (const x of problems.slice(0, 6)) console.log(`     · ${x.title}${x.displayValue ? ` — ${x.displayValue}` : ''}`);
  }
}

await chrome.kill();
console.log(failed === 0 ? '\n✅ Đạt toàn bộ ngân sách' : `\n❌ ${failed} chỉ tiêu chưa đạt`);
process.exit(failed === 0 ? 0 : 1);
