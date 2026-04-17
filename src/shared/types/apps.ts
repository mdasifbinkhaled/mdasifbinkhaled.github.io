import type { IconName } from '@/shared/components/common/icons';

export type AppStatus = 'active' | 'beta' | 'planned';

export type AppCategory = 'grades' | 'planning' | 'productivity';

export interface AppDefinition {
  /** Unique slug used in the route: /apps/{slug} */
  slug: string;
  title: string;
  description: string;
  icon: IconName;
  status: AppStatus;
  category: AppCategory;
}
