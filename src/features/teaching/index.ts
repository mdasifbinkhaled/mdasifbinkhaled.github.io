/**
 * Teaching feature — public API
 *
 * Re-exports the components, styles, and helpers used by
 * pages under /teaching. Internal sub-components (schedule-table,
 * syllabus-table, etc.) stay private to the feature.
 */
export {
  CourseCard,
  CourseCardCompact,
  TeachingHeroStats,
  TeachingCTA,
  TeachingRecordTable,
  getLevelStyle,
  LEVEL_STYLES,
  MentorshipSection,
} from './components';
