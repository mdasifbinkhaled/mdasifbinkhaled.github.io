import type { ThemeConfig, ThemeName } from '@/shared/types';

// Theme configuration - Single Source of Truth
// Categories: classic, natural, vibrant, professional

export const themeConfigs: Record<ThemeName, ThemeConfig> = {
  // Classic themes
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

  // Natural themes
  ocean: {
    name: 'ocean',
    label: 'Ocean',
    description: 'Cool blue tones inspired by ocean depths',
    category: 'natural',
    preview: {
      background: 'hsl(210, 100%, 98%)',
      foreground: 'hsl(210, 22%, 22%)',
      primary: 'hsl(199, 89%, 48%)',
    },
  },
  forest: {
    name: 'forest',
    label: 'Forest',
    description: 'Fresh green tones inspired by nature',
    category: 'natural',
    preview: {
      background: 'hsl(120, 40%, 98%)',
      foreground: 'hsl(140, 30%, 20%)',
      primary: 'hsl(142, 76%, 36%)',
    },
  },

  // Vibrant theme
  lavender: {
    name: 'lavender',
    label: 'Lavender',
    description: 'Soft purple tones for a calming experience',
    category: 'vibrant',
    preview: {
      background: 'hsl(270, 60%, 98%)',
      foreground: 'hsl(270, 30%, 20%)',
      primary: 'hsl(270, 60%, 55%)',
    },
  },

  // Professional theme
  slate: {
    name: 'slate',
    label: 'Slate',
    description: 'Professional neutral gray for serious academic work',
    category: 'professional',
    preview: {
      background: 'hsl(215, 16%, 97%)',
      foreground: 'hsl(215, 25%, 17%)',
      primary: 'hsl(215, 50%, 45%)',
    },
  },
};

// Theme utility functions

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
 * Theme category type for filtering
 */
export type ThemeCategory = ThemeConfig['category'];

/**
 * Get themes by category
 */
export const getThemesByCategory = (category: ThemeCategory): ThemeConfig[] =>
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
