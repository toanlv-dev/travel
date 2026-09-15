/** Hằng số KHÔNG dịch: số điện thoại, link, đường dẫn ảnh.
 *  Chữ hiển thị nằm ở src/content/{en,vi}.ts. */

// TODO: thay bằng thông tin thật của công ty.
export const company = {
  name: 'Vietnam Travel Co.',
  /** Số giấy phép lữ hành — hiển thị ở section About để tạo niềm tin */
  licenseNo: '79-000/2013/TCDL-GPLHQT',
  hotline: '0912345678',
  hotlineDisplay: '091 234 5678',
  email: 'hello@example.com',
  zalo: 'https://zalo.me/0912345678',
  messenger: 'https://m.me/example',
  address: '123 Đường Placeholder, Quận 1, TP. Hồ Chí Minh',
  /** Đổi thành domain thật trước khi deploy — dùng cho canonical + hreflang */
  siteUrl: 'https://example.com',
} as const;
