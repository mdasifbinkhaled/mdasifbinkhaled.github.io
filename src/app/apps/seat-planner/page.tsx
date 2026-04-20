import { SeatPlanner, AppPageHeader } from '@/features/apps';
import { buildAppMetadata } from '@/shared/config/apps';

export const metadata = buildAppMetadata('seat-planner');

export default function SeatPlannerPage() {
  return (
    <div className="container-responsive flex flex-col gap-8 pb-16 pt-8">
      <AppPageHeader slug="seat-planner" className="print:hidden" />
      <SeatPlanner />
    </div>
  );
}
