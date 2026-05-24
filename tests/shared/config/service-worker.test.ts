import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';

describe('Service Worker Generator Quality Gate', () => {
  const scriptPath = join(
    process.cwd(),
    'scripts',
    'generate-service-worker.mjs'
  );

  it('contains the 3-second network-timeout logic', () => {
    const content = readFileSync(scriptPath, 'utf8');

    // Assert that the timeout promise racing is present
    expect(content).toContain('timeoutPromise = new Promise');
    expect(content).toContain('setTimeout(');
    expect(content).toContain('3000'); // 3 seconds timeout

    // Assert that the Promise.race logic is integrated in networkFirst fetch
    expect(content).toContain('Promise.race([fetch(request), timeoutPromise])');
  });

  it('implements standard offline page and image cache buckets', () => {
    const content = readFileSync(scriptPath, 'utf8');

    expect(content).toContain("PAGE_CACHE = 'pages-");
    expect(content).toContain("IMAGE_CACHE = 'images-");
    expect(content).toContain('isHtmlRequest');
    expect(content).toContain('isImageRequest');
  });
});
