import { TestBed } from "@angular/core/testing";
import { HttpClient, provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { convertToParamMap } from "@angular/router";
import { BehaviorSubject, of } from "rxjs";
import { GithubProjectsComponent } from "./github-projects.component";
import { dbFixture, RAW_README } from "../../../testing/db-fixture";

const CONTRIBUTIONS_URL = "https://github-contributions-api.jogruber.de/v4/NathanGawithMediware?y=all";

describe("GithubProjectsComponent", () => {

  let http: HttpTestingController;
  let unlock: { unlocked: boolean; unlocked$: BehaviorSubject<boolean> };
  let cdr: { detectChanges: jasmine.Spy };
  let component: GithubProjectsComponent;

  function create(query: Record<string, string> = {}) {
    const route: any = { snapshot: { queryParamMap: convertToParamMap(query) } };
    const db: any = { connection: () => of(dbFixture()) };
    component = new GithubProjectsComponent(
      { url: "/github-projects" } as any, route, db, TestBed.inject(HttpClient), cdr as any, unlock as any);
    component.ngOnInit();
  }

  const project = (title: string) => component.projects.find(p => p.title === title);

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    http = TestBed.inject(HttpTestingController);
    unlock = { unlocked: false, unlocked$: new BehaviorSubject(false) };
    cdr = { detectChanges: jasmine.createSpy("detectChanges") };
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    // Every test either answers the contributions request or discards it explicitly.
    http.match(CONTRIBUTIONS_URL);
    http.verify();
  });

  describe("loading", () => {
    it("shows the skeleton until the projects are loaded, then titles the page", () => {
      create();
      expect(component.loading).toBe(false);
      expect(document.title).toBe("NathanGawith | Github Projects");
      expect(component.projects.length).toBe(7);
    });
  });

  describe("projectGroups", () => {
    beforeEach(() => create());

    it("orders categories personal then school and omits empty ones", () => {
      expect(component.projectGroups.map(g => g.category)).toEqual(["personal", "school"]);
      expect(component.projectGroups.map(g => g.label)).toEqual(["Personal Projects", "School Projects"]);
    });

    it("ranks the site project first, then featured or awarded, then the rest in original order", () => {
      const personal = component.projectGroups[0].projects.map(p => p.title);
      // "Award" precedes "Feat" because it was earlier in the source list; "Plain A" and "Plain B" keep theirs.
      expect(personal).toEqual(["Site", "Award", "Feat", "Plain A", "Plain B"]);
    });

    it("hides hidden projects until unlocked", () => {
      expect(component.projectGroups[0].projects.map(p => p.title)).not.toContain("Secret P");
      unlock.unlocked = true;
      expect(component.projectGroups[0].projects.map(p => p.title)).toContain("Secret P");
    });

    it("is empty before the projects load", () => {
      const fresh = new GithubProjectsComponent({} as any, {} as any, {} as any, TestBed.inject(HttpClient), cdr as any, unlock as any);
      expect(fresh.projectGroups).toEqual([]);
    });

    it("puts WellSky first in the tab strip followed by each non-empty category", () => {
      expect(component.pageTabs).toEqual([
        { key: "wellsky", label: "WellSky" },
        { key: "personal", label: "Personal Projects" },
        { key: "school", label: "School Projects" }
      ]);
    });
  });

  describe("small helpers", () => {
    beforeEach(() => create());

    it("treats an award like a featured flag", () => {
      expect(component.isFeatured({ featured: true })).toBe(true);
      expect(component.isFeatured({ award: {} })).toBe(true);
      expect(component.isFeatured({})).toBe(false);
    });

    it("normalises linkedVideo to a list", () => {
      expect(component.linkedVideos({})).toEqual([]);
      expect(component.linkedVideos({ linkedVideo: "a" })).toEqual(["a"]);
      expect(component.linkedVideos({ linkedVideo: ["a", "b"] })).toEqual(["a", "b"]);
    });

    it("derives a DOM-safe element id from a title", () => {
      expect(component.projectElementId("CS461 Fifteen (puzzle)")).toBe("gh-project-CS461-Fifteen-puzzle-");
    });

    it("falls back to the empty level colour for an out-of-range level", () => {
      expect(component.contributionColor(0)).toBe("#ebedf0");
      expect(component.contributionColor(4)).toBe("#216e39");
      expect(component.contributionColor(99)).toBe("#ebedf0");
    });

    it("selectTab switches the active tab and re-renders", () => {
      cdr.detectChanges.calls.reset();
      component.selectTab("school");
      expect(component.activeTab).toBe("school");
      expect(cdr.detectChanges).toHaveBeenCalled();
    });
  });

  describe("README loading", () => {
    beforeEach(() => create());

    it("fetches the README once, the first time a project is expanded", () => {
      const plain = project("Plain A");
      component.toggleProject(plain);
      expect(plain.expanded).toBe(true);
      http.expectOne(RAW_README).flush("# Hello");
      expect(plain.readmeContent).toBe("# Hello");

      component.toggleProject(plain); // collapse
      component.toggleProject(plain); // expand again
      http.expectNone(RAW_README);
      expect(plain.expanded).toBe(true);
    });

    it("does not request anything for a project without a README", () => {
      const noReadme = project("Plain B");
      component.toggleProject(noReadme);
      http.expectNone(req => req.url.includes("raw.githubusercontent.com"));
      expect(noReadme.expanded).toBe(true);
    });

    it("does not fetch when collapsing", () => {
      const plain = project("Plain A");
      plain.expanded = true;
      component.toggleProject(plain);
      http.expectNone(RAW_README);
      expect(plain.expanded).toBe(false);
    });

    it("marks the project as errored, and does not retry, when the fetch fails", () => {
      const plain = project("Plain A");
      component.toggleProject(plain);
      http.expectOne(RAW_README).flush("gone", { status: 404, statusText: "Not Found" });
      expect(plain.readmeError).toBe(true);
      expect(plain.readmeContent).toBeUndefined();
      component.toggleProject(plain);
      component.toggleProject(plain);
      http.expectNone(RAW_README);
    });

    describe("relative image paths", () => {
      const base = "https://raw.githubusercontent.com/Nate314/Plain-A/master/";

      function readmeAfter(markdown: string): string {
        const plain = project("Plain A");
        component.toggleProject(plain);
        http.expectOne(RAW_README).flush(markdown);
        return plain.readmeContent;
      }

      it("resolves markdown images against the README's own directory", () => {
        expect(readmeAfter("![shot](./client/img/a.png) and ![b](img/b.png)"))
          .toBe(`![shot](${base}./client/img/a.png) and ![b](${base}img/b.png)`);
      });

      it("resolves img tags with either quote style", () => {
        expect(readmeAfter("<img src=\"a.png\" width=\"5\"> <img alt='x' src='b.png'>"))
          .toBe(`<img src="${base}a.png" width="5"> <img alt='x' src='${base}b.png'>`);
      });

      it("leaves absolute and protocol-relative URLs alone", () => {
        const text = "![a](https://example.com/a.png) ![b](//cdn.example.com/b.png) <img src=\"http://example.com/c.png\">";
        expect(readmeAfter(text)).toBe(text);
      });

      it("leaves links and plain text untouched", () => {
        const text = "[docs](guide.md) and text with (parentheses)";
        expect(readmeAfter(text)).toBe(text);
      });
    });
  });

  describe("WellSky contributions", () => {
    beforeEach(() => create());

    // The API returns every calendar day. 2019-01-01 is a Tuesday, so the first week starts with two
    // padding cells; eight days fill one week and spill one day into a second week.
    const days2019 = Array.from({ length: 8 }, (_, i) => ({ date: `2019-01-0${i + 1}`, count: 1, level: 1 }));
    const response = {
      total: { "2018": 9, "2019": 4, "2020": 2, "2026": 1, "2027": 7 },
      contributions: [
        { date: "2018-12-31", count: 9, level: 4 },
        ...days2019,
        { date: "2020-01-01", count: 2, level: 3 },
        { date: "2026-01-01", count: 1, level: 1 },
        { date: "2027-01-01", count: 7, level: 4 }
      ]
    };

    it("keeps only 2019 through 2026, in ascending order, with API totals", () => {
      http.expectOne(CONTRIBUTIONS_URL).flush(response);
      expect(component.contributionYears.map(y => y.year)).toEqual(["2019", "2020", "2026"]);
      expect(component.contributionYears.map(y => y.total)).toEqual([4, 2, 1]);
    });

    it("lays days out in Sunday-to-Saturday weeks, padding the first and last week", () => {
      http.expectOne(CONTRIBUTIONS_URL).flush(response);
      const weeks = component.contributionYears[0].weeks;
      expect(weeks.length).toBe(2);
      expect(weeks.every(w => w.length === 7)).toBe(true);
      expect(weeks[0].map(d => d && d.date)).toEqual([null, null, "2019-01-01", "2019-01-02", "2019-01-03", "2019-01-04", "2019-01-05"]);
      expect(weeks[1].map(d => d && d.date)).toEqual(["2019-01-06", "2019-01-07", "2019-01-08", null, null, null, null]);
    });

    it("does not leak days from neighbouring years into a year", () => {
      http.expectOne(CONTRIBUTIONS_URL).flush(response);
      const flat = component.contributionYears[0].weeks.flat().filter(d => d).map(d => d!.date);
      expect(flat.every(date => date.startsWith("2019"))).toBe(true);
    });

    it("pairs years two per row for the side by side layout", () => {
      http.expectOne(CONTRIBUTIONS_URL).flush(response);
      expect(component.contributionYearRows.map(r => r.map(y => y.year))).toEqual([["2019", "2020"], ["2026"]]);
    });

    it("renders nothing for years without data instead of throwing", () => {
      http.expectOne(CONTRIBUTIONS_URL).flush({ total: { "2021": 0 }, contributions: [] });
      expect(component.contributionYears[0].weeks).toEqual([]);
    });

    it("keeps the rest of the page working when the contributions API fails", () => {
      http.expectOne(CONTRIBUTIONS_URL).flush("down", { status: 503, statusText: "Unavailable" });
      expect(component.contributionYears).toEqual([]);
      expect(component.projectGroups.length).toBe(2);
    });
  });

  describe("?project= deep link", () => {
    it("selects the project's category tab, highlights it, then clears the highlight", () => {
      create({ project: "Sch" });
      expect(component.activeTab).toBe("school");
      jasmine.clock().tick(1);
      expect(component.highlightedProjectTitle).toBe("Sch");
      jasmine.clock().tick(2000);
      expect(component.highlightedProjectTitle).toBeNull();
    });

    it("ignores an unknown project title", () => {
      create({ project: "nope" });
      expect(component.activeTab).toBe("wellsky");
      jasmine.clock().tick(5000);
      expect(component.highlightedProjectTitle).toBeNull();
    });
  });
});
