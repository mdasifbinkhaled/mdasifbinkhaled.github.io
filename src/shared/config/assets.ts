/**
 * Asset Configuration
 * Centralized configuration for all static assets
 */

/**
 * Canonical site URL — single source of truth shared with site.ts.
 * Kept here (not in site.ts) to avoid the circular dependency:
 *   site.ts → assets.ts → site.ts
 */
export const SITE_URL = 'https://mdasifbinkhaled.github.io';

export const assetPaths = {
  // Images
  profile: '/images/abstract_profile.png',
  ogImage: '/images/og-image.png',
  favicon: '/favicon.ico',

  // Documents
  cv: '/cv/CV_Md_Asif_Bin_Khaled.pdf',

  // Icons
  siteWebmanifest: '/site.webmanifest',
} as const;

export const assetConfig = {
  // Image optimization settings
  profileImage: {
    width: 200,
    height: 200,
    alt: 'Md Asif Bin Khaled - Profile Photo',
  },

  ogImage: {
    width: 1200,
    height: 630,
    alt: 'Md Asif Bin Khaled - Academic Portfolio',
  },
} as const;

// Helper function to get full asset URL
export const getAssetUrl = (path: string, baseUrl = SITE_URL): string => {
  return `${baseUrl}${path}`;
};
