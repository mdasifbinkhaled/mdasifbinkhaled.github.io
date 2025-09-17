import { ScholarStructuredDataScript } from '@/components/structured-data';

export default function LayoutWithStructuredData({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScholarStructuredDataScript />
      {children}
    </>
  );
}
