import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

/**
 * ==========================================
 * Tailwind CSS Configuration for Academic Portfolio
 * ==========================================
 *
 * A comprehensive design system with CSS custom properties for theming.
 *
 * 🌟 ACTIVE THEMES:
 * ├── Light      → Classic professional with clean whites
 * └── Dark       → Enhanced contrast with deep backgrounds
 *
 * 🚧 PLANNED EXPANSION:
 * ├── Retro      → Vintage aesthetics with film grain overlay
 * ├── Cyberpunk  → Neon matrix effects with digital glitch
 * └── Ocean      → Animated wave patterns with blue gradients
 *
 * 🎨 DESIGN FEATURES:
 * ├── CSS custom properties for seamless theme switching
 * ├── Academic-specific semantic color system
 * ├── Responsive layout utilities and spacing
 * ├── Sidebar and navigation theming
 * ├── Typography scales for academic content
 * └── Animation system for enhanced UX
 *
 * @author Md Asif Bin Khaled
 * @version 2.0
 */

const config: Config = {
  darkMode: 'class',

  // ==========================================
  // CONTENT PATHS
  // ==========================================
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      // ==========================================
      // FONT FAMILY SYSTEM
      // ==========================================
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },

      // ==========================================
      // RESPONSIVE BREAKPOINTS
      // ==========================================
      screens: {
        xs: '375px', // Mobile S - iPhone SE
        sm: '640px', // Mobile L - Default Tailwind
        md: '768px', // Tablet - Default Tailwind
        lg: '1024px', // Laptop - Default Tailwind
        xl: '1280px', // Desktop - Default Tailwind
        '2xl': '1536px', // Large Desktop - Default Tailwind
      },

      // ==========================================
      // COLOR SYSTEM
      // ==========================================
      colors: {
        // Foundation Colors
        // ────────────────────────────────────────
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        // Brand & Interactive Colors
        // ────────────────────────────────────────
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

        // Content & Layout Colors
        // ────────────────────────────────────────
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

        // Form & Input Colors
        // ────────────────────────────────────────
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        // Navigation Sidebar Colors
        // ────────────────────────────────────────
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

        // Academic Portfolio Semantic Colors
        // ────────────────────────────────────────
        academic: {
          primary: 'hsl(var(--academic-primary))', // Research highlights
          accent: 'hsl(var(--academic-accent))', // Publication emphasis
          muted: 'hsl(var(--academic-muted))', // Subdued content
          card: 'hsl(var(--academic-card))', // Content cards
          highlight: 'hsl(var(--academic-highlight))', // Key achievements
        },
      },

      // ==========================================
      // BORDER RADIUS SYSTEM
      // ==========================================
      borderRadius: {
        lg: 'var(--radius)', // Large radius for cards and modals
        md: 'calc(var(--radius) - 2px)', // Medium radius for buttons
        sm: 'calc(var(--radius) - 4px)', // Small radius for inputs
      },

      // ==========================================
      // LAYOUT & SPACING SYSTEM
      // ==========================================
      spacing: {
        // Layout Components
        'sidebar-width': 'var(--sidebar-width)',
        'navbar-height': 'var(--navbar-height)',
        'content-padding': 'var(--content-padding)',

        // Academic Content Spacing
        'academic-section': '3rem', // Between major sections
        'academic-content': '1.5rem', // Between content blocks
        'academic-card': '1rem', // Inside cards and components
      },

      maxWidth: {
        content: 'var(--max-content-width)', // Maximum content width
      },

      // ==========================================
      // TYPOGRAPHY SYSTEM
      // ==========================================
      fontSize: {
        // Academic Content Typography
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

      // ==========================================
      // ANIMATION SYSTEM
      // ==========================================
      keyframes: {
        // Accordion Animations
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
        // Component Animations
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },

      // ==========================================
      // ACADEMIC CONTENT UTILITIES
      // ==========================================
      gap: {
        'academic-section': '3rem', // Major section gaps
        'academic-content': '1.5rem', // Content block gaps
        'academic-card': '1rem', // Card internal gaps
      },
    },
  },

  // ==========================================
  // PLUGINS
  // ==========================================
  plugins: [tailwindcssAnimate],
};

export default config;
