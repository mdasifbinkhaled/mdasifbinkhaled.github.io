import type { ThemeConfig, ThemeName } from '@/types';

/**
 * Academic portfolio theme configuration
 * Defines the 5 curated themes with their properties
 */
export const themeConfigs: Record<ThemeName, ThemeConfig> = {
  light: {
    name: 'light',
    label: 'Light',
    description: 'Clean and bright professional theme',
    category: 'classic',
    preview: {
      background: 'hsl(200, 25%, 96%)',
      foreground: 'hsl(201, 35%, 20%)',
      primary: 'hsl(201, 55%, 35%)',
    },
  },
  dark: {
    name: 'dark',
    label: 'Dark',
    description: 'Rich dark mode with enhanced contrast',
    category: 'classic',
    preview: {
      background: 'hsl(201, 35%, 12%)',
      foreground: 'hsl(200, 25%, 96%)',
      primary: 'hsl(201, 60%, 50%)',
    },
  },
  retro: {
    name: 'retro',
    label: 'Retro',
    description: 'Vintage film with warm glow and paper texture',
    category: 'dramatic',
    preview: {
      background: 'linear-gradient(135deg, #f4e4bc 0%, #daa520 100%)',
      foreground: 'hsl(24, 20%, 15%)',
      primary: 'hsl(24, 74%, 58%)',
    },
  },
  cyberpunk: {
    name: 'cyberpunk',
    label: 'Cyberpunk',
    description: 'Electric neon matrix with glitch effects',
    category: 'dramatic',
    preview: {
      background: 'linear-gradient(135deg, #000000 0%, #8b00ff 100%)',
      foreground: 'hsl(315, 100%, 85%)',
      primary: 'hsl(315, 100%, 65%)',
    },
  },
  ocean: {
    name: 'ocean',
    label: 'Ocean',
    description: 'Deep underwater with animated waves',
    category: 'dramatic',
    preview: {
      background: 'linear-gradient(135deg, #e0f7fa 0%, #006064 100%)',
      foreground: 'hsl(210, 40%, 15%)',
      primary: 'hsl(185, 62%, 45%)',
    },
  },
} as const;

/**
 * Get all available theme names
 */
export const getThemeNames = (): ThemeName[] => 
  Object.keys(themeConfigs) as ThemeName[];

/**
 * Get theme configuration by name
 */
export const getThemeConfig = (themeName: ThemeName): ThemeConfig => 
  themeConfigs[themeName];

/**
 * Get themes by category
 */
export const getThemesByCategory = (category: 'classic' | 'dramatic'): ThemeConfig[] =>
  Object.values(themeConfigs).filter(theme => theme.category === category);

/**
 * Check if a theme name is valid
 */
export const isValidTheme = (theme: string): theme is ThemeName =>
  theme in themeConfigs;

/**
 * Default theme for the application
 */
export const DEFAULT_THEME: ThemeName = 'light';
