import { test, expect } from '../support/fixtures';
import { Site, SHELL_ROUTES } from '../support/site';
import { db } from '../support/data';

// Third-party hosts are stubbed by the fixture, but the browser still enforces the real CSP
// on those requests, so a missing allow-list entry surfaces here as a violation.
test.describe('console, CSP and network hygiene', () => {
  const routes = [
    ...SHELL_ROUTES,
    ...db.webApps().filter((a) => a.selector).map((a) => `/applications/web/${a.name}`),
    '/applications/java/Clock',
    '/applications/android/LiveWallpaper',
    '/not-a-real-page',
    '/webapplications/say2',
  ];

  for (const route of routes) {
    test(`no console errors, CSP violations or failed requests on ${route}`, async ({ page, diagnostics }) => {
      await page.goto(route);
      await expect(page.locator('app-root')).toBeVisible();
      // Everything the page needs is requested during load; wait for it to settle instead of sleeping.
      await page.waitForLoadState('networkidle');
      await diagnostics.expectClean();
    });
  }

  test('interacting with tabs, README expansion and video thumbnails stays clean @smoke', async ({ page, diagnostics }) => {
    const site = new Site(page);
    await site.goto('/github-projects');
    await page.locator('app-github-projects .page-tab', { hasText: 'School Projects' }).click();
    await page.locator('app-github-projects .tab-content:visible .project-header .col-4').first().click();
    await expect(page.locator('app-github-projects .tab-content:visible markdown').first()).toBeVisible();
    await site.goto('/videos');
    await page.locator('app-videos .tab-content:visible .video-media img').first().click();
    await expect(page.locator('app-videos .tab-content:visible iframe')).toHaveCount(1);
    await page.waitForLoadState('networkidle');
    await diagnostics.expectClean();
  });

  test('only allow-listed third-party origins are contacted on Home, Projects and Videos', async ({ page, thirdParty }) => {
    const site = new Site(page);
    for (const route of ['/home', '/github-projects', '/videos']) {
      await site.goto(route);
      await page.waitForLoadState('networkidle');
    }
    const allowed = [
      'www.w3schools.com', 'stackpath.bootstrapcdn.com', 'use.fontawesome.com', 'code.jquery.com',
      'cdnjs.cloudflare.com', 'cdn.nathangawith.com', 'img.youtube.com', 'raw.githubusercontent.com',
      'github-contributions-api.jogruber.de', 'fonts.googleapis.com', 'fonts.gstatic.com',
    ];
    const hosts = [...new Set(thirdParty.map((u) => new URL(u).hostname))];
    expect(hosts.filter((h) => !allowed.includes(h) && !h.endsWith('.nathangawith.com'))).toEqual([]);
  });

  test('every request is https for third parties (no mixed content)', async ({ page, thirdParty }) => {
    const site = new Site(page);
    await site.goto('/videos');
    await page.waitForLoadState('networkidle');
    expect(thirdParty.filter((u) => u.startsWith('http:'))).toEqual([]);
  });
});
