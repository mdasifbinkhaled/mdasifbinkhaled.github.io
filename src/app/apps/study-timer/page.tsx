import { StudyTimer, AppPageHeader } from '@/features/apps';
import { buildAppMetadata } from '@/shared/config/apps';

export const metadata = buildAppMetadata('study-timer');

export default function StudyTimerPage() {
  return (
    <div className="container-responsive flex flex-col gap-8 pb-16 pt-8">
      <AppPageHeader slug="study-timer" />
      <StudyTimer />
    </div>
  );
}
