/**
 * Trigger a browser file-download from in-memory content.
 *
 * Creates a temporary Blob URL, clicks an invisible anchor, then revokes it.
 * Client-only: returns early if called outside a browser (SSR/build time).
 */
export function downloadFile(
  content: string,
  filename: string,
  mimeType: string
): void {
  if (typeof document === 'undefined') return;
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
