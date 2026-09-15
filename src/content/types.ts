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

export type Region = 'bac' | 'trung' | 'nam';

export interface TourDay {
  label: string;
  detail: string;
}

/** ⛔ Không có `price`, `bookUrl`, `discount` — trang chỉ giới thiệu, báo giá qua điện thoại. */
export interface Tour {
  slug: string;
  region: Region;
  name: string;
  province: string;
  duration: string;
  /** Đúng 3 gạch đầu dòng, giữ card đều nhau */
  highlights: [string, string, string];
  itinerary: TourDay[];
  imageAlt: string;
}

export interface Destination {
  slug: string;
  name: string;
  region: Region;
  /** Ví dụ "4 tours" / "4 tour" — số tour là chữ vì cách đọc khác nhau giữa hai ngôn ngữ */
  tourCount: string;
  imageAlt: string;
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
  tours: {
    overline: string;
    heading: string;
    description: string;
    /** Nhãn tab lọc; khoá 'all' luôn đứng đầu */
    filters: { all: string; bac: string; trung: string; nam: string };
    /** Nhãn phụ trên card và trong hộp chi tiết */
    durationLabel: string;
    detailCta: string;
    itineraryLabel: string;
    quoteNote: string;
    items: Tour[];
  };
  destinations: {
    overline: string;
    heading: string;
    description: string;
    prevLabel: string;
    nextLabel: string;
    items: Destination[];
  };
  /** Thanh liên hệ dính đáy, chỉ hiện dưới breakpoint md */
  mobileBar: MobileBarContent;
}
