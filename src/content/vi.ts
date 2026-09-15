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
  statsHeading: 'Năng lực của chúng tôi qua con số',
  stats: [
    { value: 12, label: 'năm tổ chức tour trong nước' },
    { value: 8500, suffix: '+', label: 'lượt khách đã phục vụ' },
    { value: 640, suffix: '+', label: 'chuyến đã khởi hành' },
    { value: 4.9, decimals: 1, label: 'điểm đánh giá trung bình trên 5' },
  ],
  about: {
    overline: 'Về chúng tôi',
    heading: 'Công ty lữ hành, không phải trang đặt chỗ',
    body: [
      'Chúng tôi là công ty lữ hành Việt Nam, trụ sở tại TP. Hồ Chí Minh. Mọi hành trình chúng tôi bán đều là hành trình chúng tôi đã tự đi, với hướng dẫn viên lớn lên ở chính vùng đất đó.',
      'Chúng tôi tự tổ chức đoàn chứ không bán lại chỗ của đơn vị khác. Nghĩa là khi kế hoạch thay đổi — bão ở Quảng Bình, đường lên Sa Pa tắc — người bạn gọi chính là người quyết được.',
    ],
    licenseLabel: 'Giấy phép lữ hành quốc tế',
    imageAlt: 'Phố cổ Hội An lên đèn buổi tối',
  },
  whyUs: {
    overline: 'Vì sao chọn chúng tôi',
    heading: 'Điều một trang đặt chỗ không làm được cho bạn',
    description:
      'Chúng tôi chỉ làm tour trong nước. Hẹp lại là có chủ đích — nhờ vậy mới biết đoạn đường nào ngập tháng Mười, homestay nào thực sự có nước nóng.',
    items: [
      { icon: 'map', title: 'Am hiểu từng vùng miền', description: 'Bắc — Trung — Nam, hướng dẫn viên sống ở chính nơi họ đưa bạn đến.' },
      { icon: 'wallet', title: 'Báo giá theo đoàn', description: 'Cho biết số khách và nhu cầu, chúng tôi báo trọn gói, không phát sinh ẩn.' },
      { icon: 'clock', title: 'Phản hồi trong một giờ', description: 'Làm việc 8:00–20:00 cả tuần, qua điện thoại hoặc Zalo.' },
      { icon: 'users', title: 'Hướng dẫn viên thật', description: 'Có thẻ hành nghề, kể được câu chuyện sau mỗi điểm đến, tiếng Việt hoặc tiếng Anh.' },
      { icon: 'headset', title: 'Luôn liên lạc được', description: 'Một số điện thoại duy nhất trước, trong và sau chuyến đi.' },
      { icon: 'shield', title: 'Có giấy phép, có bảo hiểm', description: 'Giấy phép lữ hành quốc tế, mọi chuyến đều có bảo hiểm du lịch.' },
    ],
  },
  mobileBar: {
    call: 'Gọi ngay',
    zalo: 'Zalo',
    messenger: 'Nhắn tin',
  },
};
