/**
 * Ảnh gốc trong assets-src/images/<nhóm>/ → WebP + JPEG ở các mốc 480/720/960/1600
 * ghi ra public/images/<nhóm>/<slug>-<width>.<ext>.
 * Ảnh gốc để NGOÀI public/ vì Vite copy nguyên public/ vào mỗi bản build.
 *
 * Chạy: npm run images
 */
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'assets-src/images';
const OUT = 'public/images';
// Mốc 720: điện thoại thường là ~412px CSS ở DPR 1.75 → cần ~720px, ép lên 960 là thừa ~40% byte
const WIDTHS = [480, 720, 960, 1600];
// Card tour ~33vw, card điểm đến ~22vw → ngay cả ở DPR 2 cũng không quá 960px; mốc 1600 chỉ
// tổ phình repo mà trình duyệt không bao giờ chọn.
const MAX_WIDTH_BY_GROUP = { tours: 960, destinations: 960 };
// Ảnh Commons hầu hết là khổ ngang; card cần tỉ lệ cố định nên cắt theo nhóm.
// 'attention' để sharp tự chọn vùng nhiều chi tiết thay vì cắt giữa một cách máy móc.
const RATIO_BY_GROUP = { destinations: 3 / 4, tours: 4 / 3 };
// hero nằm dưới lớp phủ tối 46–76%; ảnh card hiển thị nhỏ → cả hai hạ chất lượng không nhìn ra
const QUALITY_BY_GROUP = { hero: 60, tours: 68, destinations: 68, about: 70 };
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
  const group = rel.split(path.sep)[0];
  const ratio = RATIO_BY_GROUP[group];
  const maxW = MAX_WIDTH_BY_GROUP[group] ?? Infinity;
  for (const w of WIDTHS) {
    if (w > maxW) continue;
    // Không phóng to ảnh nhỏ hơn mốc — chỉ làm mờ và tốn dung lượng
    if (meta.width && meta.width < w) continue;
    const base = ratio
      ? sharp(file).resize(w, Math.round(w / ratio), { fit: 'cover', position: 'attention' })
      : sharp(file).resize({ width: w, withoutEnlargement: true });
    const q = QUALITY_BY_GROUP[group] ?? 78;
    await base.clone().webp({ quality: q }).toFile(path.join(outDir, `${slug}-${w}.webp`));
    await base.clone().jpeg({ quality: q + 2, mozjpeg: true }).toFile(path.join(outDir, `${slug}-${w}.jpg`));
  }
  console.log(`✓ ${rel}`);
}
console.log(`Xong ${files.length} ảnh.`);
