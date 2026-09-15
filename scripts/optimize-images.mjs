/**
 * Ảnh gốc trong public/images/_src/<nhóm>/ → WebP + JPEG ở 3 mốc 480/960/1600
 * ghi ra public/images/<nhóm>/<slug>-<width>.<ext>.
 *
 * Chạy: npm run images
 */
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'public/images/_src';
const OUT = 'public/images';
const WIDTHS = [480, 960, 1600];
const INPUT_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

async function walk(dir) {
  const out = [];
  for (const name of await readdir(dir)) {
    const full = path.join(dir, name);
    if ((await stat(full)).isDirectory()) out.push(...(await walk(full)));
    else if (INPUT_EXT.has(path.extname(name).toLowerCase())) out.push(full);
  }
  return out;
}

const files = await walk(SRC).catch(() => []);
if (files.length === 0) {
  console.log(`Không có ảnh nào trong ${SRC}/ — bỏ qua.`);
  process.exit(0);
}

for (const file of files) {
  const rel = path.relative(SRC, file);
  const slug = path.basename(rel, path.extname(rel));
  const outDir = path.join(OUT, path.dirname(rel));
  await mkdir(outDir, { recursive: true });

  const meta = await sharp(file).metadata();
  for (const w of WIDTHS) {
    // Không phóng to ảnh nhỏ hơn mốc — chỉ làm mờ và tốn dung lượng
    if (meta.width && meta.width < w) continue;
    const base = sharp(file).resize({ width: w, withoutEnlargement: true });
    await base.clone().webp({ quality: 78 }).toFile(path.join(outDir, `${slug}-${w}.webp`));
    await base.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(outDir, `${slug}-${w}.jpg`));
  }
  console.log(`✓ ${rel}`);
}
console.log(`Xong ${files.length} ảnh.`);
