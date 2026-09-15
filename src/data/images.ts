import type { ImageRef } from '@/types';

const W = [480, 960, 1600];
/** Card nhỏ hơn 960px kể cả ở DPR 2 nên không sinh mốc 1600 — xem scripts/optimize-images.mjs */
const W_CARD = [480, 960];
const set = (dir: string, slugs: string[], widths = W): Record<string, ImageRef> =>
  Object.fromEntries(slugs.map((s) => [s, { name: `${dir}/${s}`, widths }]));

/** Đường dẫn ảnh (không dịch). Chữ `alt` nằm ở src/content/{en,vi}.ts. */
export const images = {
  hero: { name: 'hero/sapa-terraces', widths: W },
  about: { name: 'about/hoi-an-lanterns', widths: W },
  tours: set(
    'tours',
    ['sapa-trek', 'halong-cruise', 'phongnha-cave', 'hue-hoian', 'mekong-tour', 'dalat-tour'],
    W_CARD,
  ),
  destinations: set(
    'destinations',
    ['ha-long', 'sapa', 'ninh-binh', 'hue', 'hoi-an', 'da-nang', 'phong-nha', 'da-lat', 'mekong'],
    W_CARD,
  ),
};
