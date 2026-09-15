/** Khung nội dung toàn trang. `en.ts` và `vi.ts` bị ép cùng shape
 *  → thiếu bản dịch là lỗi compile, không phải lỗi runtime. */

export type Locale = 'en' | 'vi';

export interface SeoMeta {
  /** Dùng cho <title> và og:title */
  title: string;
  description: string;
  /** og:locale — 'en_US' | 'vi_VN' */
  ogLocale: string;
}

export interface NavItem {
  /** id của section để anchor scroll, không kèm dấu # */
  anchor: string;
  label: string;
}

export interface HeroContent {
  overline: string;
  heading: string;
  /** In bằng Lora italic */
  tagline: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  trustLine: string;
  imageAlt: string;
}

export interface SiteContent {
  locale: Locale;
  seo: SeoMeta;
  nav: NavItem[];
  /** Nhãn của nút đổi ngôn ngữ — mỗi bản tự mô tả bằng ngôn ngữ của mình */
  langSwitch: {
    /** aria-label cho link sang ngôn ngữ kia */
    toOther: string;
    /** Nhãn hiển thị: 'EN' / 'VI' */
    labelEn: string;
    labelVi: string;
  };
  header: {
    callCta: string;
    openMenu: string;
    closeMenu: string;
    skipToContent: string;
  };
  hero: HeroContent;
}
