'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '../ui/skeleton';

const PDFViewer = dynamic(
  () => import('./pdf-viewer').then((mod) => ({ default: mod.PDFViewer })),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center w-full">
        <Skeleton className="w-full h-96 mb-4" />
        <div className="flex items-center justify-between w-full max-w-md">
          <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-8 h-8" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-12 h-4" />
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-8 h-8" />
          </div>
        </div>
      </div>
    ),
  }
);

interface PDFViewerWrapperProps {
  file: string;
  downloadLink?: string;
  className?: string;
}

export function PDFViewerWrapper(props: PDFViewerWrapperProps) {
  return <PDFViewer {...props} />;
}
