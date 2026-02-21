const CACHE_NAME = 'mabk-portfolio-cache-v1';
const URLS_TO_CACHE = [
  '/',
  '/about/',
  '/research/',
  '/teaching/',
  '/publications/',
  '/contact/',
  '/favicon.ico',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Fail gently if some resources are not immediately available
      return cache.addAll(URLS_TO_CACHE).catch((err) => {
        console.warn('SW Cache warning:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only cache GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      // Network fallback
      return fetch(event.request)
        .then((networkResponse) => {
          // Only cache valid responses
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== 'basic'
          ) {
            return networkResponse;
          }

          // Clone the response because the stream can only be consumed once
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        })
        .catch(() => {
          // Optional offline fallback could go here
        });
    })
  );
});
