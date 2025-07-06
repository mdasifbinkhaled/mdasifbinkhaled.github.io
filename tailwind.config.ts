import type { Config } from "tailwindcss";

/**
 * Tailwind CSS Configuration for Academic Portfolio
 * 
 * This configuration supports a 5-theme system:
 * - Light (classic professional)
 * - Dark (enhanced contrast)
 * - Retro (vintage with film grain)
 * - Cyberpunk (neon matrix effects)
 * - Ocean (animated waves)
 * 
 * Features:
 * - CSS custom properties for theme switching
 * - Academic-specific semantic colors
 * - Consistent spacing and layout utilities
 * - Sidebar and navigation theming
 */
export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			// === Core Theme Colors ===
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			
  			// === Interactive Elements ===
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			
  			// === Content & Layout ===
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			
  			// === Form Elements ===
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			
  			// === Navigation Sidebar ===
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			
  			// === Academic Portfolio Semantic Colors ===
  			academic: {
  				primary: 'hsl(var(--academic-primary))',
  				accent: 'hsl(var(--academic-accent))',
  				muted: 'hsl(var(--academic-muted))',
  				card: 'hsl(var(--academic-card))',
  				highlight: 'hsl(var(--academic-highlight))'
  			}
  		},
  		
  		// === Border Radius System ===
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		
  		// === Layout & Spacing ===
  		spacing: {
  			'sidebar-width': 'var(--sidebar-width)',
  			'navbar-height': 'var(--navbar-height)',
  			'content-padding': 'var(--content-padding)'
  		},
  		maxWidth: {
  			'content': 'var(--max-content-width)'
  		},
  		
  		// === Animation System ===
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		
  		// === Academic Portfolio Utilities ===
  		fontSize: {
  			'academic-title': ['2.5rem', { lineHeight: '3rem', fontWeight: '700' }],
  			'academic-subtitle': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
  			'academic-body': ['1rem', { lineHeight: '1.75rem', fontWeight: '400' }],
  			'academic-caption': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500' }]
  		},
  		
  		// === Academic Content Spacing ===
  		gap: {
  			'academic-section': '3rem',
  			'academic-content': '1.5rem',
  			'academic-card': '1rem'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
