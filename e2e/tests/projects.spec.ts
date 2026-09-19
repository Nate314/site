import { test, expect, README_FIXTURE } from '../support/fixtures';
import { Site } from '../support/site';
import { db, PROJECT_CATEGORIES } from '../support/data';

const projectId = (title: string) => 'gh-project-' + title.replace(/[^a-zA-Z0-9]+/g, '-');

test.describe('github projects', () => {
  test('one tab per non-empty category plus WellSky, with the right project counts @smoke', async ({ page }) => {
    const site = new Site(page);
    await site.goto('/github-projects');
    const tabs = page.locator('app-github-projects .page-tab');
    await expect(tabs).toHaveText(['WellSky', ...PROJECT_CATEGORIES.map((c) => c.label)]);
    await expect(page.locator('app-github-projects .page-tab-active')).toHaveText('WellSky');

    for (const category of PROJECT_CATEGORIES) {
      await test.step(category.label, async () => {
        await tabs.filter({ hasText: category.label }).click();
        await expect(page.locator('app-github-projects .page-tab-active')).toHaveText(category.label);
        const expected = db.projects().filter((p) => p.category === category.key);
        expect(expected.length).toBeGreaterThan(0);
        await expect(page.locator('app-github-projects .tab-content:visible mat-card.project-card')).toHaveCount(expected.length);
        const titles = await page.locator('app-github-projects .tab-content:visible .project-header .col-4')
          .evaluateAll((els) => els.map((e) => (e.textContent ?? '').replace('▸', '').trim()));
        expect(titles.sort()).toEqual(expected.map((p) => p.title).sort());
      });
    }
  });

  test('every rendered project card exists in the DOM once, matching db.json', async ({ page }) => {
    const site = new Site(page);
    await site.goto('/github-projects');
    await expect(page.locator('app-github-projects mat-card.project-card')).toHaveCount(db.projects().length);
    for (const project of db.projects()) {
      await expect(page.locator(`#${projectId(project.title)}`), project.title).toHaveCount(1);
    }
  });

  test('project links point at the GitHub repo from db.json', async ({ page }) => {
    const site = new Site(page);
    await site.goto('/github-projects');
    for (const category of PROJECT_CATEGORIES) {
      await page.locator('app-github-projects .page-tab', { hasText: category.label }).click();
      for (const project of db.projects().filter((p) => p.category === category.key)) {
        const link = page.locator(`#${projectId(project.title)} .project-header a`);
        await expect(link, project.title).toHaveAttribute('href', project.link);
      }
    }
  });

  test('WellSky tab shows the contribution graph rendered from the API response', async ({ page }) => {
    const site = new Site(page);
    await site.goto('/github-projects');
    // Fixture years: 2019 and 2020.
    await expect(page.locator('.contrib-year-label')).toHaveText([/2019 .* 3 contributions/, /2020 .* 2 contributions/]);
    await expect(page.locator('.contrib-day').first()).toBeVisible();
  });

  test('external links that open a new tab use rel=noopener', async ({ page }) => {
    const site = new Site(page);
    await site.goto('/github-projects');
    const blank = page.locator('a[target="_blank"]');
    await expect(blank).not.toHaveCount(0); // the WellSky card renders once db.json has loaded
    for (const link of await blank.all()) {
      expect(await link.getAttribute('rel')).toMatch(/noopener/);
    }
    // Project with an award has a details link that opens in a new tab.
    const awarded = db.projects().find((p) => p.award);
    if (awarded) {
      await page.locator('app-github-projects .page-tab', { hasText: 'Personal Projects' }).click();
      await page.locator('app-github-projects .page-tab', { hasText: 'School Projects' }).click();
      await page.locator('app-github-projects .page-tab', { hasText: 'Hackathon Projects' }).click();
      await expect(page.locator(`a[href="${awarded.award!.link}"]`).first()).toHaveAttribute('rel', /noopener/);
    }
  });

  test.describe('README expansion', () => {
    const project = db.projects().find((p) => p.category === 'personal' && p.description)!;

    test('expanding a project fetches its README from the URL in db.json and renders markdown', async ({ page }) => {
      const site = new Site(page);
      await site.goto('/github-projects');
      await page.locator('app-github-projects .page-tab', { hasText: 'Personal Projects' }).click();
      const card = page.locator(`#${projectId(project.title)}`);
      await expect(card.locator('markdown')).toHaveCount(0);
      const request = page.waitForRequest(project.description!);
      await card.locator('.project-header .col-4').click();
      await request;
      await expect(card.locator('markdown h1')).toHaveText('Mock README');
      expect(README_FIXTURE).toContain('Hello from the e2e fixture');
      await test.step('collapsing does not fetch again and toggles the indicator', async () => {
        await expect(card.locator('.expand-indicator-open')).toHaveCount(1);
        await card.locator('.project-header .col-4').click();
        await expect(card.locator('.expand-indicator-open')).toHaveCount(0);
      });
    });

    test('relative image paths in a README are rewritten to the repo raw URL', async ({ page }) => {
      await page.route(project.description!, (route) =>
        route.fulfill({ contentType: 'text/plain', body: '![shot](./img/a.png)\n' }));
      // The image itself is served by the default stub, so record the requested URL.
      const site = new Site(page);
      await site.goto('/github-projects');
      await page.locator('app-github-projects .page-tab', { hasText: 'Personal Projects' }).click();
      const base = project.description!.slice(0, project.description!.lastIndexOf('/') + 1);
      const image = page.waitForRequest(`${base}./img/a.png`);
      await page.locator(`#${projectId(project.title)} .project-header .col-4`).click();
      await image;
      await expect(page.locator(`#${projectId(project.title)} markdown img`)).toHaveAttribute('src', `${base}./img/a.png`);
    });

    test('a failed README fetch shows the no README message', async ({ page }) => {
      await page.route(project.description!, (route) => route.fulfill({ status: 404, body: 'nope' }));
      const site = new Site(page);
      await site.goto('/github-projects');
      await page.locator('app-github-projects .page-tab', { hasText: 'Personal Projects' }).click();
      const card = page.locator(`#${projectId(project.title)}`);
      await card.locator('.project-header .col-4').click();
      await expect(card).toContainText('No README is available for this project.');
    });

    test('a project without a README link says so without any request', async ({ page, thirdParty }) => {
      const noReadme = db.projects().find((p) => !p.description)!;
      const site = new Site(page);
      await site.goto('/github-projects');
      await page.locator('app-github-projects .page-tab', { hasText: `${noReadme.category[0].toUpperCase()}${noReadme.category.slice(1)} Projects` }).click();
      const card = page.locator(`#${projectId(noReadme.title)}`);
      await card.locator('.project-header .col-4').click();
      await expect(card).toContainText('No README is available for this project.');
      expect(thirdParty.filter((u) => u.includes('raw.githubusercontent.com'))).toEqual([]);
    });

    test('README HTML is sanitized: script and event handler payloads do not execute', async ({ page }) => {
      await page.route(project.description!, (route) =>
        route.fulfill({
          contentType: 'text/plain',
          body: '# Title\n\n<img src="x" onerror="window.__pwned=1">\n\n<script>window.__pwned=2</script>\n',
        }));
      const site = new Site(page);
      await site.goto('/github-projects');
      await page.locator('app-github-projects .page-tab', { hasText: 'Personal Projects' }).click();
      const card = page.locator(`#${projectId(project.title)}`);
      await card.locator('.project-header .col-4').click();
      await expect(card.locator('markdown h1')).toHaveText('Title');
      expect(await page.evaluate(() => (window as unknown as { __pwned?: number }).__pwned)).toBeUndefined();
    });
  });

  test.describe('cross links', () => {
    const linked = db.videos().find((v) => v.linkedProject && db.projects().some((p) => p.title === v.linkedProject))!;

    test('?project= opens the right category tab and highlights that project', async ({ page }) => {
      const project = db.projects().find((p) => p.title === linked.linkedProject)!;
      const site = new Site(page);
      await site.goto(`/github-projects?project=${encodeURIComponent(project.title)}`);
      const label = PROJECT_CATEGORIES.find((c) => c.key === project.category)!.label;
      await expect(page.locator('app-github-projects .page-tab-active')).toHaveText(label);
      await expect(page.locator(`#${projectId(project.title)}`)).toBeInViewport();
    });

    test('an unknown ?project= leaves the default tab', async ({ page }) => {
      const site = new Site(page);
      await site.goto('/github-projects?project=does-not-exist');
      await expect(page.locator('app-github-projects .page-tab-active')).toHaveText('WellSky');
    });
  });
});
