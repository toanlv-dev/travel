import * as Dialog from '@radix-ui/react-dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { PointerEvent } from 'react';
import { SmartImage } from '@/components/common/SmartImage';
import { cn } from '@/lib/cn';
import type { ImageRef } from '@/types';

export interface LightboxItem {
  image: ImageRef;
  alt: string;
  caption: string;
}

interface LightboxProps {
  items: LightboxItem[];
  open: boolean;
  /** Giữ nguyên khi đóng — nhờ vậy lúc đóng vẫn biết phải trả focus về ô ảnh nào */
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
  /** Trả focus về ô ảnh ĐANG xem, không phải ô đã bấm lúc mở */
  onReturnFocus: (i: number) => void;
  labels: { close: string; prev: string; next: string; counter: string };
}

// Nền đen mờ, không phải trắng mờ: mũi tên nằm đè lên ảnh, ảnh nào cũng phải đọc được
const arrow =
  'flex size-11 shrink-0 items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/75';

export function Lightbox({
  items,
  open,
  index,
  onIndexChange,
  onClose,
  onReturnFocus,
  labels,
}: LightboxProps) {
  const item = items[index];
  const counter = labels.counter
    .replace('{i}', String(index + 1))
    .replace('{n}', String(items.length));
  const step = (delta: number) => onIndexChange((index + delta + items.length) % items.length);
  // Hộp phủ kín màn nên bấm ra ngoài ảnh không rơi vào lớp phủ của Radix — tự xử lý:
  // chỉ đóng khi bấm trúng chính khoảng trống, không phải ảnh hay nút bên trong
  const closeOnBackdrop = (e: PointerEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/85" />
        <Dialog.Content
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            onReturnFocus(index);
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') step(-1);
            if (e.key === 'ArrowRight') step(1);
          }}
          onPointerDown={closeOnBackdrop}
          className="fixed inset-0 z-50 flex flex-col p-3 sm:p-6"
        >
          <div className="flex items-center justify-between gap-4 text-white">
            <Dialog.Title className="text-small">{counter}</Dialog.Title>
            <Dialog.Close aria-label={labels.close} className={arrow}>
              <X aria-hidden="true" className="size-5" />
            </Dialog.Close>
          </div>

          {/* Mũi tên đè lên ảnh chứ không đứng cạnh: ở 375px hai nút cạnh ảnh ăn mất 1/3 bề ngang */}
          <div
            onPointerDown={closeOnBackdrop}
            className="relative flex min-h-0 flex-1 items-center justify-center"
          >
            {/* Ảnh chỉ có mốc tối đa 960 nên không rộng quá 960; kẹp thêm theo chiều cao
                (tỉ lệ 4/3 → rộng 100vh là vừa 75vh) để màn thấp không bị tràn */}
            <figure className="flex w-full max-w-[min(960px,100vh)] flex-col items-center gap-3">
              <SmartImage
                key={item.image.name}
                image={item.image}
                alt={item.alt}
                ratio="4/3"
                sizes="(min-width: 1024px) 960px, 100vw"
                className="w-full rounded-lg bg-transparent"
              />
              <Dialog.Description asChild>
                <figcaption className="px-2 text-center text-small text-white/80">{item.caption}</figcaption>
              </Dialog.Description>
            </figure>

            <button
              type="button"
              aria-label={labels.prev}
              onClick={() => step(-1)}
              className={cn(arrow, 'absolute left-0 top-1/2 -translate-y-1/2')}
            >
              <ChevronLeft aria-hidden="true" className="size-6" />
            </button>
            <button
              type="button"
              aria-label={labels.next}
              onClick={() => step(1)}
              className={cn(arrow, 'absolute right-0 top-1/2 -translate-y-1/2')}
            >
              <ChevronRight aria-hidden="true" className="size-6" />
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
