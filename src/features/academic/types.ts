/**
 * Academic feature types
 */

export interface SearchableContent {
  id: string;
  title: string;
  content: string;
  type: 'publication' | 'course' | 'experience' | 'news';
  year?: number;
  tags: string[];
  url: string;
  metadata?: Record<string, unknown>;
}
