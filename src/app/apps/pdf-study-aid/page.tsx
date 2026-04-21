import { AppPageHeader, PdfStudyAid } from '@/features/apps';
import { buildAppMetadata } from '@/shared/config/apps';

export const metadata = buildAppMetadata('pdf-study-aid');

export default function PdfStudyAidPage() {
  return (
    <div className="container-responsive flex flex-col gap-8 pb-16 pt-8">
      <AppPageHeader slug="pdf-study-aid" />
      <PdfStudyAid />
    </div>
  );
}
