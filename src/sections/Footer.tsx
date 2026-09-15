import { ArrowUp } from 'lucide-react';
import { content } from '@content';
import { Container } from '@/components/layout/Container';
import { company, socials } from '@/data/company';

// lucide 1.x đã bỏ hết icon thương hiệu → ghi thẳng tên, khỏi tự vẽ logo của người khác
const linkClass = 'flex min-h-11 items-center text-body text-white/70 hover:text-white';

export function Footer() {
  return (
    // Liền sau dải CTA cũng nền deep — kẻ một vạch mảnh để tách hai khối
    <footer className="border-t border-white/10 bg-deep text-white">
      <Container className="grid gap-8 py-section md:grid-cols-3">
        <div>
          <p className="text-h4 font-bold">{company.name}</p>
          <p className="mt-2 max-w-prose text-body text-white/70">{content.footer.about}</p>
          <p className="mt-3 text-small text-white/50">
            {content.about.licenseLabel}: {company.licenseNo}
          </p>
        </div>

        <nav aria-label={content.footer.linksHeading}>
          <h2 className="text-h4">{content.footer.linksHeading}</h2>
          <ul className="mt-1">
            {content.nav.map((item) => (
              <li key={item.anchor}>
                <a href={`#${item.anchor}`} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-h4">{content.footer.contactHeading}</h2>
          <ul className="mt-1">
            <li>
              <a href={`tel:${company.hotline}`} className={linkClass}>
                {company.hotlineDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className={linkClass}>
                {company.email}
              </a>
            </li>
            <li className="py-2 text-body text-white/70">{company.address}</li>
          </ul>

          <h2 className="mt-4 text-h4">{content.footer.followHeading}</h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {socials.map((s) => (
              <li key={s.key}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center rounded-full bg-white/10 px-4 text-small text-white hover:bg-white/20"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 py-4">
        <p className="text-small text-white/50">
          {content.footer.copyright
            .replace('{year}', String(new Date().getFullYear()))
            .replace('{name}', company.name)}
        </p>
        <a href="#main" className="flex min-h-11 items-center gap-2 text-small text-white/70 hover:text-white">
          <ArrowUp aria-hidden="true" className="size-4" />
          {content.footer.backToTop}
        </a>
      </Container>
    </footer>
  );
}
