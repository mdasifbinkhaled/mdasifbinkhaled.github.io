import { GpaCalculator, AppPageHeader } from '@/features/apps';
import { buildAppMetadata } from '@/shared/config/apps';

export const metadata = buildAppMetadata('gpa-calculator');

export default function GpaCalculatorPage() {
  return (
    <div className="container-responsive flex flex-col gap-8 pb-16 pt-8">
      <AppPageHeader slug="gpa-calculator" />
      <GpaCalculator />
    </div>
  );
}
