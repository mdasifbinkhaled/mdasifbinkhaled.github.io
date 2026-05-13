import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { extname, join, relative, sep } from 'node:path';

const outputDirectory = 'out';
const serviceWorkerPath = join(outputDirectory, 'sw.js');
const precacheExtensions = new Set([
  '.css',
  '.html',
  '.ico',
  '.jpeg',
  '.jpg',
  '.js',
  '.json',
  '.png',
  '.svg',
  '.webp',
  '.woff2',
]);

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const filePath = join(directory, entry);
    const stats = statSync(filePath);
    return stats.isDirectory() ? walk(filePath) : [filePath];
  });
}

function toUrl(filePath) {
  return `/${relative(outputDirectory, filePath).split(sep).join('/')}`;
}

function getAliases(url) {
  if (url === '/index.html') {
    return ['/'];
  }

  if (url.endsWith('/index.html')) {
    const directoryUrl = url.slice(0, -'index.html'.length);
    return [directoryUrl, directoryUrl.slice(0, -1)];
  }

  if (url.endsWith('.html')) {
    return [url.slice(0, -'.html'.length)];
  }

  return [];
}

const files = walk(outputDirectory)
  .sort()
  .filter((filePath) => {
    const url = toUrl(filePath);
    return (
      filePath !== serviceWorkerPath &&
      !url.startsWith('/workbox-') &&
      precacheExtensions.has(extname(filePath))
    );
  });

const manifest = files.map((filePath) => {
  const contents = readFileSync(filePath);
  const url = toUrl(filePath);
  return {
    url,
    revision: createHash('sha256').update(contents).digest('hex').slice(0, 16),
    size: contents.byteLength,
  };
});

const aliases = Object.fromEntries(
  manifest.flatMap(({ url }) => getAliases(url).map((alias) => [alias, url]))
);

const cacheVersion = createHash('sha256')
  .update(
    JSON.stringify(manifest.map(({ revision, url }) => ({ revision, url })))
  )
  .digest('hex')
  .slice(0, 12);

const serviceWorker = `const PRECACHE_CACHE = 'precache-${cacheVersion}';
const PAGE_CACHE = 'pages-${cacheVersion}';
const IMAGE_CACHE = 'images-${cacheVersion}';
const KNOWN_CACHES = new Set([PRECACHE_CACHE, PAGE_CACHE, IMAGE_CACHE]);
const PRECACHE_MANIFEST = ${JSON.stringify(manifest.map(({ revision, url }) => ({ revision, url })))};
const PRECACHE_ALIASES = ${JSON.stringify(aliases)};
const PRECACHE_URLS = new Set(PRECACHE_MANIFEST.map((entry) => entry.url));

function normalizePath(pathname) {
  return PRECACHE_ALIASES[pathname] ?? pathname;
}

function isHtmlRequest(request) {
  return request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html');
}

function isImageRequest(pathname) {
  return /\\.(?:png|jpe?g|svg|gif|webp|ico)$/i.test(pathname);
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE_CACHE)
      .then((cache) => cache.addAll(PRECACHE_MANIFEST.map((entry) => entry.url)))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((key) => (KNOWN_CACHES.has(key) ? undefined : caches.delete(key)))))
      .then(() => self.clients.claim())
  );
});

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) await cache.put(request, response.clone());
  return response;
}

async function networkFirst(request) {
  const cache = await caches.open(PAGE_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) await cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    const url = new URL(request.url);
    const precachePath = normalizePath(url.pathname);
    const precached = await caches.match(precachePath);
    if (precached) return precached;
    throw error;
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const precachePath = normalizePath(url.pathname);
  if (PRECACHE_URLS.has(precachePath)) {
    event.respondWith(caches.match(precachePath).then((cached) => cached ?? fetch(request)));
    return;
  }

  if (isHtmlRequest(request)) {
    event.respondWith(networkFirst(request));
    return;
  }

  if (isImageRequest(url.pathname)) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
  }
});
`;

writeFileSync(serviceWorkerPath, serviceWorker);

const totalSize = manifest.reduce((size, entry) => size + entry.size, 0);
process.stdout.write(
  `Generated SW: ${manifest.length} files precached (${(totalSize / 1024).toFixed(1)} KB)\n`
);
