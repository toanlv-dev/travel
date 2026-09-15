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

export interface StatItem {
  value: number;
  /** 1 cho điểm đánh giá (4,9); bỏ trống cho số nguyên */
  decimals?: number;
  suffix?: string;
  label: string;
}

export interface AboutContent {
  overline: string;
  heading: string;
  /** Mỗi phần tử là một đoạn văn */
  body: string[];
  licenseLabel: string;
  imageAlt: string;
}

/** Tên icon lucide — không phải chữ dịch, nhưng để cạnh nội dung cho khỏi lệch thứ tự */
export type WhyIcon = 'map' | 'wallet' | 'clock' | 'users' | 'headset' | 'shield';

export interface WhyItem {
  icon: WhyIcon;
  title: string;
  description: string;
}

export interface MobileBarContent {
  call: string;
  zalo: string;
  messenger: string;
}

export interface SiteContent {
  locale: Locale;
  seo: SeoMeta;
  nav: NavItem[];
  /** Nhãn của nút đổi ngôn ngữ — mỗi bản tự mô tả bằng ngôn ngữ của mình */
  langSwitch: {
    /** aria-label cho link sang ngôn ngữ kia */
    toOther: string;
    labelEn: string;
    labelVi: string;
  };
  header: {
    /** aria-label cho <nav>, vì có 2 nav (desktop + drawer) */
    navLabel: string;
    callCta: string;
    openMenu: string;
    closeMenu: string;
    skipToContent: string;
  };
  hero: HeroContent;
  /** Tiêu đề ẩn cho dải số — screen reader cần biết vùng này là gì */
  statsHeading: string;
  stats: StatItem[];
  about: AboutContent;
  whyUs: {
    overline: string;
    heading: string;
    description: string;
    items: WhyItem[];
  };
  /** Thanh liên hệ dính đáy, chỉ hiện dưới breakpoint md */
  mobileBar: MobileBarContent;
}
