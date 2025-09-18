import type { ThemeConfig, ThemeName } from '@/types';

/**
 * Simplified Academic Portfolio Theme Configuration
 * Focus on professional, accessible themes for academic use
 */
export const themeConfigs: Record<ThemeName, ThemeConfig> = {
  light: {
    name: 'light',
    label: 'Light',
    description: 'Clean and professional light theme',
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
    description: 'Professional dark theme with enhanced contrast',
    category: 'classic',
    preview: {
      background: 'hsl(201, 35%, 12%)',
      foreground: 'hsl(200, 25%, 96%)',
      primary: 'hsl(201, 60%, 50%)',
    },
  },
} as const;

/**
 * Motion preferences for accessibility
 */
export const motionPreferences = {
  // Detect user's motion preference
  respectReducedMotion: true,

  // Default animation durations (will be reduced if user prefers reduced motion)
  durations: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },

  // Animation easings
  easings: {
    easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
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
export const getThemesByCategory = (
  category: 'classic' | 'dramatic'
): ThemeConfig[] =>
  Object.values(themeConfigs).filter((theme) => theme.category === category);

/**
 * Check if a theme name is valid
 */
export const isValidTheme = (theme: string): theme is ThemeName =>
  theme in themeConfigs;

/**
 * Default theme for the application
 */
export const DEFAULT_THEME: ThemeName = 'light';
