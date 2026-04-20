import { CoursePlanner, AppPageHeader } from '@/features/apps';
import { buildAppMetadata } from '@/shared/config/apps';

export const metadata = buildAppMetadata('course-planner');

export default function CoursePlannerPage() {
  return (
    <div className="container-responsive flex flex-col gap-8 pb-16 pt-8">
      <AppPageHeader slug="course-planner" />
      <CoursePlanner />
    </div>
  );
}
