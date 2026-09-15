import type { ImageRef } from '@/types';

/** Đường dẫn ảnh (không dịch). Chữ `alt` nằm ở src/content/{en,vi}.ts. */
export const images = {
  hero: { name: 'hero/sapa-terraces', widths: [480, 960, 1600] },
  about: { name: 'about/hoi-an-lanterns', widths: [480, 960, 1600] },
} satisfies Record<string, ImageRef>;
