import { ExamCountdown, AppPageHeader } from '@/features/apps';
import { buildAppMetadata } from '@/shared/config/apps';

export const metadata = buildAppMetadata('exam-countdown');

export default function ExamCountdownPage() {
  return (
    <div className="container-responsive flex flex-col gap-8 pb-16 pt-8">
      <AppPageHeader slug="exam-countdown" />
      <ExamCountdown />
    </div>
  );
}
