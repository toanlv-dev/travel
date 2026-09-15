import { cva } from 'class-variance-authority';

/** Gán thẳng vào className của <a> hoặc <button> — trang không có component <Button> riêng. */
export const buttonVariants = cva(
  // min-h-11 = 44px: chuẩn vùng chạm của Apple HIG
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-md text-body font-semibold ' +
    'transition-colors duration-hover ease-out disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 text-white hover:bg-primary-700',
        outline:
          'border border-line-strong bg-base text-ink hover:border-primary-600 hover:text-primary-700',
        ghost: 'text-primary-700 hover:bg-primary-50',
        /** Trên nền đậm (footer, dải CTA) */
        onDeep: 'bg-white text-primary-700 hover:bg-primary-50',
      },
      size: {
        md: 'px-5 py-3',
        lg: 'px-6 py-3.5 text-body-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);
