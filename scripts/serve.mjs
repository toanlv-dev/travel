/**
 * Server tĩnh CÓ gzip để đo hiệu năng cho sát production.
 * `vite preview` trả file thô (JS 364KB thay vì 113KB) nên mọi số đo trên nó đều bi quan giả tạo.
 *
 * Chạy: node scripts/serve.mjs [port]
 */
import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { promisify } from 'node:util';
import { gzip as gzipCb } from 'node:zlib';

const gzipAsync = promisify(gzipCb);
// Nén một lần rồi giữ trong bộ nhớ: nén lại mỗi request làm TTFB xấu đi và nhiễu kết quả đo
const cache = new Map();

const PORT = Number(process.argv[2] ?? 4180);
const ROOT = path.resolve('dist');
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.json': 'application/json',
};
// Ảnh và font đã nén sẵn, gzip thêm chỉ tốn CPU
const COMPRESS = new Set(['.html', '.js', '.css', '.svg', '.xml', '.txt', '.json']);

createServer(async (req, res) => {
  const url = decodeURIComponent((req.url ?? '/').split('?')[0]);
  let file = path.join(ROOT, url);
  if (!file.startsWith(ROOT)) return res.writeHead(403).end();

  const info = await stat(file).catch(() => null);
  if (info?.isDirectory()) file = path.join(file, 'index.html');
  if (!(await stat(file).catch(() => null))) return res.writeHead(404).end('404');

  const ext = path.extname(file);
  const headers = { 'content-type': TYPES[ext] ?? 'application/octet-stream' };
  const gzip = COMPRESS.has(ext) && /\bgzip\b/.test(req.headers['accept-encoding'] ?? '');
  if (gzip) headers['content-encoding'] = 'gzip';

  // Khoá cache kèm mtime: build lại mà không đổi khoá thì server trả bytes cũ, đo ra số sai
  const key = `${file}:${gzip}:${(await stat(file)).mtimeMs}`;
  if (!cache.has(key)) {
    const raw = await readFile(file);
    cache.set(key, gzip ? await gzipAsync(raw, { level: 9 }) : raw);
  }
  const body = cache.get(key);
  res.writeHead(200, { ...headers, 'content-length': body.length });
  res.end(body);
}).listen(PORT, () => console.log(`dist/ (có gzip) → http://localhost:${PORT}`));
