import { OfficeHoursBooker, AppPageHeader } from '@/features/apps';
import { buildAppMetadata } from '@/shared/config/apps';

export const metadata = buildAppMetadata('office-hours');

export default function OfficeHoursPage() {
  return (
    <div className="container-responsive flex flex-col gap-8 pb-16 pt-8">
      <AppPageHeader slug="office-hours" />
      <OfficeHoursBooker />
    </div>
  );
}
