import type { SiteContent } from './types.ts';

// TODO: thay bằng nội dung thật của công ty (tên, slogan, số liệu).
export const content: SiteContent = {
  locale: 'vi',
  seo: {
    title: 'Công ty Du lịch Việt — Tour trong nước trọn gói từ 2013',
    description:
      'Công ty lữ hành có giấy phép, tổ chức tour trong nước từ Sa Pa đến Phú Quốc. 12 năm kinh nghiệm, hơn 8.500 lượt khách, đánh giá trung bình 4,9/5.',
    ogLocale: 'vi_VN',
  },
  nav: [
    { anchor: 'about', label: 'Về chúng tôi' },
    { anchor: 'tours', label: 'Tour du lịch' },
    { anchor: 'destinations', label: 'Điểm đến' },
    { anchor: 'clients', label: 'Khách hàng' },
    { anchor: 'contact', label: 'Liên hệ' },
  ],
  langSwitch: {
    toOther: 'View the English version',
    labelEn: 'EN',
    labelVi: 'VI',
  },
  header: {
    navLabel: 'Điều hướng chính',
    callCta: 'Tư vấn miễn phí',
    openMenu: 'Mở menu',
    closeMenu: 'Đóng menu',
    skipToContent: 'Bỏ qua, tới nội dung chính',
  },
  hero: {
    overline: 'Lữ hành có giấy phép · Từ 2013',
    heading: 'Khám phá Việt Nam cùng người bản địa',
    tagline: 'từng thung lũng, từng khúc biển, từng bữa ăn đáng để dừng chân',
    description:
      'Chúng tôi thiết kế và tổ chức tour trọn gói khắp ba miền — từ ruộng bậc thang Sa Pa, hang động Quảng Bình đến những hòn đảo phương Nam.',
    ctaPrimary: 'Gọi tư vấn miễn phí',
    ctaSecondary: 'Xem tour trong nước',
    trustLine: '12 năm · hơn 8.500 lượt khách · đánh giá 4,9/5',
    imageAlt: 'Ruộng bậc thang lúa chín vàng trên sườn đồi Sa Pa',
  },
  mobileBar: {
    call: 'Gọi ngay',
    zalo: 'Zalo',
    messenger: 'Nhắn tin',
  },
};
