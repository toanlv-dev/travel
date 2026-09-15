/**
 * Cắt font xuống đúng bộ chữ trang dùng (+ toàn bộ chữ cái tiếng Việt để nội dung đổi vẫn đủ).
 * Bản @fontsource đầy đủ tốn 141KB cho 7 file; đo bằng Lighthouse thì riêng font làm LCP chậm 0,7s.
 *
 * Cần: python3 -m fontTools (pip install fonttools brotli)
 * Chạy: npm run fonts    (sau khi đã có dist/ để lấy chữ thật; không có dist vẫn chạy được)
 */
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const OUT = 'src/assets/fonts';
const SOURCES = [
  { out: 'be-vietnam-pro-400', files: ['be-vietnam-pro-latin-400-normal.woff2', 'be-vietnam-pro-vietnamese-400-normal.woff2'], pkg: '@fontsource/be-vietnam-pro' },
  { out: 'be-vietnam-pro-600', files: ['be-vietnam-pro-latin-600-normal.woff2', 'be-vietnam-pro-vietnamese-600-normal.woff2'], pkg: '@fontsource/be-vietnam-pro' },
  { out: 'be-vietnam-pro-700', files: ['be-vietnam-pro-latin-700-normal.woff2', 'be-vietnam-pro-vietnamese-700-normal.woff2'], pkg: '@fontsource/be-vietnam-pro' },
  { out: 'lora-italic', files: ['lora-latin-wght-italic.woff2', 'lora-vietnamese-wght-italic.woff2'], pkg: '@fontsource-variable/lora' },
];

/** Chữ thật trên trang, lấy từ HTML đã dựng sẵn của cả hai bản */
async function charsFromBuild() {
  const out = new Set();
  for (const file of ['dist/index.html', 'dist/vi/index.html']) {
    const html = await readFile(file, 'utf8').catch(() => '');
    for (const ch of html.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/g, ' ')) out.add(ch);
  }
  return out;
}

/** Chữ cái tiếng Việt đầy đủ + dấu câu hay dùng — để nội dung đổi vẫn không thiếu glyph */
function safetyChars() {
  const out = new Set();
  for (let c = 0x20; c <= 0x7e; c++) out.add(String.fromCharCode(c));
  const ranges = [[0x00c0, 0x00ff], [0x0102, 0x0103], [0x0110, 0x0111], [0x0128, 0x0129], [0x0168, 0x0169], [0x01a0, 0x01b0], [0x1ea0, 0x1ef9], [0x0300, 0x0323]];
  for (const [a, b] of ranges) for (let c = a; c <= b; c++) out.add(String.fromCharCode(c));
  for (const ch of '–—‘’“”…·•©®™°₫△▲→←↑↓✓') out.add(ch);
  return out;
}

const chars = new Set([...(await charsFromBuild()), ...safetyChars()]);
const unicodes = [...chars]
  .map((c) => c.codePointAt(0))
  .filter((c) => c >= 0x20)
  .sort((a, b) => a - b)
  .map((c) => 'U+' + c.toString(16))
  .join(',');

await mkdir(OUT, { recursive: true });
let before = 0;
let after = 0;

for (const src of SOURCES) {
  const dir = path.join('node_modules', src.pkg, 'files');
  const inputs = (await readdir(dir)).filter((f) => src.files.includes(f));
  if (inputs.length === 0) throw new Error(`Không thấy file nguồn cho ${src.out} trong ${dir}`);

  // Gộp latin + vietnamese vào MỘT file: bớt được một request, và bản tiếng Anh cũng cần
  // dấu tiếng Việt để in đúng "Đà Nẵng", "Hạ Long"
  const merged = path.join(OUT, `${src.out}.woff2`);
  const parts = [];
  for (const [i, file] of inputs.entries()) {
    const input = path.join(dir, file);
    before += (await stat(input)).size;
    const tmp = path.join(OUT, `.tmp-${src.out}-${i}.ttf`);
    execFileSync('python3', ['-m', 'fontTools.subset', input, `--unicodes=${unicodes}`, '--layout-features=kern,liga,ccmp,mark,mkmk', '--flavor=', '--output-file=' + tmp, '--drop-tables+=DSIG', '--no-hinting']);
    parts.push(tmp);
  }
  execFileSync('python3', [path.resolve('scripts/merge-fonts.py'), merged, ...parts]);
  after += (await stat(merged)).size;
  for (const f of await readdir(OUT)) if (f.startsWith('.tmp-')) await rm(path.join(OUT, f));
  console.log(`✓ ${src.out}.woff2 — ${(await stat(merged)).size / 1024 | 0}KB`);
}

const css = SOURCES.map((s) => {
  const [family, weight, style] = s.out.startsWith('lora')
    ? ['Lora', '400', 'italic']
    : ['Be Vietnam Pro', s.out.split('-').pop(), 'normal'];
  return `@font-face {
  font-family: '${family}';
  font-style: ${style};
  font-weight: ${weight};
  font-display: swap;
  src: url('../assets/fonts/${s.out}.woff2') format('woff2');
}`;
}).join('\n\n');

await writeFile('src/styles/fonts.css', `/* SINH TỰ ĐỘNG bởi scripts/subset-fonts.mjs — đừng sửa tay. */\n${css}\n`);
console.log(`\nTổng: ${(before / 1024) | 0}KB → ${(after / 1024) | 0}KB (giảm ${(100 - (after / before) * 100) | 0}%)`);
