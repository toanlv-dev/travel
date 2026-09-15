import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useState } from 'react';
import { content } from '@content';
import type { Post } from '@/content/types';
import { Reveal } from '@/components/common/Reveal';
import { SmartImage } from '@/components/common/SmartImage';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { images } from '@/data/images';

export function Posts() {
  const [open, setOpen] = useState<Post | null>(null);

  return (
    <Section id="posts" bg="soft" labelledBy="posts-heading">
      <SectionHeading
        id="posts-heading"
        overline={content.posts.overline}
        title={content.posts.heading}
        description={content.posts.description}
      />

      <ul className="grid gap-5 md:grid-cols-3">
        {content.posts.items.map((post, i) => (
          <Reveal key={post.slug} delay={i * 60}>
            <li className="h-full">
              {/* Trang không có bài chi tiết riêng — bấm card mở hộp đọc, không phải link chết */}
              <button
                onClick={() => setOpen(post)}
                className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-base text-left shadow-1 transition-shadow duration-hover hover:shadow-2"
              >
                <SmartImage
                  image={images.posts[post.slug]}
                  alt={post.title}
                  ratio="16/9"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-small text-primary-700">{post.category}</p>
                  <h3 className="mt-1 text-h3 text-ink">{post.title}</h3>
                  <p className="mt-2 flex-1 text-body text-ink-muted">{post.excerpt}</p>
                  <p className="mt-4 flex items-center gap-2 text-small text-ink-faint">
                    <span>{post.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingTime}</span>
                  </p>
                  <span className="mt-2 text-body font-semibold text-primary-700">
                    {content.posts.readMore}
                  </span>
                </div>
              </button>
            </li>
          </Reveal>
        ))}
      </ul>

      <p data-placeholder="posts" className="mt-5 text-small text-ink-faint">
        {content.posts.placeholderNote}
      </p>

      <Dialog.Root open={open !== null} onOpenChange={(v) => !v && setOpen(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
          <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-xl bg-base p-5 shadow-3 sm:inset-0 sm:m-auto sm:h-fit sm:max-w-xl sm:rounded-xl">
            {open && (
              <>
                <div className="flex items-start justify-between gap-4">
                  <Dialog.Title className="text-h3 text-ink">{open.title}</Dialog.Title>
                  <Dialog.Close
                    aria-label={content.header.closeMenu}
                    className="flex size-11 shrink-0 items-center justify-center rounded-md text-ink"
                  >
                    <X aria-hidden="true" className="size-5" />
                  </Dialog.Close>
                </div>

                <Dialog.Description className="mt-1 text-small text-ink-faint">
                  {open.category} · {open.date} · {open.readingTime}
                </Dialog.Description>

                <div className="mt-4 space-y-3">
                  {open.body.map((para) => (
                    <p key={para} className="text-body text-ink-muted">
                      {para}
                    </p>
                  ))}
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Section>
  );
}
