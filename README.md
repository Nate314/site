# Nathan Gawith - Portfolio Site

Source for [nathangawith.com](https://nathangawith.com), my personal portfolio site. Built with Angular 22, and deployed to GitHub Pages via the [`publish`](https://github.com/Nate314/site/tree/publish) branch.

## What's here

- **Home** - background, experience, and a dynamically-linked list of languages/tools/interests, all pulled from `src/assets/db.json`.
- **Applications** - Java, web, and Android applications I've written, grouped by category with downloadable files served from `src/assets/`.
- **Github Projects** - a tabbed view of my projects (personal, school, and hackathon), each showing its live README, plus a day-by-day GitHub contribution graph for my WellSky work account.
- **Videos** - a handful of YouTube videos I've made over the years.

Site content (bios, links, project lists, video descriptions, etc.) lives in `src/assets/db.json` and is loaded at runtime via `HttpClient`, rather than being hardcoded into the components.

## Running with Docker

No local Node/Angular CLI install required. From the repo root:

```
docker compose up --build
```

Then open `http://localhost:8080/` (or the URL printed by `./run.sh`, see below). This builds the production Angular bundle in a `node:22-alpine` stage and serves it via unprivileged nginx (non-root, listening on 8080 inside the container, mapped to host port 8080 by default, or `SITE_PORT` from `.env`) with SPA route fallback, `server_tokens off`, and security headers including a Content-Security-Policy. If you add a new external origin to the site, add it to the CSP in `nginx.conf`. Stop it with `docker compose down`.

## Running side by side / port selection

Several projects default to host port 8080, so two of them cannot run at once with a plain `docker compose up`. Each of these repos ships a small launcher that picks free ports for you:

```
./run.sh          # macOS, Linux, Git Bash
.\run.ps1         # Windows PowerShell
```

What it does:

1. If no `.env` exists it creates one (with a header comment saying it was generated). An existing `.env` is never overwritten: only the port variables (`SITE_PORT`) are added or adjusted, and every other line and comment is kept.
2. For each port it starts at the default (or the value already in `.env`) and picks the first port that is free on this machine, scanning upward. A port counts as busy if anything, Docker or a native process, accepts a TCP connection on 127.0.0.1 (the PowerShell launcher also tries to bind it). Ports already picked in the same run are skipped.
3. If this project's stack is already running it leaves the ports alone and does not rebuild (rebuild with `./run.sh up --build -d`). If it is stopped, the ports in `.env` are re-checked and only busy ones are reassigned, so starting a second and third project back to back just works.
4. Runs `docker compose up --build -d` and prints the URLs using the ports it chose, for example `Site: http://localhost:8081`.

Any arguments are passed straight to `docker compose` after the `.env` step, for example `./run.sh down`, `./run.sh logs -f` or `.\run.ps1 ps`.

Plain `docker compose up --build` still works exactly as before with the 8080 defaults (fine for a single project). `docker compose` has no pre-run hook, so only the launcher generates `.env`.

To pin ports by hand, edit `.env` (see `.env.example`). To start over, run `./run.sh down` and delete `.env`; the next launcher run picks ports again. The launcher needs `docker compose` v2 and, on macOS and Linux, bash; it uses only POSIX tools (`sed`, `awk`, `grep`).

## Development server

Run `ng serve` (or `npm start`) for a dev server, then open `http://localhost:4200/`. The app reloads automatically when source files change.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` (or `npm run build`) to build the project. Output is written to `docs/`. `npm run build` also copies `index.html` to `404.html` so client-side routes resolve correctly on GitHub Pages. The contents of `docs/` are then deployed by pushing them to the `publish` branch, which is what GitHub Pages actually serves.

## Unit tests and coverage

Unit tests run with [Karma](https://karma-runner.github.io) and Jasmine in headless Chrome (`ChromeHeadless`, configured in `angular.json`). Chrome must be installed.

PowerShell and Git Bash (the commands are identical):

```
npm test                  # ng test: watch mode while developing
npx ng test --no-watch    # single run, exits with a status code (use this in scripts and CI)
npm run test:coverage     # single run plus an Istanbul coverage report
```

`npm run test:coverage` prints a statements, branches, functions and lines summary and writes the HTML report to `coverage/nathangawith/index.html` (open it in a browser for per-file numbers). `coverage/` is git-ignored. Angular's Karma builder only reports files that a spec pulls in, so a component or service with no spec does not appear in the report at all; the numbers describe the code that is tested, not the whole app.

Specs sit next to the code as `*.spec.ts`. HTTP is tested with `HttpTestingController`, never the real network, and `src/app/testing/db-fixture.ts` provides a small db.json-shaped fixture for component specs.

## End-to-end tests (Playwright)

The `e2e/` folder is a separate npm project (its own `package.json`, lockfile and `tsconfig.json`), so Playwright is not a dependency of the site and does not affect `npm ci`, the Docker build or `npm audit` at the repo root. The tests run against an already running site in a real Chromium; they do not start Docker themselves.

1. Start the site and note the URL it prints. On Windows PowerShell use `.\run.ps1`; in Git Bash, macOS or Linux use `./run.sh`. The launcher picks the first free port starting at 8080 and prints it, for example `Site: http://localhost:8081`.
2. Install the test dependencies once:

   ```
   cd e2e
   npm ci
   npx playwright install chromium
   ```

3. Run the suite, pointing `BASE_URL` at the printed URL (it defaults to `http://localhost:8080`).

   PowerShell:

   ```
   $env:BASE_URL = "http://localhost:8081"; npm test
   ```

   Git Bash:

   ```
   BASE_URL=http://localhost:8081 npm test
   ```

Scripts (run from `e2e/`): `npm test` (headless, all tests), `npm run test:headed`, `npm run test:smoke` (only tests tagged `@smoke`), `npm run typecheck`, and `npm run report` (opens the last HTML report). Extra Playwright flags go after `--`, for example `npm test -- --workers=1`.

Third-party hosts (CDN styles and scripts, GitHub raw content and contributions API, YouTube and the sibling sites) are stubbed with `page.route`, so most tests are deterministic and work offline while the browser still enforces the real Content-Security-Policy. A small group tagged `@network` uses the real internet to prove the CSP allow-list matches reality; skip it with `SKIP_NETWORK=1` (PowerShell: `$env:SKIP_NETWORK = "1"`).

The suite covers every route and deep link, navigation and responsive layout (desktop, tablet and a 400px phone), the card padding regression (`styles.css` applied and `mat-card` padding of 16px), console and CSP hygiene, security headers, content driven by `db.json`, the applications iframe component and the YouTube embeds.

To point the tests at a different build, for example a hardened nginx variant, run it on another port and set `BASE_URL` to it.

### Running the e2e tests in Docker

Nothing but Docker is needed: the official Playwright image already contains Node and the browsers, so there is no `npm ci` or `npx playwright install` on the host. The image tag has to match the `@playwright/test` version in `e2e/package.json` (currently 1.63.0). Start the site first (step 1 above) and use the URL it printed as `BASE_URL`.

The whole repository is mounted because the tests read `src/assets/db.json`. The named volume keeps the container's Linux `node_modules` apart from any `node_modules` on the host.

PowerShell:

```powershell
docker run --rm --ipc=host --network host -v "${PWD}:/repo" -v site-e2e-node-modules:/repo/e2e/node_modules -w /repo/e2e -e BASE_URL=http://localhost:8080 mcr.microsoft.com/playwright:v1.63.0-noble sh -c "npm ci && npx playwright test"
```

Git Bash (`MSYS_NO_PATHCONV=1` stops Git Bash from rewriting the `/repo` paths into Windows paths):

```bash
MSYS_NO_PATHCONV=1 docker run --rm --ipc=host --network host -v "$PWD:/repo" -v site-e2e-node-modules:/repo/e2e/node_modules -w /repo/e2e -e BASE_URL=http://localhost:8080 mcr.microsoft.com/playwright:v1.63.0-noble sh -c "npm ci && npx playwright test"
```

macOS and Linux: the Git Bash command without `MSYS_NO_PATHCONV=1`.

- Add Playwright arguments after `npx playwright test`, for example `--grep @smoke`, `--workers=1` or `tests/videos.spec.ts`.
- `--network host` lets the container reach the site at `localhost`. Linux supports it out of the box. Docker Desktop needs "Enable host networking" (Settings, Resources, Network, Docker Desktop 4.34 or newer).
- Without host networking, drop `--network host` and use `-e BASE_URL=http://host.docker.internal:8080` instead (on Linux also add `--add-host=host.docker.internal:host-gateway`). The site does not check origins, so this works too.
- Results are written to `e2e/test-results` and `e2e/playwright-report/index.html` in the repository (open the HTML file in a browser). On Linux those files are owned by root.
- Verified on Windows with Docker Desktop 4.41: all 150 tests pass in the container, with and without host networking. macOS and Linux were not tested.

## Linting

Run `ng lint` to lint the project with ESLint.

## Further help

To get more help on the Angular CLI use `ng help` or check out the [Angular CLI documentation](https://angular.dev/tools/cli).
