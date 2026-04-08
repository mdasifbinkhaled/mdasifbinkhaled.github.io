import { PublicationStructuredDataScript } from '@/shared/components/infra/structured-data';

export default function PublicationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicationStructuredDataScript />
      {children}
    </>
  );
}
