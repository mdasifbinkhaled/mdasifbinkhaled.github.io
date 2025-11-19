/**
 * News and Announcements Data
 * Central repository for all news items and recent achievements
 */

import type { NewsItem } from '@/shared/components/common/news-feed';

/**
 * Recent news and achievements (displayed on homepage)
 * Sorted by date (newest first)
 */
export const newsItems: NewsItem[] = [
  {
    date: '[2025/03]',
    text: 'Successfully defended research proposal for ',
    highlight: 'Bangla Dialect Detection',
    description: " project funded by VC's Research Fund at IUB.",
  },
  {
    date: '[2025/01]',
    text: 'Awarded Principal Investigator role for ',
    highlight: 'Unveiling the Linguistic Diversity of Bangla',
    description: ' (VCRF-SETS:24-013) research grant.',
  },
  {
    date: '[2024/09]',
    text: 'Promoted to Senior Lecturer at Independent University, Bangladesh (IUB).',
  },
];

/**
 * Get all news items
 */
export function getNewsItems(): NewsItem[] {
  return newsItems;
}

/**
 * Get recent news items (limited count)
 * @param limit Maximum number of items to return
 */
export function getRecentNews(limit: number = 3): NewsItem[] {
  return newsItems.slice(0, limit);
}
