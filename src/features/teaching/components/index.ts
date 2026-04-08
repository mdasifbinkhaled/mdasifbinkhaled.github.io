/**
 * Teaching components — sub-barrel
 *
 * Re-exports the public components used by teaching pages.
 * Internal sub-components (schedule-table, syllabus-table, etc.)
 * stay private to the feature.
 */

// Page-level components
export { default as TeachingTabsClient } from './teaching-tabs.client';
export { InstitutionCoursesPage } from './institution-courses-page';
export { CoursePageLayout } from './course-page-layout';

// Shared teaching components
export { CourseCard } from './course-card';
export { CourseCardCompact } from './course-card-compact';
export { TeachingHeroStats } from './teaching-hero-stats';
export { TeachingCTA } from './teaching-cta';

// Styles
export { getLevelStyle, LEVEL_STYLES } from './styles';
