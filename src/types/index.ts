/** Kiểu cho dữ liệu KHÔNG phụ thuộc ngôn ngữ (src/data/). */

export type Region = 'bac' | 'trung' | 'nam';

/** Tỉ lệ khung ảnh — khoá sẵn để chống CLS. */
export type AspectRatio = '16/9' | '3/2' | '4/3' | '3/4' | '4/5' | '1/1';

/** Ảnh sinh bởi `npm run images`. `name` là đường dẫn trong images/, không kèm đuôi và mốc width:
 *  public/images/<name>-<width>.{webp,jpg} */
export interface ImageRef {
  name: string;
  /** Các mốc width thực sự đã sinh ra (ảnh nhỏ hơn mốc thì script bỏ qua) */
  widths: number[];
}
