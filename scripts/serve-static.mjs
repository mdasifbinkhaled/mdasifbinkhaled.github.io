import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';

const rootDirectory = resolve(process.cwd(), process.argv[2] ?? 'out');
const port = Number(process.argv[3] ?? process.env.PORT ?? 3000);

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webmanifest', 'application/manifest+json; charset=utf-8'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
  ['.xml', 'application/xml; charset=utf-8'],
]);

function isInsideRoot(filePath) {
  return (
    filePath === rootDirectory || filePath.startsWith(`${rootDirectory}${sep}`)
  );
}

function getFileCandidate(pathname) {
  const filePath = resolve(rootDirectory, `.${pathname}`);

  if (!isInsideRoot(filePath)) {
    return undefined;
  }

  const candidates = pathname.endsWith('/')
    ? [
        resolve(filePath, 'index.html'),
        pathname === '/'
          ? undefined
          : resolve(rootDirectory, `.${pathname.slice(0, -1)}.html`),
      ]
    : [
        filePath,
        !extname(filePath) ? `${filePath}.html` : undefined,
        !extname(filePath) ? resolve(filePath, 'index.html') : undefined,
      ];

  for (const candidate of candidates) {
    if (
      candidate &&
      isInsideRoot(candidate) &&
      existsSync(candidate) &&
      statSync(candidate).isFile()
    ) {
      return candidate;
    }
  }

  return undefined;
}

const server = createServer((request, response) => {
  try {
    const requestUrl = new URL(request.url ?? '/', 'http://localhost');
    const pathname = decodeURIComponent(requestUrl.pathname);
    const filePath = getFileCandidate(pathname);

    if (!filePath) {
      response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      response.end('Not found');
      return;
    }

    response.writeHead(200, {
      'cache-control': 'no-store',
      'content-type':
        contentTypes.get(extname(filePath)) ?? 'application/octet-stream',
    });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(400, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Bad request');
  }
});

server.listen(port, () => {
  process.stdout.write(
    `Serving ${rootDirectory} on http://localhost:${port}\n`
  );
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
  });
}
