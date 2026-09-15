import { useCallback, useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/** Đọc tuỳ chọn giảm chuyển động của hệ điều hành.
 *  Dùng useSyncExternalStore để HTML dựng sẵn lúc build (không có window) và lần render đầu
 *  ở trình duyệt khớp nhau — đọc thẳng matchMedia lúc render sẽ lệch khi hydrate. */
export function usePrefersReducedMotion(): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    const mq = window.matchMedia(QUERY);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
