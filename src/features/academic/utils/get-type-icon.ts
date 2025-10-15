/**
 * Returns an emoji icon for a given content type.
 * @param type - The content type (publication, course, experience, news)
 * @returns An emoji string representing the type
 */
export function getTypeIcon(type: string): string {
  switch (type) {
    case 'publication':
      return '📄';
    case 'course':
      return '📚';
    case 'experience':
      return '💼';
    case 'news':
      return '📰';
    default:
      return '📋';
  }
}
