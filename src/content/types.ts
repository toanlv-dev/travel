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

/** Ô logo khách hàng. Chưa có logo thật nên chỉ có chữ — xem src/data/clients.ts. */
export interface ClientSlot {
  /** Khớp với id trong src/data/clients.ts */
  id: string;
  /** Tên hiển thị trong ô placeholder. KHÔNG được thay bằng tên doanh nghiệp có thật khi chưa xin phép. */
  name: string;
}

export interface Testimonial {
  id: string;
  /** In bằng Lora italic */
  quote: string;
  author: string;
  /** Chức danh + nơi công tác */
  role: string;
  /** 1–5, hiện bằng sao */
  rating: number;
}

export interface GalleryItem {
  /** Khoá trong images.gallery */
  slug: string;
  alt: string;
  /** Chú thích dưới ảnh trong lightbox */
  caption: string;
}

export interface Post {
  slug: string;
  category: string;
  /** Ngày đã định dạng sẵn theo từng ngôn ngữ */
  date: string;
  readingTime: string;
  title: string;
  excerpt: string;
  /** Mỗi phần tử một đoạn, hiện trong hộp đọc bài */
  body: string[];
}

export interface MobileBarContent {
  /** aria-label cho <nav> của thanh dính đáy */
  navLabel: string;
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
  clients: {
    overline: string;
    heading: string;
    description: string;
    /** Câu ghi rõ đây là ô chờ logo thật — hiển thị cho tới khi khách gửi logo */
    placeholderNote: string;
    items: ClientSlot[];
  };
  testimonials: {
    overline: string;
    heading: string;
    description: string;
    /** Câu ghi rõ đây là lời chứng thực mẫu, chưa phải của khách thật */
    placeholderNote: string;
    prevLabel: string;
    nextLabel: string;
    /** aria-label cho dải sao: "{n} trên 5 sao" */
    ratingLabel: string;
    items: Testimonial[];
  };
  gallery: {
    overline: string;
    heading: string;
    description: string;
    openLabel: string;
    closeLabel: string;
    prevLabel: string;
    nextLabel: string;
    /** "Ảnh {i}/{n}" — thay {i} và {n} */
    counterLabel: string;
    items: GalleryItem[];
  };
  posts: {
    overline: string;
    heading: string;
    description: string;
    /** Câu ghi rõ đây là bài mẫu, chưa phải nội dung của công ty */
    placeholderNote: string;
    readMore: string;
    items: Post[];
  };
  contact: {
    overline: string;
    heading: string;
    description: string;
    hotlineLabel: string;
    emailLabel: string;
    hoursLabel: string;
    /** Ví dụ "8:00–20:00, thứ Hai–Chủ nhật" — cách viết khác nhau giữa hai ngôn ngữ */
    hours: string;
    addressLabel: string;
    mapCta: string;
  };
  footer: {
    about: string;
    linksHeading: string;
    contactHeading: string;
    followHeading: string;
    /** "© {year} {name}…" — thay {year} và {name} */
    copyright: string;
    backToTop: string;
  };
  /** Thanh liên hệ dính đáy, chỉ hiện dưới breakpoint md */
  mobileBar: MobileBarContent;
}
