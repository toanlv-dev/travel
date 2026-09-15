import type { Config } from 'tailwindcss';

/** Mọi giá trị map từ src/styles/tokens.css — xem DESIGN_SYSTEM.md */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    // Sàn thiết kế là 375px (iPhone 8), không phải 320px
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        primary: {
          50: 'var(--c-primary-50)',
          100: 'var(--c-primary-100)',
          300: 'var(--c-primary-300)',
          500: 'var(--c-primary-500)',
          600: 'var(--c-primary-600)',
          700: 'var(--c-primary-700)',
        },
        accent: 'var(--c-accent-500)',
        ink: {
          DEFAULT: 'var(--c-ink)',
          muted: 'var(--c-ink-muted)',
          faint: 'var(--c-ink-faint)',
        },
        line: {
          DEFAULT: 'var(--c-line)',
          strong: 'var(--c-line-strong)',
        },
        base: 'var(--bg-base)',
        soft: 'var(--bg-soft)',
        deep: 'var(--bg-deep)',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        serif: 'var(--font-serif)',
      },
      // line-height ≥ 1.6 cho body, ≥ 1.18 cho heading — dấu thanh tiếng Việt ăn chiều cao
      fontSize: {
        display: ['2rem', { lineHeight: '1.2', fontWeight: '700' }],
        'display-lg': ['3.5rem', { lineHeight: '1.12', fontWeight: '700' }],
        h1: ['1.75rem', { lineHeight: '1.25', fontWeight: '700' }],
        'h1-lg': ['2.75rem', { lineHeight: '1.18', fontWeight: '700' }],
        h2: ['1.5rem', { lineHeight: '1.3', fontWeight: '700' }],
        'h2-lg': ['2.25rem', { lineHeight: '1.22', fontWeight: '700' }],
        h3: ['1.25rem', { lineHeight: '1.35', fontWeight: '600' }],
        'h3-lg': ['1.5rem', { lineHeight: '1.33', fontWeight: '600' }],
        h4: ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.65' }],
        'body-lg-d': ['1.125rem', { lineHeight: '1.7' }],
        body: ['1rem', { lineHeight: '1.65' }],
        small: ['0.875rem', { lineHeight: '1.6' }],
        overline: ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.08em', fontWeight: '600' }],
      },
      spacing: {
        section: '3.5rem',
        'section-lg': '6rem',
        'section-xl': '7.5rem',
      },
      maxWidth: {
        container: '1200px',
        prose: '68ch',
      },
      borderRadius: {
        sm: 'var(--r-sm)',
        md: 'var(--r-md)',
        lg: 'var(--r-lg)',
        xl: 'var(--r-xl)',
      },
      boxShadow: {
        1: 'var(--sh-1)',
        2: 'var(--sh-2)',
        3: 'var(--sh-3)',
      },
      backgroundImage: {
        'overlay-media': 'var(--overlay-media)',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
      },
      transitionDuration: {
        hover: '150ms',
        toggle: '250ms',
        reveal: '400ms',
      },
      minHeight: {
        // svh: thanh địa chỉ Safari không cắt mất nội dung hero
        hero: '100svh',
      },
    },
  },
  plugins: [],
} satisfies Config;
