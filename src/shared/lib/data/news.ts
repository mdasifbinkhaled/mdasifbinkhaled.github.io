/**
 * News and Announcements Data
 * Central repository for all news items and recent achievements
 */

import type { NewsItem } from '@/shared/components/common/news-feed';

/**
 * Recent news and achievements (displayed on homepage)
 * Sorted by date (newest first)
 * Each item has a unique ID for stable React keys
 */
export const newsItems: NewsItem[] = [
  {
    id: 'news-2025-03-dialect',
    date: '[2025/03]',
    text: 'Successfully defended research proposal for ',
    highlight: 'Bangla Dialect Detection',
    description: " project funded by VC's Research Fund at IUB.",
  },
  {
    id: 'news-2025-01-vcrf',
    date: '[2025/01]',
    text: 'Awarded Principal Investigator role for ',
    highlight: 'Unveiling the Linguistic Diversity of Bangla',
    description: ' (VCRF-SETS:24-013) research grant.',
  },
  {
    id: 'news-2024-09-promotion',
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
