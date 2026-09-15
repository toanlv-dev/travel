/**
 * Tải ảnh placeholder từ Wikimedia Commons, có bước XEM TRƯỚC.
 * Ưu tiên PD/CC0, chấp nhận CC BY / CC BY-SA; loại mọi license khác.
 *
 *   review: node scripts/fetch-photos.mjs review "<từ khoá>" [--portrait]
 *           → tải ứng viên cỡ nhỏ vào .review/ để xem, in danh sách kèm chỉ số
 *   multi:  node scripts/fetch-photos.mjs multi [--portrait] "slug=từ khoá" "slug2=từ khoá2" …
 *           → mỗi slug lấy 3 ứng viên, ghép tất cả vào MỘT ảnh .review/sheet.jpg có đánh nhãn
 *   pick:   node scripts/fetch-photos.mjs pick <nhóm> <slug> <chỉ số>
 *           → tải bản 2400px của ứng viên đó vào _src/<nhóm>/ và ghi CREDITS.md
 */
import { mkdir, writeFile, appendFile, readFile } from 'node:fs/promises';
import path from 'node:path';

const UA = 'page-du-lich/1.0 (https://github.com/toanlv-dev/travel)';
const REVIEW_DIR = '.review';
const STATE = path.join(REVIEW_DIR, 'candidates.json');
const OK_LICENSE = /^(cc0|public domain|pd|cc by [0-9.]+|cc by-sa [0-9.]+)$/i;
// Ảnh vệ tinh / bản đồ / sơ đồ lọt vào rất nhiều khi tìm địa danh — loại thẳng
const REJECT = /satellite|landsat|sentinel|nasa|from space|map of|topograph|diagram|chart|coat of arms|flag of|logo|stamp|banknote|panorama of the world/i;
const strip = (h) => (h ?? '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

async function search(query, portrait) {
  const api = new URL('https://commons.wikimedia.org/w/api.php');
  Object.entries({
    action: 'query', generator: 'search', gsrsearch: `${query} filetype:bitmap`,
    gsrnamespace: '6', gsrlimit: '40', prop: 'imageinfo',
    iiprop: 'url|size|extmetadata', iiurlwidth: '900', format: 'json',
  }).forEach(([k, v]) => api.searchParams.set(k, v));

  const r = await fetch(api, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(`Commons trả ${r.status}`);

  return Object.values((await r.json()).query?.pages ?? {})
    .map((p) => {
      const ii = p.imageinfo?.[0];
      if (!ii) return null;
      const em = ii.extmetadata ?? {};
      return {
        title: p.title.replace(/^File:/, ''),
        page: ii.descriptionurl,
        width: ii.width, height: ii.height,
        preview: ii.thumburl,
        // Commons từ chối tạo thumb > ~1280px cho ảnh lớn → lấy bản gốc, sharp lo việc thu nhỏ.
        // Chỉ lùi về thumb khi ảnh gốc thật sự khổng lồ; 1280px không đủ cho ảnh hiển thị 2 cột ở DPR 2.
        big: (ii.size ?? 0) > 80_000_000 ? ii.thumburl.replace(/\/\d+px-/, '/1280px-') : ii.url,
        bytes: ii.size ?? 0,
        license: strip(em.LicenseShortName?.value) || 'unknown',
        author: strip(em.Artist?.value) || '—',
      };
    })
    .filter(Boolean)
    .filter((c) => OK_LICENSE.test(c.license))
    .filter((c) => !REJECT.test(`${c.title} ${c.author}`))
    .filter((c) => c.width >= (portrait ? 1200 : 1600))
    .filter((c) => (portrait ? c.height > c.width : c.width > c.height * 1.2))
    .slice(0, 8);
}

const dl = async (url, dest) => {
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(`Tải lỗi ${r.status}: ${url}`);
  await writeFile(dest, Buffer.from(await r.arrayBuffer()));
};

const [mode, ...rest] = process.argv.slice(2);

if (mode === 'review') {
  const [query, ...flags] = rest;
  const list = await search(query, flags.includes('--portrait'));
  if (!list.length) { console.error(`Không có ứng viên hợp lệ cho "${query}"`); process.exit(1); }
  await mkdir(REVIEW_DIR, { recursive: true });
  await writeFile(STATE, JSON.stringify(list, null, 2));
  for (const [i, c] of list.entries()) {
    await dl(c.preview, path.join(REVIEW_DIR, `${i}.jpg`));
    console.log(`[${i}] ${c.width}×${c.height}  ${c.license.padEnd(14)} ${c.title.slice(0, 55)}`);
  }
  console.log(`\nXem ảnh trong ${REVIEW_DIR}/ rồi chạy: node scripts/fetch-photos.mjs pick <nhóm> <slug> <chỉ số>`);
} else if (mode === 'multi') {
  const portrait = rest.includes('--portrait');
  const pairs = rest.filter((a) => a !== '--portrait').map((a) => {
    const i = a.indexOf('=');
    return [a.slice(0, i), a.slice(i + 1)];
  });

  await mkdir(REVIEW_DIR, { recursive: true });
  const sharp = (await import('sharp')).default;
  const PER = 3;
  const CW = portrait ? 240 : 320;
  const CH = portrait ? 320 : 240;
  const COLS = 6;

  const state = {};
  const tiles = [];
  for (const [slug, query] of pairs) {
    const list = (await search(query, portrait)).slice(0, PER);
    state[slug] = list;
    if (!list.length) console.warn(`⚠ không có ứng viên cho "${query}" (${slug})`);
    for (const [i, c] of list.entries()) {
      const buf = Buffer.from(await (await fetch(c.preview, { headers: { 'User-Agent': UA } })).arrayBuffer());
      tiles.push({ label: `${slug}#${i}`, buf });
    }
  }
  await writeFile(STATE, JSON.stringify(state, null, 2));

  const rows = Math.ceil(tiles.length / COLS);
  const composites = [];
  for (const [i, t] of tiles.entries()) {
    const x = (i % COLS) * CW;
    const y = Math.floor(i / COLS) * CH;
    composites.push({ input: await sharp(t.buf).resize(CW, CH, { fit: 'cover' }).toBuffer(), left: x, top: y });
    const label = Buffer.from(
      `<svg width="${CW}" height="26"><rect width="${CW}" height="26" fill="rgba(0,0,0,.72)"/>` +
      `<text x="6" y="18" font-family="sans-serif" font-size="15" fill="#fff">${t.label}</text></svg>`,
    );
    composites.push({ input: label, left: x, top: y });
  }

  await sharp({ create: { width: COLS * CW, height: rows * CH, channels: 3, background: '#222' } })
    .composite(composites)
    .jpeg({ quality: 82 })
    .toFile(path.join(REVIEW_DIR, 'sheet.jpg'));

  console.log(`✓ ${REVIEW_DIR}/sheet.jpg — ${tiles.length} ứng viên của ${pairs.length} slug`);
  for (const [slug, list] of Object.entries(state)) {
    console.log(`  ${slug}: ${list.map((c, i) => `#${i} ${c.license}`).join('  ')}`);
  }
} else if (mode === 'pick') {
  const [group, slug, idxRaw] = rest;
  const saved = JSON.parse(await readFile(STATE, 'utf8'));
  const list = Array.isArray(saved) ? saved : (saved[slug] ?? []);
  const c = list[Number(idxRaw)];
  if (!c) { console.error(`Không có ứng viên số ${idxRaw}`); process.exit(1); }
  const dir = path.join('assets-src/images', group);
  await mkdir(dir, { recursive: true });
  const dest = path.join(dir, `${slug}.jpg`);
  await dl(c.big, dest);

  // Hạ về 2400px ngay khi tải: ảnh gốc Commons có thể hàng chục MP, giữ nguyên chỉ tổ phình repo
  const sharp = (await import('sharp')).default;
  const meta = await sharp(dest).metadata();
  if ((meta.width ?? 0) > 2400) {
    const buf = await sharp(dest).resize({ width: 2400 }).jpeg({ quality: 90 }).toBuffer();
    await writeFile(dest, buf);
  }
  await appendFile(
    'public/images/CREDITS.md',
    `| \`${group}/${slug}\` | [${c.title}](${c.page}) | ${c.author} | ${c.license} | ${c.width}×${c.height} |\n`,
  );
  console.log(`✓ assets-src/images/${group}/${slug}.jpg  ${c.license}  ${c.author.slice(0, 45)}`);
} else {
  console.error('mode phải là "review", "multi" hoặc "pick"');
  process.exit(1);
}
