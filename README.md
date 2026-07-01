# Nathan Gawith - Portfolio Site

Source for [nathangawith.com](https://nathangawith.com), my personal portfolio site. Built with Angular 22, and deployed to GitHub Pages via the [`publish`](https://github.com/Nate314/site/tree/publish) branch.

## What's here

- **Home** - background, experience, and a dynamically-linked list of languages/tools/interests, all pulled from `src/assets/db.json`.
- **Applications** - Java, web, and Android applications I've written, grouped by category with downloadable files served from `src/assets/`.
- **Github Projects** - a tabbed view of my projects (personal, school, and hackathon), each showing its live README, plus a day-by-day GitHub contribution graph for my WellSky work account.
- **Videos** - a handful of YouTube videos I've made over the years.

Site content (bios, links, project lists, video descriptions, etc.) lives in `src/assets/db.json` and is loaded at runtime via `HttpClient`, rather than being hardcoded into the components.

## Development server

Run `ng serve` (or `npm start`) for a dev server, then open `http://localhost:4200/`. The app reloads automatically when source files change.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` (or `npm run build`) to build the project. Output is written to `docs/`. `npm run build` also copies `index.html` to `404.html` so client-side routes resolve correctly on GitHub Pages. The contents of `docs/` are then deployed by pushing them to the `publish` branch, which is what GitHub Pages actually serves.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io) and Jasmine.

## Linting

Run `ng lint` to lint the project with ESLint.

## Further help

To get more help on the Angular CLI use `ng help` or check out the [Angular CLI documentation](https://angular.dev/tools/cli).
