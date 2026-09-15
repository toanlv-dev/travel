import type useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useSyncExternalStore } from 'react';

type Embla = ReturnType<typeof useEmblaCarousel>[1];

/** Trạng thái nút prev/next nằm bên trong Embla, không phải state của React —
 *  đọc bằng useSyncExternalStore thay vì chép sang useState qua effect. */
export function useEmblaNav(embla: Embla) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!embla) return () => {};
      embla.on('select', onChange).on('reInit', onChange);
      return () => {
        embla.off('select', onChange).off('reInit', onChange);
      };
    },
    [embla],
  );

  return {
    canPrev: useSyncExternalStore(subscribe, () => embla?.canScrollPrev() ?? false, () => false),
    canNext: useSyncExternalStore(subscribe, () => embla?.canScrollNext() ?? false, () => false),
  };
}
