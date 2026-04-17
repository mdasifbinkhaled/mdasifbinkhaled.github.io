const { generateSW } = require('workbox-build');

async function build() {
  const { count, size } = await generateSW({
    globDirectory: 'out',
    globPatterns: ['**/*.{html,css,js,json,png,jpg,jpeg,ico,svg,woff2,webp}'],
    globIgnores: ['**/sw.js', '**/workbox-*.js'],
    swDest: 'out/sw.js',
    clientsClaim: true,
    skipWaiting: true,
    runtimeCaching: [
      {
        urlPattern: /\.(?:html)$/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'pages',
          expiration: { maxEntries: 50, maxAgeSeconds: 86400 },
        },
      },
      // NOTE: JS/CSS are emitted with content-hashed filenames by Next.js and
      // are already in the precache manifest above. A runtime rule for them
      // would only add risk (serving a stale hashed bundle if one slipped
      // past precache) with no benefit, so it is intentionally omitted.
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images',
          expiration: { maxEntries: 100, maxAgeSeconds: 2592000 },
        },
      },
    ],
  });

  console.log(
    `Generated SW: ${count} files precached (${(size / 1024).toFixed(1)} KB)`
  );
}

build().catch((err) => {
  console.error('Workbox SW generation failed:', err);
  process.exit(1);
});
