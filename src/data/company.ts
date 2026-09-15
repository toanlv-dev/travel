/** Hằng số KHÔNG dịch: số điện thoại, link, đường dẫn ảnh.
 *  Chữ hiển thị nằm ở src/content/{en,vi}.ts. */

// Số giấy phép, Messenger, mạng xã hội và siteUrl VẪN LÀ MẪU — xem checklist ở README §7.
export const company = {
  name: 'VIVA VIETNAM TRAVEL',
  /** `null` = chưa có → About và Footer ẩn hẳn dòng giấy phép.
   *  Đây là tuyên bố pháp lý, KHÔNG được để số bịa dưới tên công ty thật. */
  licenseNo: null as string | null,
  /** Dạng E.164 cho link tel: — cách viết cho người đọc nằm ở content.contact.hotlineDisplay */
  hotline: '+84332146395',
  email: 'vivavietnamtravel@gmail.com',
  zalo: 'https://zalo.me/0332146395',
  /** `null` = chưa có trang Facebook → mọi nút Messenger tự ẩn, không trỏ vào link chết */
  messenger: null as string | null,
  /** Chuỗi tra Google Maps, không phải chữ hiển thị — địa chỉ hiển thị nằm ở content.contact.address */
  mapsQuery: '15 ngách 10/16/11 Kim Mã Thượng, Ngọc Hà, Ba Đình, Hà Nội',
  /** ⚠️ MẪU — đổi thành domain thật trước khi deploy, dùng cho canonical + hreflang + sitemap */
  siteUrl: 'https://example.com',
} as const;

/** Bản đồ: chỉ link ra Google Maps, KHÔNG nhúng iframe.
 *  Iframe Maps nặng (~600KB + nhiều request bên thứ ba) mà địa chỉ hiện còn là placeholder. */
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.mapsQuery)}`;

/** Mạng xã hội — chỉ liệt kê link THẬT. Có Facebook/YouTube thì thêm dòng vào đây:
 *  { key: 'facebook', name: 'Facebook', url: 'https://facebook.com/...' } */
export const socials = [{ key: 'zalo', name: 'Zalo', url: company.zalo }] as const;
