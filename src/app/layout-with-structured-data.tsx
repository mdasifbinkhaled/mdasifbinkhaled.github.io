import { ScholarStructuredDataScript } from '@/shared/components/common/structured-data';

export default function LayoutWithStructuredData({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScholarStructuredDataScript />
      {children}
    </>
  );
}
