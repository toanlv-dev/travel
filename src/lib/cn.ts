import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/** Cỡ chữ tự đặt trong tailwind.config.ts. Không khai ở đây thì tailwind-merge coi `text-h4`
 *  là class MÀU chữ và bị `text-white` đè mất — im lặng, không báo lỗi. */
const FONT_SIZES = [
  'display',
  'display-lg',
  'h1',
  'h1-lg',
  'h2',
  'h2-lg',
  'h3',
  'h3-lg',
  'h4',
  'body-lg',
  'body-lg-d',
  'body',
  'small',
  'overline',
];

const twMerge = extendTailwindMerge({
  extend: { classGroups: { 'font-size': [{ text: FONT_SIZES }] } },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
