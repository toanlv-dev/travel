import { cn } from '@/lib/cn';
import type { AspectRatio, ImageRef } from '@/types';

interface SmartImageProps {
  image: ImageRef;
  alt: string;
  /** Bỏ qua khi dùng `fill` */
  ratio?: AspectRatio;
  /** Phủ kín phần tử cha (cha phải có `position: relative`) — dùng cho ảnh nền hero */
  fill?: boolean;
  /** Kích thước hiển thị theo breakpoint, để trình duyệt chọn đúng file */
  sizes?: string;
  /** Chỉ đặt cho ảnh hero — ảnh còn lại phải lazy */
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}

// BASE_URL là '/' ở bản tiếng Anh và '/vi/' ở bản tiếng Việt
const url = (name: string, w: number, ext: 'webp' | 'jpg') =>
  `${import.meta.env.BASE_URL}images/${name}-${w}.${ext}`;

const srcSet = (image: ImageRef, ext: 'webp' | 'jpg') =>
  image.widths.map((w) => `${url(image.name, w, ext)} ${w}w`).join(', ');

export function SmartImage({
  image,
  alt,
  ratio,
  fill = false,
  sizes = '100vw',
  priority = false,
  className,
  imgClassName,
}: SmartImageProps) {
  // Mốc lớn nhất làm src dự phòng cho trình duyệt không hiểu srcset
  const fallbackWidth = image.widths[image.widths.length - 1];

  return (
    <div
      className={cn(
        'overflow-hidden',
        // Ảnh phủ nền (hero) để lộ nền của section; ảnh trong card thì nền xám nhạt lúc chờ
        fill ? 'absolute inset-0' : 'relative bg-soft',
        className,
      )}
      style={fill ? undefined : { aspectRatio: ratio }}
    >
      <picture>
        <source type="image/webp" srcSet={srcSet(image, 'webp')} sizes={sizes} />
        <img
          src={url(image.name, fallbackWidth, 'jpg')}
          srcSet={srcSet(image, 'jpg')}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          // KHÔNG mờ-rồi-hiện bằng JS: HTML dựng sẵn lúc build sẽ mang opacity-0 và ảnh phải
          // chờ hydrate xong mới hiện, đẩy LCP ra sau. Khung đã khoá aspect-ratio nên không giật.
          className={cn('absolute inset-0 h-full w-full object-cover', imgClassName)}
        />
      </picture>
    </div>
  );
}
