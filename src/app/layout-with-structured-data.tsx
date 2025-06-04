import { ScholarStructuredData } from '@/components/structured-data';

export default function LayoutWithStructuredData({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScholarStructuredData />
      {children}
    </>
  );
}
