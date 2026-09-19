import type { Page, Locator } from '@playwright/test';
import { test, expect } from '../support/fixtures';
import { Site, SHELL_ROUTES, VIEWPORTS } from '../support/site';

type Box = { x: number; y: number; width: number; height: number };

const overlaps = (a: Box, b: Box) =>
  a.x < b.x + b.width - 0.5 && b.x < a.x + a.width - 0.5 && a.y < b.y + b.height - 0.5 && b.y < a.y + a.height - 0.5;

async function boxes(locator: Locator): Promise<Box[]> {
  const out: Box[] = [];
  for (const el of await locator.all()) out.push((await el.boundingBox())!);
  return out;
}

async function expectInsideViewport(page: Page, box: Box, what: string) {
  const vp = page.viewportSize()!;
  expect(box.x, `${what} left edge`).toBeGreaterThanOrEqual(-0.5);
  expect(box.y, `${what} top edge`).toBeGreaterThanOrEqual(-0.5);
  expect(box.x + box.width, `${what} right edge`).toBeLessThanOrEqual(vp.width + 0.5);
  expect(box.y + box.height, `${what} bottom edge`).toBeLessThanOrEqual(vp.height + 0.5);
}

for (const [name, viewport] of Object.entries(VIEWPORTS)) {
  test.describe(`layout at ${name} (${viewport.width}x${viewport.height})`, () => {
    test.use({ viewport });

    for (const route of SHELL_ROUTES) {
      test(`no horizontal overflow on ${route}`, async ({ page }) => {
        const site = new Site(page);
        await site.goto(route);
        await expect(site.matCards.first()).toBeVisible();
        await site.expectNoHorizontalOverflow();
      });
    }

    test('navbar controls are inside the viewport and do not overlap each other', async ({ page }) => {
      const site = new Site(page);
      await site.goto('/home');
      // The logo entry is hidden in the narrow bottom bar, so only visible entries take part.
      const items = await boxes(site.navLinks.locator('visible=true'));
      expect(items).toHaveLength(viewport.width < 600 ? 6 : 7);
      for (const [i, box] of items.entries()) {
        await expectInsideViewport(page, box, `nav item ${i}`);
        expect(box.width, `nav item ${i} width`).toBeGreaterThan(0);
        expect(box.height, `nav item ${i} height`).toBeGreaterThan(0);
      }
      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          expect(overlaps(items[i], items[j]), `nav items ${i} and ${j} overlap`).toBe(false);
        }
      }
    });

    test('navbar sits on the correct edge for this width', async ({ page }) => {
      const site = new Site(page);
      await site.goto('/home');
      const nav = (await site.navbar.boundingBox())!;
      if (viewport.width < 600) {
        await test.step('mobile: bottom bar spanning the width', async () => {
          expect(nav.x).toBeCloseTo(0, 0);
          expect(nav.width).toBeCloseTo(viewport.width, 0);
          expect(nav.y + nav.height).toBeCloseTo(viewport.height, 0);
        });
      } else {
        await test.step('desktop/tablet: left rail spanning the height', async () => {
          expect(nav.x).toBeCloseTo(0, 0);
          expect(nav.y).toBeCloseTo(0, 0);
          expect(nav.height).toBeCloseTo(viewport.height, 0);
          expect(nav.width).toBeLessThan(viewport.width / 4);
        });
      }
    });

    test('the theme toggle does not overlap the navbar', async ({ page }) => {
      const site = new Site(page);
      await site.goto('/home');
      const fab = (await site.themeToggle.boundingBox())!;
      await expectInsideViewport(page, fab, 'theme toggle');
      expect(overlaps(fab, (await site.navbar.boundingBox())!), 'theme toggle vs navbar').toBe(false);
    });

    for (const route of ['/home', '/videos', '/github-projects']) {
      test(`content on ${route} is not hidden behind the navbar`, async ({ page }) => {
        const site = new Site(page);
        await site.goto(route);
        await expect(site.matCards.first()).toBeVisible();
        // The route animation positions content absolutely until it ends, which changes the page height.
        await expect(page.locator('.ng-animating')).toHaveCount(0);
        const nav = (await site.navbar.boundingBox())!;
        const visibleCards = site.matCards.locator('visible=true');
        if (viewport.width < 600) {
          // Scroll to the very end (retrying, as scrolling may be smooth) so the last card is what sits closest to a bottom bar.
          await expect.poll(async () => {
            await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
            const last = (await visibleCards.last().boundingBox())!;
            return last.y + last.height <= nav.y + 0.5;
          }, { message: 'last card must end above the bottom bar' }).toBe(true);
        } else {
          const first = (await visibleCards.first().boundingBox())!;
          expect(first.x, 'first card must start right of the rail').toBeGreaterThanOrEqual(nav.x + nav.width - 0.5);
        }
      });
    }
  });
}
