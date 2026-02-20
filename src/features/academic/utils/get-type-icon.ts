import { FileText, Book, Briefcase, Newspaper, Clipboard } from 'lucide-react';
import React from 'react';

/**
 * Returns a React component for a given content type.
 * @param type - The content type (publication, course, experience, news)
 * @returns A Lucide React icon representing the type
 */
export function getTypeIcon(type: string): React.ReactNode {
  switch (type) {
    case 'publication':
      return React.createElement(FileText, { className: 'w-4 h-4' });
    case 'course':
      return React.createElement(Book, { className: 'w-4 h-4' });
    case 'experience':
      return React.createElement(Briefcase, { className: 'w-4 h-4' });
    case 'news':
      return React.createElement(Newspaper, { className: 'w-4 h-4' });
    default:
      return React.createElement(Clipboard, { className: 'w-4 h-4' });
  }
}
