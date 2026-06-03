const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const HOST = '0.0.0.0';
const WEB_ROOT = __dirname;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];

  if (urlPath === '/' || urlPath === '') {
    urlPath = '/html/home.html';
  }

  if (urlPath === '/sitemap.xml') {
    urlPath = '/html/sitemap.xml';
  }

  const resolvedPath = path.resolve(WEB_ROOT, '.' + urlPath);
  if (!resolvedPath.startsWith(WEB_ROOT + path.sep) && resolvedPath !== WEB_ROOT) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  const ext = path.extname(resolvedPath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(resolvedPath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        const notFoundPath = path.join(WEB_ROOT, 'html', '404.html');
        fs.readFile(notFoundPath, (err2, data2) => {
          if (err2) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
          } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(data2);
          }
        });
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
      return;
    }

    const cacheExts = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp', '.woff', '.woff2', '.ttf'];
    const cacheControl = cacheExts.includes(ext) ? 'public, max-age=86400' : 'public, max-age=3600';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': cacheControl
    });
    res.end(data);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`KhanaBook server running at http://${HOST}:${PORT}`);
  console.log(`Open http://localhost:${PORT}/html/home.html to view the site`);
});
