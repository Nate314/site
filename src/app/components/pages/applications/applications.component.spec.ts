import { BehaviorSubject, of } from "rxjs";
import { UrlSegment } from "@angular/router";
import { ApplicationsComponent } from "./applications.component";
import { dbFixture } from "../../../testing/db-fixture";

describe("ApplicationsComponent", () => {

  let router: any;
  let url$: BehaviorSubject<UrlSegment[]>;
  let unlock: { unlocked: boolean; unlocked$: BehaviorSubject<boolean> };
  let cdr: { detectChanges: jasmine.Spy };
  let component: ApplicationsComponent;

  const segments = (...paths: string[]) => paths.map(p => new UrlSegment(p, {}));

  function create(...initialUrl: string[]) {
    url$ = new BehaviorSubject(segments(...initialUrl));
    const activatedRoute: any = { url: url$ };
    const db: any = { connection: () => of(dbFixture()) };
    component = new ApplicationsComponent(router, {} as any, activatedRoute, db, cdr as any, unlock as any);
    component.ngOnInit();
  }

  beforeEach(() => {
    router = { url: "/applications", navigate: jasmine.createSpy("navigate") };
    unlock = { unlocked: false, unlocked$: new BehaviorSubject(false) };
    cdr = { detectChanges: jasmine.createSpy("detectChanges") };
  });

  describe("overview at /applications", () => {
    beforeEach(() => create("applications"));

    it("builds one subpage per category with links relative to the parent route", () => {
      expect(component.subpages.map(p => p.name)).toEqual(["WebApplications", "JavaApplications", "AndroidApplications"]);
      expect(component.subpages.map(p => p.link)).toEqual(["../applications/web", "../applications/java", "../applications/android"]);
    });

    it("titles the page and leaves no subpage or app selected", () => {
      expect(document.title).toBe("NathanGawith | Applications | Applications");
      expect(component.apps).toEqual([]);
      expect(component.webApp).toBeNull();
      expect(component.webAppOpen).toBe(false);
    });

    it("re-renders explicitly because the app runs zoneless", () => {
      expect(cdr.detectChanges).toHaveBeenCalled();
    });
  });

  describe("category pages", () => {
    it("lists the java apps at /applications/java", () => {
      create("applications", "java");
      expect(component.pageName).toBe("JavaApplications");
      expect(component.apps.map(a => a.name)).toEqual(["Clock", "Secret"]);
      expect(component.webApp).toBeNull();
      expect(document.title).toBe("NathanGawith | Applications | JavaApplications");
    });

    it("lists the android apps at /applications/android", () => {
      create("applications", "android");
      expect(component.pageName).toBe("AndroidApplications");
      expect(component.apps.map(a => a.name)).toEqual(["Wallpaper"]);
    });
  });

  describe("web application pages", () => {
    it("opens the matching app for /applications/web/<name>, ignoring name case", () => {
      create("applications", "web", "say2");
      expect(component.webApp.name).toBe("Say2");
      expect(component.webAppOpen).toBe(true);
      expect(component.appDescription).toBe("say numbers");
      expect(document.title).toBe("NathanGawith | Applications | WebApplications | Say2");
    });

    it("shows no app for an unknown name but still shows the category", () => {
      create("applications", "web", "DoesNotExist");
      expect(component.webApp).toBeNull();
      expect(component.webAppOpen).toBe(false);
      expect(component.pageName).toBe("WebApplications");
    });

    it("resets the open app when the route changes back to the category", () => {
      create("applications", "web", "Say2");
      url$.next(segments("applications", "web"));
      expect(component.webApp).toBeNull();
      expect(component.webAppOpen).toBe(false);
      expect(component.apps.length).toBe(2);
    });

    it("switches apps when the same component instance is reused for another route", () => {
      create("applications", "web", "Say2");
      url$.next(segments("applications", "web", "Embedded"));
      expect(component.webApp.name).toBe("Embedded");
      expect(component.appDescription).toBe("an embed");
    });
  });

  describe("visibleApps", () => {
    beforeEach(() => create("applications", "java"));

    it("hides entries marked hidden until the secret unlock is on", () => {
      expect(component.visibleApps(component.apps).map(a => a.name)).toEqual(["Clock"]);
      unlock.unlocked = true;
      expect(component.visibleApps(component.apps).map(a => a.name)).toEqual(["Clock", "Secret"]);
    });

    it("tolerates a missing list", () => {
      expect(component.visibleApps(undefined as any)).toEqual([]);
    });
  });

  describe("useIFrame", () => {
    beforeEach(() => create("applications"));

    it("embeds apps hosted on nathangawith.com and nate314.github.io", () => {
      expect(component.useIFrame("https://games.nathangawith.com/snake")).toBe(true);
      expect(component.useIFrame("https://nate314.github.io/")).toBe(true);
    });

    it("does not embed in-app components or other hosts", () => {
      expect(component.useIFrame("webapplications/say2")).toBe(false);
      expect(component.useIFrame("https://example.com/")).toBe(false);
    });
  });

  describe("getApp", () => {
    beforeEach(() => create("applications"));

    it("finds an app by case-insensitive name and returns null otherwise", () => {
      const list = component.subpages[0].apps;
      expect(component.getApp(list, "SAY2").name).toBe("Say2");
      expect(component.getApp(list, "nope")).toBeNull();
    });
  });

  describe("opening apps", () => {
    beforeEach(() => create("applications"));

    it("navigates to the web app route when opened from a link", () => {
      component.openWebApp(component.subpages[0].apps[0], true);
      expect(router.navigate).toHaveBeenCalledWith(["/applications/web/Say2"]);
    });

    it("marks the app open without navigating when opened from the url", () => {
      component.openWebApp(component.subpages[0].apps[0], false);
      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.webAppOpen).toBe(true);
      expect(component.appDescription).toBe("say numbers");
    });

    it("ignores a missing app when opened from the url", () => {
      component.openWebApp(null as any, false);
      expect(component.webAppOpen).toBe(false);
    });
  });

  it("re-renders when the secret unlock changes", () => {
    create("applications");
    cdr.detectChanges.calls.reset();
    unlock.unlocked$.next(true);
    expect(cdr.detectChanges).toHaveBeenCalled();
  });
});
