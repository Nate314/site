// Fails when the sha256 hashes in the nginx.conf Content-Security-Policy do not match
// the inline scripts and inline event handlers of the built docs/index.html.
// Run after `ng build`: node scripts/check-csp-hashes.js
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
// Browsers normalise CRLF to LF before hashing, so a Windows build hashes the same as a Linux one.
const html = fs.readFileSync(path.join(root, 'docs', 'index.html'), 'utf8').replace(/\r\n?/g, '\n');
const nginxConf = fs.readFileSync(path.join(root, 'nginx.conf'), 'utf8');

const inlineScripts = [...html.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
const eventHandlers = [...html.matchAll(/<[^>]*?\son\w+=("[^"]*"|'[^']*')[^>]*>/gi)].map(m => m[1].slice(1, -1));
const sha256 = text => 'sha256-' + crypto.createHash('sha256').update(text, 'utf8').digest('base64');

const built = new Map([...inlineScripts, ...eventHandlers].map(snippet => [sha256(snippet), snippet]));
const allowed = new Set(nginxConf.match(/sha256-[A-Za-z0-9+/]+=*/g) || []);

const missing = [...built.keys()].filter(hash => !allowed.has(hash));
const stale = [...allowed].filter(hash => !built.has(hash));

for (const hash of missing) {
  console.error(`Not allowed by the CSP in nginx.conf: '${hash}' for inline snippet:\n${built.get(hash).trim()}\n`);
}
for (const hash of stale) {
  console.error(`In nginx.conf but matching no inline snippet in docs/index.html: '${hash}'\n`);
}
if (missing.length || stale.length) {
  console.error('CSP hashes are out of sync: update script-src in nginx.conf.');
  process.exit(1);
}
console.log(`CSP hashes in nginx.conf match the ${built.size} inline snippets in docs/index.html.`);
