/**
 * Tải ảnh placeholder từ Wikimedia Commons, có bước XEM TRƯỚC.
 * Ưu tiên PD/CC0, chấp nhận CC BY / CC BY-SA; loại mọi license khác.
 *
 *   review: node scripts/fetch-photos.mjs review "<từ khoá>" [--portrait]
 *           → tải ứng viên cỡ nhỏ vào .review/ để xem, in danh sách kèm chỉ số
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
        // Ảnh gốc quá nặng (> 25MB) thì đành dùng thumb lớn nhất mà Commons chịu tạo.
        big: (ii.size ?? 0) > 25_000_000 ? ii.thumburl.replace(/\/\d+px-/, '/1280px-') : ii.url,
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
} else if (mode === 'pick') {
  const [group, slug, idxRaw] = rest;
  const list = JSON.parse(await readFile(STATE, 'utf8'));
  const c = list[Number(idxRaw)];
  if (!c) { console.error(`Không có ứng viên số ${idxRaw}`); process.exit(1); }
  const dir = path.join('public/images/_src', group);
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
  console.log(`✓ _src/${group}/${slug}.jpg  ${c.license}  ${c.author.slice(0, 45)}`);
} else {
  console.error('mode phải là "review" hoặc "pick"');
  process.exit(1);
}
