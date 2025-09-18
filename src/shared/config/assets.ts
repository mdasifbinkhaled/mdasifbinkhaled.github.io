/**
 * Asset Configuration
 * Centralized configuration for all static assets
 */

export const assetPaths = {
  // Images
  profile: '/images/profile.jpg',
  ogImage: '/images/og-image.png',
  favicon: '/favicon.ico',

  // Documents
  cv: '/cv/cv.pdf',

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
export const getAssetUrl = (
  path: string,
  baseUrl = 'https://mdasifbinkhaled.github.io'
): string => {
  return `${baseUrl}${path}`;
};
