import { toast } from 'sonner';

/** Legacy fallback for the rare context without the async Clipboard API. */
function legacyCopy(text: string): boolean {
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

/**
 * Copy text to the clipboard and confirm with a toast (course-page actions).
 * Reports honestly: only confirms success when the copy actually happened.
 */
export function copyToClipboard(text: string): void {
  const ok = (): void => void toast.success('Copied to clipboard');
  const fail = (): void =>
    void toast.error('Could not copy — please copy it manually');

  if (navigator.clipboard?.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(ok, () => (legacyCopy(text) ? ok() : fail()));
  } else if (legacyCopy(text)) {
    ok();
  } else {
    fail();
  }
}
