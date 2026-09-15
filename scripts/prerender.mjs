/**
 * Dựng sẵn HTML của trang vào index.html sau khi build.
 * Trang là SPA nên nếu không có bước này, trình duyệt phải tải xong JS mới vẽ được chữ đầu tiên
 * — LCP đo trên 4G giả lập là 3,3s. Có HTML sẵn thì chữ hiện ngay, JS chỉ việc hydrate.
 *
 * Chạy: VITE_LOCALE=<en|vi> node scripts/prerender.mjs   (sau `vite build` và `vite build --ssr`)
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const locale = process.env.VITE_LOCALE ?? 'en';
const outDir = locale === 'en' ? 'dist' : 'dist/vi';
const htmlPath = path.join(outDir, 'index.html');

const { render } = await import(pathToFileURL(path.resolve(`dist-ssr/${locale}/entry-server.js`)).href);
const body = render();

const html = await readFile(htmlPath, 'utf8');
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error(`Không tìm thấy ${marker} trong ${htmlPath}`);

await writeFile(htmlPath, html.replace(marker, `<div id="root">${body}</div>`));
console.log(`✓ dựng sẵn HTML cho bản ${locale}: ${(body.length / 1024).toFixed(1)}KB vào ${htmlPath}`);
