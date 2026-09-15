/** Logo khách hàng doanh nghiệp. CHỈ thêm khi đơn vị đó đã đồng ý cho đăng —
 *  đặt file vào public/images/clients/ rồi thêm một dòng ở đây. Mảng rỗng thì dải logo tự ẩn. */
export interface ClientLogo {
  /** Tên file trong public/images/clients/ */
  file: string;
  /** Tên đơn vị — dùng làm alt */
  name: string;
}

export const clientLogos: ClientLogo[] = [];
