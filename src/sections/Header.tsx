import * as Dialog from '@radix-ui/react-dialog';
import { Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { content } from '@content';
import { LangSwitcher } from '@/components/common/LangSwitcher';
import { Container } from '@/components/layout/Container';
import { buttonVariants } from '@/components/ui/button-variants';
import { company } from '@/data/company';
import { cn } from '@/lib/cn';

const SOLID_AFTER = 80;

export function Header() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > SOLID_AFTER);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-toggle ease-out',
        solid ? 'bg-base/95 shadow-1 backdrop-blur' : 'bg-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-3 lg:h-20">
        <a
          href="#main"
          className={cn(
            // Tên công ty 19 ký tự: ở 375px phải để 16px mới đủ chỗ cho nút đổi ngôn ngữ + menu
            'flex min-h-11 items-center whitespace-nowrap text-body font-bold sm:text-h4',
            solid ? 'text-primary-700' : 'text-white drop-shadow-[0_1px_8px_rgba(0,0,0,.5)]',
          )}
        >
          {company.name}
        </a>

        <nav aria-label={content.header.navLabel} className="hidden items-center gap-1 lg:flex">
          {content.nav.map((item) => (
            <a
              key={item.anchor}
              href={`#${item.anchor}`}
              className={cn(
                // Tên công ty dài nên ở 1024px phải bóp chữ menu lại, không thì mỗi mục rớt xuống 2 dòng
                'flex min-h-11 items-center whitespace-nowrap rounded-sm px-2 text-small transition-colors duration-hover xl:px-3 xl:text-body',
                solid
                  ? 'text-ink hover:text-primary-700'
                  : 'text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,.5)] hover:text-white',
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitcher onDark={!solid} />

          <a
            href={`tel:${company.hotline}`}
            className={cn(buttonVariants({ variant: 'primary' }), 'hidden whitespace-nowrap lg:inline-flex')}
          >
            <Phone aria-hidden="true" className="size-4" />
            {content.header.callCta}
          </a>

          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger
              aria-label={content.header.openMenu}
              className={cn(
                'flex size-11 items-center justify-center rounded-md lg:hidden',
                solid ? 'text-ink' : 'text-white drop-shadow-[0_1px_8px_rgba(0,0,0,.5)]',
              )}
            >
              <Menu aria-hidden="true" className="size-6" />
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
              <Dialog.Content
                aria-describedby={undefined}
                className="fixed inset-y-0 right-0 z-50 flex w-[85vw] max-w-sm flex-col gap-2 bg-base p-5 shadow-3"
              >
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-h4 text-primary-700">{company.name}</Dialog.Title>
                  <Dialog.Close
                    aria-label={content.header.closeMenu}
                    className="flex size-11 items-center justify-center rounded-md text-ink"
                  >
                    <X aria-hidden="true" className="size-6" />
                  </Dialog.Close>
                </div>

                <LangSwitcher className="mt-2" />

                <nav aria-label={content.header.navLabel} className="mt-2 flex flex-col">
                  {content.nav.map((item) => (
                    <a
                      key={item.anchor}
                      href={`#${item.anchor}`}
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-12 items-center border-b border-line text-body-lg text-ink"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                <a
                  href={`tel:${company.hotline}`}
                  className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'mt-4')}
                >
                  <Phone aria-hidden="true" className="size-5" />
                  {content.contact.hotlineDisplay}
                </a>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </Container>
    </header>
  );
}
