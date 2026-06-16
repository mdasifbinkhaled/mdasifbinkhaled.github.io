import { toast } from 'sonner';

/** Copy text to the clipboard and confirm with a toast (course-page actions). */
export function copyToClipboard(text: string): void {
  const done = (): string | number => toast.success('Copied to clipboard');
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(done, done);
  } else {
    done();
  }
}
