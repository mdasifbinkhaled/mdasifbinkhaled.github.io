import type { ElementType } from 'react';

import { iconComponents } from '@/shared/components/common/icons';

/**
 * Navigation icon map — re-exported from the single icon registry.
 * Add new icons to `iconComponents` in `@/shared/components/common/icons.tsx`.
 */
export const navIconMap: Record<string, ElementType> = iconComponents;
