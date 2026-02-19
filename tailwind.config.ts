import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

/** Tailwind CSS configuration — CSS custom properties for multi-theme support. */
const config: Config = {
  darkMode: 'class',

  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },

      screens: {
        xs: '375px',
        '3xl': '1920px',
      },

      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },

        academic: {
          primary: 'hsl(var(--academic-primary))',
          accent: 'hsl(var(--academic-accent))',
          muted: 'hsl(var(--academic-muted))',
          card: 'hsl(var(--academic-card))',
          highlight: 'hsl(var(--academic-highlight))',
        },
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      spacing: {
        'sidebar-width': 'var(--sidebar-width)',
        'navbar-height': 'var(--navbar-height)',
        'content-padding': 'var(--content-padding)',
        'academic-section': '3rem',
        'academic-content': '1.5rem',
        'academic-card': '1rem',
      },

      maxWidth: {
        content: 'var(--content-max-width)',
      },

      fontSize: {
        'academic-title': ['2.5rem', { lineHeight: '3rem', fontWeight: '700' }],
        '0.8rem': '0.8rem',
        '10px': '10px',
        'academic-subtitle': [
          '1.5rem',
          { lineHeight: '2rem', fontWeight: '600' },
        ],
        'academic-body': ['1rem', { lineHeight: '1.75rem', fontWeight: '400' }],
        'academic-caption': [
          '0.875rem',
          { lineHeight: '1.25rem', fontWeight: '500' },
        ],
      },

      zIndex: {
        navbar: '30',
        sidebar: '60',
        'sidebar-toggle': '80',
        overlay: '90',
        toast: '100',
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },

      gap: {
        'academic-section': '3rem',
        'academic-content': '1.5rem',
        'academic-card': '1rem',
      },
    },
  },

  plugins: [tailwindcssAnimate],
};

export default config;
