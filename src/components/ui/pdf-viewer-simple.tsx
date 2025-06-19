"use client"

import React from 'react';
import { Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PDFViewerProps {
  file: string;
  downloadLink?: string;
  className?: string;
}

export function PDFViewer({ file, downloadLink, className }: PDFViewerProps) {
  return (
    <Card className={`w-full max-w-4xl mx-auto bg-white shadow-lg ${className || ''}`}>
      {/* PDF Controls */}
      <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <span className="font-medium text-gray-700">CV Viewer</span>
        </div>
        
        {downloadLink && (
          <Button variant="outline" size="sm" asChild>
            <a href={downloadLink} download aria-label="Download CV">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </a>
          </Button>
        )}
      </div>

      {/* PDF iframe - more reliable for static builds */}
      <div className="relative w-full" style={{ minHeight: '600px' }}>
        <iframe
          src={file}
          className="w-full h-full border-0"
          style={{ minHeight: '600px', height: '80vh' }}
          title="CV Document"
          loading="lazy"
        />
      </div>

      {/* Fallback message */}
      <div className="p-4 text-center bg-gray-50 border-t">
        <p className="text-sm text-gray-600">
          Cannot view the PDF? 
          {downloadLink && (
            <a 
              href={downloadLink} 
              download 
              className="ml-1 text-primary hover:underline font-medium"
            >
              Download it here
            </a>
          )}
        </p>
      </div>
    </Card>
  );
}
