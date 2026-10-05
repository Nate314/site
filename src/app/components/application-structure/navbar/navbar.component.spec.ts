import { BehaviorSubject, Subject } from "rxjs";
import { NavigationEnd } from "@angular/router";
import { NavbarComponent } from "./navbar.component";

describe("NavbarComponent", () => {

  let router: { navigate: jasmine.Spy; url: string; events: Subject<unknown> };
  let cdr: { detectChanges: jasmine.Spy };
  let unlock: { unlocked: boolean; unlocked$: BehaviorSubject<boolean> };
  let component: NavbarComponent;

  beforeEach(() => {
    router = { navigate: jasmine.createSpy("navigate"), url: "/", events: new Subject() };
    cdr = { detectChanges: jasmine.createSpy("detectChanges") };
    unlock = { unlocked: false, unlocked$: new BehaviorSubject(false) };
    component = new NavbarComponent(router as any, {} as any, cdr as any, unlock as any);
    component.ngOnInit();
  });

  it("lists the four in-app pages then the two external sites, in order", () => {
    expect(component.pages.map(p => p.name)).toEqual(["Home", "Github Projects", "Applications", "Videos", "Games", "Resume"]);
    expect(component.pages.map(p => p.link)).toEqual([
      "/home", "/github-projects", "/applications", "/videos",
      "https://games.nathangawith.com/", "https://resume.nathangawith.com/"
    ]);
  });

  it("gives every entry an icon", () => {
    expect(component.pages.every(p => /^https:\/\/cdn\.nathangawith\.com\/images\/svg\/.+\.svg$/.test(p.svg))).toBe(true);
  });

  it("navigates in-app links through the router", () => {
    component.goTo("/videos");
    expect(router.navigate).toHaveBeenCalledWith(["/videos"]);
  });

  it("re-renders when the secret unlock changes", () => {
    cdr.detectChanges.calls.reset();
    unlock.unlocked$.next(true);
    expect(cdr.detectChanges).toHaveBeenCalled();
  });

  it("re-renders when a navigation ends, so the selected entry follows the url", () => {
    cdr.detectChanges.calls.reset();
    router.events.next(new NavigationEnd(1, "/videos", "/videos"));
    expect(cdr.detectChanges).toHaveBeenCalled();
  });

  describe("isSelected", () => {
    it("is true for the page whose link is contained in the current url", () => {
      router.url = "/applications/web/Say2";
      const applications = component.pages.find(p => p.name === "Applications")!;
      const videos = component.pages.find(p => p.name === "Videos")!;
      expect(component.isSelected(applications)).toBe(true);
      expect(component.isSelected(videos)).toBe(false);
    });
  });
});
