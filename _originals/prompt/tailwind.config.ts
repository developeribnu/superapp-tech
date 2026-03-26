import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        border: 'var(--border)',
        input: 'var(--border)',
        ring: 'var(--accent-primary)',
        background: 'var(--bg-base)',
        foreground: 'var(--text-primary)',
        primary: {
          DEFAULT: 'var(--accent-primary)',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: 'var(--bg-elevated)',
          foreground: 'var(--text-primary)',
        },
        destructive: {
          DEFAULT: 'var(--color-error)',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: 'var(--bg-surface)',
          foreground: 'var(--text-muted)',
        },
        accent: {
          DEFAULT: 'var(--accent-subtle)',
          foreground: 'var(--text-primary)',
        },
        popover: {
          DEFAULT: 'var(--bg-elevated)',
          foreground: 'var(--text-primary)',
        },
        card: {
          DEFAULT: 'var(--bg-surface)',
          foreground: 'var(--text-primary)',
        },
      },
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)',
        sm: 'var(--radius-sm)',
      },
    },
  },
  plugins: [],
};

export default config;
