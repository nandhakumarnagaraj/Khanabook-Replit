const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const PORT = process.env.PORT || 5000;
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

const TEXT_EXTS = ['.html', '.css', '.js', '.json', '.svg', '.xml', '.txt'];

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https://lh3.googleusercontent.com data:; connect-src 'self'; frame-src 'self'; object-src 'none'",
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

function send(res, status, headers, body) {
  res.writeHead(status, { ...SECURITY_HEADERS, ...headers });
  res.end(body);
}

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];

  try {
    urlPath = decodeURIComponent(urlPath);
  } catch {
    send(res, 400, { 'Content-Type': 'text/plain; charset=utf-8' }, '400 Bad Request');
    return;
  }

  // Legacy competitor-page redirect
  if (urlPath === '/html/vs-petpooja.html' || urlPath === '/vs-petpooja.html') {
    send(res, 301, { Location: '/compare.html' });
    return;
  }

  // Canonical URLs are root-level (khanabook.com/features.html):
  // permanently redirect /html/*.html to /*.html to avoid duplicate content.
  const htmlPrefixMatch = urlPath.match(/^\/html\/([^/]+\.html)$/);
  if (htmlPrefixMatch) {
    send(res, 301, { Location: '/' + htmlPrefixMatch[1] });
    return;
  }

  if (urlPath === '/' || urlPath === '') {
    urlPath = '/html/home.html';
  } else if (urlPath === '/sitemap.xml') {
    urlPath = '/html/sitemap.xml';
  } else if (/^\/[^/]+\.html$/.test(urlPath)) {
    // Root-level pages are stored in /html
    urlPath = '/html' + urlPath;
  }

  const resolvedPath = path.resolve(WEB_ROOT, '.' + urlPath);
  if (!resolvedPath.startsWith(WEB_ROOT + path.sep) && resolvedPath !== WEB_ROOT) {
    send(res, 403, { 'Content-Type': 'text/plain; charset=utf-8' }, '403 Forbidden');
    return;
  }

  const ext = path.extname(resolvedPath).toLowerCase();
  let contentType = mimeTypes[ext] || 'application/octet-stream';
  if (TEXT_EXTS.includes(ext)) contentType += '; charset=utf-8';

  const acceptsGzip = req.headers['accept-encoding'] && req.headers['accept-encoding'].includes('gzip');
  const shouldCompress = acceptsGzip && TEXT_EXTS.includes(ext);

  fs.readFile(resolvedPath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT' || err.code === 'EISDIR') {
        const notFoundPath = path.join(WEB_ROOT, 'html', '404.html');
        fs.readFile(notFoundPath, (err2, data2) => {
          if (err2) {
            send(res, 404, { 'Content-Type': 'text/plain; charset=utf-8' }, '404 Not Found');
          } else {
            send(res, 404, { 'Content-Type': 'text/html; charset=utf-8' }, data2);
          }
        });
      } else {
        send(res, 500, { 'Content-Type': 'text/plain; charset=utf-8' }, '500 Internal Server Error');
      }
      return;
    }

    // HTML changes often; static assets are cache-busted via ?v= so cache aggressively.
    const cacheControl = ext === '.html' ? 'public, max-age=600' : (
      ['.css', '.js'].includes(ext) ? 'public, max-age=31536000, immutable' :
      ext === '.webp' || ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.svg' || ext === '.ico' ? 'public, max-age=604800' :
      'public, max-age=86400'
    );
    const headers = {
      'Content-Type': contentType,
      'Cache-Control': cacheControl,
    };

    if (shouldCompress) {
      headers['Content-Encoding'] = 'gzip';
      zlib.gzip(data, (gzErr, compressed) => {
        if (gzErr) {
          delete headers['Content-Encoding'];
          send(res, 200, headers, data);
        } else {
          send(res, 200, headers, compressed);
        }
      });
    } else {
      send(res, 200, headers, data);
    }
  });
});

server.listen(PORT, HOST, () => {
  console.log(`KhanaBook server running at http://${HOST}:${PORT}`);
});
