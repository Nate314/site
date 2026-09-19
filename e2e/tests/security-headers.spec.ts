import { test, expect } from '../support/fixtures';
import { Site } from '../support/site';

const HEADERS = {
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'SAMEORIGIN',
  'referrer-policy': 'strict-origin-when-cross-origin',
} as const;

function parseCsp(csp: string): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const part of csp.split(';')) {
    const [name, ...values] = part.trim().split(/\s+/);
    if (name) map.set(name, values);
  }
  return map;
}

test.describe('security headers', () => {
  // Deep links, the SPA fallback, and static assets must all carry the same headers.
  const documents = ['/', '/home', '/videos', '/no-such-page'];

  for (const path of documents) {
    test(`HTML response for ${path} carries the hardening headers @smoke`, async ({ request }) => {
      const response = await request.get(path);
      expect(response.status()).toBe(200);
      const h = response.headers();
      for (const [name, value] of Object.entries(HEADERS)) expect(h[name], name).toBe(value);
      expect(h['permissions-policy']).toContain('camera=()');
      expect(h['permissions-policy']).toContain('microphone=()');
      expect(h['permissions-policy']).toContain('geolocation=()');
      expect(h['content-security-policy'], 'content-security-policy').toBeTruthy();
    });
  }

  test('the server does not leak its version @smoke', async ({ request }) => {
    for (const path of ['/', '/home', '/no-such-page', '/assets/db.json']) {
      const h = (await request.get(path)).headers();
      expect(h['server'] ?? '', `Server header on ${path}`).toMatch(/^(nginx)?$/i);
      expect(h['x-powered-by']).toBeUndefined();
    }
  });

  test('Content-Security-Policy is restrictive', async ({ request }) => {
    const csp = parseCsp((await request.get('/')).headers()['content-security-policy']);
    expect(csp.get('default-src')).toEqual(["'self'"]);
    expect(csp.get('object-src')).toEqual(["'none'"]);
    expect(csp.get('base-uri')).toEqual(["'self'"]);
    expect(csp.get('form-action')).toEqual(["'self'"]);
    expect(csp.get('frame-ancestors')).toEqual(["'self'"]);
    const scripts = csp.get('script-src') ?? [];
    expect(scripts).not.toContain("'unsafe-eval'");
    expect(scripts).not.toContain("'unsafe-inline'");
    expect(scripts).not.toContain('*');
    // Exactly two inline snippets are allowed, each pinned by hash.
    expect(scripts.filter((s) => s.startsWith("'sha256-"))).toHaveLength(2);
    expect(csp.get('frame-src')).toEqual(expect.arrayContaining(["'self'", 'https://www.youtube.com']));
    expect(csp.get('connect-src')).toEqual(expect.arrayContaining(["'self'", 'https://raw.githubusercontent.com']));
  });

  test('static assets are served with nosniff and the right content type', async ({ page, request, baseURL }) => {
    const site = new Site(page);
    const origin = new URL(baseURL!).origin;
    const assets = new Set<string>();
    page.on('response', (r) => {
      const { origin: o, pathname } = new URL(r.url());
      if (o === origin && /\.(js|css|json|ico)$/.test(pathname)) assets.add(r.url());
    });
    await site.goto('/home');
    await page.waitForLoadState('networkidle');
    const js = [...assets].find((u) => /main.*\.js$/.test(u));
    const css = [...assets].find((u) => /styles.*\.css$/.test(u));
    const json = [...assets].find((u) => u.endsWith('/assets/db.json'));
    expect(js, 'main bundle was requested').toBeTruthy();
    expect(css, 'styles.css was requested').toBeTruthy();
    expect(json, 'db.json was requested').toBeTruthy();
    for (const url of assets) {
      const response = await request.get(url);
      expect(response.status(), url).toBe(200);
      expect(response.headers()['x-content-type-options'], url).toBe('nosniff');
    }
    expect((await request.get(js!)).headers()['content-type']).toMatch(/javascript/);
    expect((await request.get(css!)).headers()['content-type']).toContain('text/css');
    expect((await request.get(json!)).headers()['content-type']).toContain('application/json');
  });

  test('the CSP is enforced by the browser: an unlisted frame origin is blocked @smoke', async ({ page, diagnostics }) => {
    const site = new Site(page);
    await site.goto('/home');
    await page.evaluate(() => {
      const frame = document.createElement('iframe');
      frame.src = 'https://not-allowed.example.com/';
      document.body.appendChild(frame);
    });
    await expect.poll(() => diagnostics.cspViolations()).toContainEqual(expect.stringContaining('frame-src'));
  });

  test('the CSP is enforced by the browser: inline script injection does not run', async ({ page, diagnostics }) => {
    const site = new Site(page);
    await site.goto('/home');
    await page.evaluate(() => {
      const script = document.createElement('script');
      script.textContent = 'window.__injected = true';
      document.body.appendChild(script);
    });
    await expect.poll(() => diagnostics.cspViolations()).toContainEqual(expect.stringContaining('script-src'));
    expect(await page.evaluate(() => (window as unknown as { __injected?: boolean }).__injected)).toBeUndefined();
  });

  test('the app cannot be framed by another origin (frame-ancestors, X-Frame-Options)', async ({ request }) => {
    const h = (await request.get('/')).headers();
    expect(h['x-frame-options']).toBe('SAMEORIGIN');
    expect(h['content-security-policy']).toContain("frame-ancestors 'self'");
  });
});
