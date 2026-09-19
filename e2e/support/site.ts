import { expect, type Locator, type Page } from '@playwright/test';

export const NAV_ITEMS = [
  { name: 'Home', path: '/home', title: 'NathanGawith | Home' },
  { name: 'Github Projects', path: '/github-projects', title: 'NathanGawith | Github Projects' },
  { name: 'Applications', path: '/applications', title: 'NathanGawith | Applications | Applications' },
  { name: 'Videos', path: '/videos', title: 'NathanGawith | Videos' },
] as const;

/** Every in-app page that renders inside the main shell (navbar plus content). */
export const SHELL_ROUTES = [
  '/home',
  '/github-projects',
  '/applications',
  '/applications/web',
  '/applications/java',
  '/applications/android',
  '/videos',
] as const;

export const VIEWPORTS = {
  desktop: { width: 1280, height: 800 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 400, height: 800 },
} as const;

/** Small page object for the shared app shell. */
export class Site {
  readonly navbar: Locator;
  /** Left/bottom nav entries in DOM order: logo, Home, Github Projects, Applications, Videos, Games, Resume. */
  readonly navLinks: Locator;
  readonly matCards: Locator;
  readonly themeToggle: Locator;

  constructor(readonly page: Page) {
    this.navbar = page.locator('nav.navbar');
    this.navLinks = page.locator('nav.navbar a.nav-link');
    this.matCards = page.locator('mat-card');
    this.themeToggle = page.getByRole('button', { name: /Switch to (dark|light) mode/ });
  }

  navLink(name: string): Locator {
    return this.page.locator('nav.navbar li.nav-item a.nav-link').filter({ hasText: name });
  }

  /** Navigates and waits until the SPA has rendered its shell. */
  async goto(path: string) {
    const response = await this.page.goto(path);
    await expect(this.navbar).toBeVisible();
    return response;
  }

  async expectTitle(title: string) {
    await expect(this.page).toHaveTitle(title);
  }

  async expectNoHorizontalOverflow() {
    const { scrollWidth, clientWidth } = await this.page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth, 'document scrollWidth vs clientWidth').toBeLessThanOrEqual(clientWidth);
  }
}
