import type { ImageRef } from '@/types';

const W = [480, 720, 960, 1600];
/** Card không bao giờ vượt 960px kể cả ở DPR 2 nên bỏ mốc 1600 — xem scripts/optimize-images.mjs */
const W_CARD = [480, 720, 960];
const set = (dir: string, slugs: string[], widths = W): Record<string, ImageRef> =>
  Object.fromEntries(slugs.map((s) => [s, { name: `${dir}/${s}`, widths }]));

const hero = { name: 'hero/sapa-terraces', widths: W };
const about = { name: 'about/hoi-an-lanterns', widths: W };
const tours = set(
  'tours',
  ['sapa-trek', 'halong-cruise', 'phongnha-cave', 'hue-hoian', 'mekong-tour', 'dalat-tour'],
  W_CARD,
);

/** Chưa có ảnh thật từ chuyến đi của khách nên gallery dùng lại đúng những ảnh đã tải,
 *  không sinh thêm file. Khi có ảnh thật: thêm nhóm assets-src/images/gallery/ rồi trỏ sang. */
const gallery: Record<string, ImageRef> = { 'sapa-terraces': hero, 'hoi-an-lanterns': about, ...tours };

/** Đường dẫn ảnh (không dịch). Chữ `alt` nằm ở src/content/{en,vi}.ts. */
export const images = {
  hero,
  about,
  tours,
  destinations: set(
    'destinations',
    ['ha-long', 'sapa', 'ninh-binh', 'hue', 'hoi-an', 'da-nang', 'phong-nha', 'da-lat', 'mekong'],
    W_CARD,
  ),
  gallery,
  /** Bài viết cũng dùng lại ảnh đã tải — nội dung còn là bài mẫu. */
  posts: {
    'sapa-season': tours['sapa-trek'],
    'cave-packing': tours['phongnha-cave'],
    'eating-well': tours['mekong-tour'],
  } as Record<string, ImageRef>,
};
