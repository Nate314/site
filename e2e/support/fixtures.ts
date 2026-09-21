import { test as base, expect, type Page } from '@playwright/test';

const PNG_1X1 = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
  'base64',
);

export const STUB_FRAME_MARKER = 'e2e stub frame';
const STUB_FRAME_HTML = `<!doctype html><title>stub</title><p id="stub">${STUB_FRAME_MARKER}</p>`;

/** Small but valid response for the GitHub contributions API. */
export const CONTRIBUTIONS_FIXTURE = {
  total: { '2019': 3, '2020': 2 },
  contributions: [
    { date: '2019-01-01', count: 1, level: 1 },
    { date: '2019-01-02', count: 2, level: 2 },
    { date: '2020-01-01', count: 2, level: 3 },
  ],
};

/**
 * Stand-in for the CDN stylesheets (bootstrap, w3.css). It carries only the reset the layout relies on:
 * both real files zero the body margin and use border-box, and bootstrap wraps long <code> text. Real CSS is exercised by the @network tests.
 */
const CSS_RESET_STUB = '*,*::before,*::after{box-sizing:border-box}body{margin:0}code{word-break:break-word}';

export const README_FIXTURE = '# Mock README\n\nHello from the e2e fixture.\n';

declare global {
  interface Window { __cspViolations?: string[] }
}

const isSameOrigin = (url: string, base: string) => new URL(url).origin === new URL(base).origin;

/** Collects everything that signals a broken page: console errors, CSP violations, failed requests. */
export class Diagnostics {
  private consoleErrors: string[] = [];
  private pageErrors: string[] = [];
  private failed: string[] = [];
  private mixed: string[] = [];
  constructor(private page: Page, baseURL: string, ignoreConsole: RegExp[] = []) {
    page.on('console', (m) => {
      if (m.type() === 'error' && !ignoreConsole.some((re) => re.test(m.text()))) this.consoleErrors.push(m.text());
    });
    page.on('pageerror', (e) => this.pageErrors.push(e.message));
    page.on('requestfailed', (r) => {
      if (isSameOrigin(r.url(), baseURL)) this.failed.push(`${r.url()} ${r.failure()?.errorText}`);
    });
    page.on('response', (r) => {
      if (isSameOrigin(r.url(), baseURL) && r.status() >= 400) this.failed.push(`${r.status()} ${r.url()}`);
    });
    page.on('request', (r) => {
      if (baseURL.startsWith('https:') && r.url().startsWith('http:')) this.mixed.push(r.url());
    });
  }

  /** Every problem seen so far, including `securitypolicyviolation` events recorded in the page. */
  async problems(): Promise<string[]> {
    const csp = await this.page.evaluate(() => window.__cspViolations ?? []).catch(() => []);
    return [
      ...this.consoleErrors.map((m) => `console error: ${m}`),
      ...this.pageErrors.map((m) => `page error: ${m}`),
      ...csp.map((m) => `CSP violation: ${m}`),
      ...this.failed.map((m) => `failed request: ${m}`),
      ...this.mixed.map((m) => `mixed content: ${m}`),
    ];
  }

  async expectClean() {
    expect(await this.problems()).toEqual([]);
  }

  /** CSP violation events recorded in the page so far. */
  async cspViolations(): Promise<string[]> {
    return this.page.evaluate(() => window.__cspViolations ?? []);
  }
}

const recordCsp = () => {
  window.__cspViolations = [];
  document.addEventListener('securitypolicyviolation', (e) => {
    window.__cspViolations!.push(`${e.violatedDirective} blocked ${e.blockedURI}`);
  });
};

/**
 * The navbar expands to 22rem while hovered (desktop widths). Playwright starts the mouse at (0,0), which is on the
 * navbar: Linux Chromium (CI, the Playwright Docker image) applies that hover after every page load and the expanded
 * navbar then covers the content, so clicks on anything under it never get past the hit-test. Windows Chromium does
 * not apply the initial hover. Moving the pointer off the navbar after each load makes every platform behave the
 * same. `Site.goto` also waits for the navbar to collapse, for tests that measure it right after navigating.
 */
export const PARK_MOUSE = { x: 700, y: 500 } as const;
const parkMouseOnLoad = (page: Page) => {
  page.on('load', () => {
    page.mouse.move(PARK_MOUSE.x, PARK_MOUSE.y).catch(() => {});
  });
};

async function stubThirdParty(page: Page, baseURL: string, log: string[]) {
  await page.route('**/*', async (route) => {
    const request = route.request();
    const url = request.url();
    if (!/^https?:/.test(url) || isSameOrigin(url, baseURL)) return route.continue();
    log.push(url);
    const { hostname } = new URL(url);
    if (hostname === 'github-contributions-api.jogruber.de') {
      return route.fulfill({ json: CONTRIBUTIONS_FIXTURE });
    }
    if (hostname === 'raw.githubusercontent.com') {
      return route.fulfill({ status: 200, contentType: 'text/plain', body: README_FIXTURE });
    }
    switch (request.resourceType()) {
      case 'document':
        return route.fulfill({ status: 200, contentType: 'text/html', body: STUB_FRAME_HTML });
      case 'stylesheet':
        return route.fulfill({ status: 200, contentType: 'text/css', body: CSS_RESET_STUB });
      case 'script':
        return route.fulfill({ status: 200, contentType: 'application/javascript', body: '' });
      case 'image':
        return route.fulfill({ status: 200, contentType: 'image/png', body: PNG_1X1 });
      default:
        return route.fulfill({ status: 204, body: '' });
    }
  });
}

interface Fixtures {
  /** Third-party URLs the page asked for (stubbed in the default page, never sent). */
  thirdParty: string[];
  /** Page with every third-party host stubbed: deterministic and safe offline. */
  page: Page;
  diagnostics: Diagnostics;
  /** Page that reaches the real internet. Only for tests tagged @network. */
  livePage: Page;
  liveDiagnostics: Diagnostics;
}

export const test = base.extend<Fixtures>({
  thirdParty: async ({}, use) => {
    await use([]);
  },
  page: async ({ page, baseURL, thirdParty }, use) => {
    await stubThirdParty(page, baseURL!, thirdParty);
    await page.addInitScript(recordCsp);
    parkMouseOnLoad(page);
    await use(page);
  },
  diagnostics: async ({ page, baseURL }, use) => {
    // Stubbed CDN bodies cannot match the Subresource Integrity hashes in index.html. The real
    // hashes are exercised by the @network tests, which use a page without stubs.
    await use(new Diagnostics(page, baseURL!, [/Failed to find a valid digest in the 'integrity' attribute/]));
  },
  livePage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.addInitScript(recordCsp);
    parkMouseOnLoad(page);
    await use(page);
    await context.close();
  },
  liveDiagnostics: async ({ livePage, baseURL }, use) => {
    await use(new Diagnostics(livePage, baseURL!));
  },
});

export { expect };
