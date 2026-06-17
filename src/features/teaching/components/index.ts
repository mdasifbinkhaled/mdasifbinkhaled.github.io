/**
 * Teaching components — sub-barrel
 *
 * Re-exports the public components used by teaching pages.
 * Internal sub-components (schedule-table, syllabus-table, etc.)
 * stay private to the feature.
 */

// Shared teaching components
export { CourseCard } from './course-card';
export { CourseCardCompact } from './course-card-compact';
export { TeachingHeroStats } from './teaching-hero-stats';
export { TeachingCTA } from './teaching-cta';
export { TeachingRecordTable } from './teaching-record-table';

// Styles
export { getLevelStyle, LEVEL_STYLES } from './styles';

// Sections
export { MentorshipSection } from './mentorship-section';
