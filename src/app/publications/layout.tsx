
import { PublicationStructuredDataScript } from '@/shared/components/common/structured-data';


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
