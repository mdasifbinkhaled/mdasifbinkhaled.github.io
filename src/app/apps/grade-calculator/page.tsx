import { GradeCalculator, AppPageHeader } from '@/features/apps';
import { buildAppMetadata } from '@/shared/config/apps';

export const metadata = buildAppMetadata('grade-calculator');

export default function GradeCalculatorPage() {
  return (
    <div className="container-responsive flex flex-col gap-8 pb-16 pt-8">
      <AppPageHeader slug="grade-calculator" />
      <GradeCalculator />
    </div>
  );
}
