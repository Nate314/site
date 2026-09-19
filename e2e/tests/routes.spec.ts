import { test, expect } from '../support/fixtures';
import { Site, SHELL_ROUTES } from '../support/site';
import { db } from '../support/data';

test.describe('routes and deep links', () => {
  test('root redirects to /home @smoke', async ({ page }) => {
    const site = new Site(page);
    await site.goto('/');
    await expect(page).toHaveURL(/\/home$/);
    await site.expectTitle('NathanGawith | Home');
    await expect(site.matCards).toHaveCount(1);
  });

  const pageTitles: Record<string, string> = {
    '/home': 'NathanGawith | Home',
    '/github-projects': 'NathanGawith | Github Projects',
    '/applications': 'NathanGawith | Applications | Applications',
    '/applications/web': 'NathanGawith | Applications | WebApplications',
    '/applications/java': 'NathanGawith | Applications | JavaApplications',
    '/applications/android': 'NathanGawith | Applications | AndroidApplications',
    '/videos': 'NathanGawith | Videos',
  };

  for (const route of SHELL_ROUTES) {
    test(`deep link and hard reload work for ${route}`, async ({ page }) => {
      const site = new Site(page);
      await test.step('cold load straight from the server (nginx SPA fallback)', async () => {
        const response = await site.goto(route);
        expect(response?.status()).toBe(200);
        await expect(page).toHaveURL(new RegExp(`${route}$`));
        await site.expectTitle(pageTitles[route]);
        await expect(site.matCards.first()).toBeVisible();
      });
      await test.step('hard reload stays on the same route', async () => {
        await page.reload();
        await expect(page).toHaveURL(new RegExp(`${route}$`));
        await site.expectTitle(pageTitles[route]);
        await expect(site.matCards.first()).toBeVisible();
      });
    });
  }

  test('nested web application routes open every visible web app', async ({ page }) => {
    const site = new Site(page);
    for (const app of db.webApps().filter((a) => a.selector)) {
      await test.step(app.name, async () => {
        await site.goto(`/applications/web/${app.name}`);
        await site.expectTitle(`NathanGawith | Applications | WebApplications | ${app.name}`);
        // App card plus the description card
        await expect(site.matCards).toHaveCount(2);
        await expect(site.matCards.nth(1)).toContainText(app.description.slice(0, 40));
      });
    }
  });

  test('nested java and android routes show their download cards', async ({ page }) => {
    const site = new Site(page);
    await site.goto('/applications/java/Clock');
    await site.expectTitle('NathanGawith | Applications | JavaApplications');
    await expect(site.matCards).toHaveCount(db.javaApps().length);
    await site.goto('/applications/android/LiveWallpaper');
    await site.expectTitle('NathanGawith | Applications | AndroidApplications');
    await expect(site.matCards).toHaveCount(db.androidApps().length);
  });

  test('standalone web application routes render without the site shell', async ({ page }) => {
    await page.goto('/webapplications/say2');
    await expect(page.locator('app-say2')).toBeVisible();
    await expect(page.locator('nav.navbar')).toHaveCount(0);
  });

  test.describe('404 and fallback', () => {
    test('unknown path is served the SPA with the not found message @smoke', async ({ page }) => {
      const site = new Site(page);
      const response = await site.goto('/definitely/not/a/page');
      // nginx try_files falls back to index.html, so the server answers 200 and Angular renders the 404.
      expect(response?.status()).toBe(200);
      await expect(response?.headers()['content-type']).toContain('text/html');
      await expect(page.locator('app-not-found')).toContainText('NOT FOUND');
      await expect(site.matCards).toHaveCount(0);
    });

    test('an unknown path can be left through the navbar without a stale redirect', async ({ page }) => {
      const site = new Site(page);
      await site.goto('/still-not-a-page');
      await expect(page.locator('app-not-found')).toContainText('NOT FOUND');
      await site.navLink('Videos').click();
      await expect(page).toHaveURL(/\/videos$/);
      await expect(site.matCards.first()).toBeVisible();
    });

    test('a redirect entry from db.json shows a message then leaves for its target', async ({ page }) => {
      const resume = db.redirects.find((r) => r.title === '/resume')!;
      await page.route(`${resume.link}**`, (route) =>
        route.fulfill({ status: 200, contentType: 'text/html', body: '<title>resume stub</title>' }));
      await page.goto(resume.title);
      await expect(page.locator('app-not-found')).toContainText(`Redirecting to ${resume.description}`);
      await page.waitForURL(`${resume.link}/`);
    });
  });

  test('a missing static asset is not disguised as a JavaScript file', async ({ request }) => {
    // Documents current behavior: the SPA fallback answers 200 text/html for any unknown path,
    // so a browser importing a missing .js would receive HTML (and fail MIME checks, not run it).
    const response = await request.get('/missing-file.js');
    expect(response.headers()['content-type']).toContain('text/html');
    expect(response.headers()['x-content-type-options']).toBe('nosniff');
  });
});
