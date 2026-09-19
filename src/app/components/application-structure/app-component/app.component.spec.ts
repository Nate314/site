import { NavigationEnd } from "@angular/router";
import { Subject } from "rxjs";
import { AppComponent } from "./app.component";
import { ThemeService, UnlockService } from "../../../services";

describe("AppComponent", () => {

  let events: Subject<any>;
  let cdr: { detectChanges: jasmine.Spy };
  let unlock: UnlockService;
  let theme: ThemeService;
  let component: AppComponent;

  const press = (...keys: string[]) => keys.forEach(key => window.dispatchEvent(new KeyboardEvent("keydown", { key })));
  const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

  beforeEach(() => {
    localStorage.removeItem("secretUnlocked");
    localStorage.removeItem("theme");
    events = new Subject();
    cdr = { detectChanges: jasmine.createSpy("detectChanges") };
    unlock = new UnlockService();
    theme = new ThemeService();
    component = new AppComponent({ events } as any, cdr as any, unlock, theme);
    component.ngOnInit();
  });

  afterEach(() => {
    component.ngOnDestroy();
    localStorage.removeItem("secretUnlocked");
    localStorage.removeItem("theme");
    document.documentElement.removeAttribute("data-theme");
  });

  describe("Konami code", () => {
    it("toggles the secret unlock when the full sequence is typed", () => {
      press(...KONAMI);
      expect(unlock.unlocked).toBe(true);
    });

    it("is case-insensitive for the letters", () => {
      press(...KONAMI.slice(0, 8), "B", "A");
      expect(unlock.unlocked).toBe(true);
    });

    it("still matches when unrelated keys were typed before the sequence", () => {
      press("x", "Enter", "ArrowUp", ...KONAMI);
      expect(unlock.unlocked).toBe(true);
    });

    it("does not unlock on a wrong or incomplete sequence", () => {
      press(...KONAMI.slice(0, 9));
      expect(unlock.unlocked).toBe(false);
      press("x");
      expect(unlock.unlocked).toBe(false);
    });

    it("toggles back to locked on a second full sequence", () => {
      press(...KONAMI);
      expect(unlock.unlocked).toBe(true);
      press(...KONAMI);
      expect(unlock.unlocked).toBe(false);
    });

    it("stops listening once the component is destroyed", () => {
      component.ngOnDestroy();
      press(...KONAMI);
      expect(unlock.unlocked).toBe(false);
    });
  });

  describe("theme", () => {
    it("applies the current theme to <html> and follows toggles", () => {
      expect(document.documentElement.getAttribute("data-theme")).toBe("light");
      component.toggleTheme();
      expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    });
  });

  describe("shell selection", () => {
    it("hides the shell for standalone web applications", () => {
      events.next(new NavigationEnd(1, "/webapplications/say2", "/webapplications/say2"));
      expect(component.webapplication).toBe(true);
    });

    it("keeps the shell for the site's own embedded website route", () => {
      events.next(new NavigationEnd(1, "/webapplications/nathangawithwebsite", "/webapplications/nathangawithwebsite"));
      expect(component.webapplication).toBe(false);
    });

    it("keeps the shell for ordinary pages", () => {
      events.next(new NavigationEnd(1, "/videos", "/videos"));
      expect(component.webapplication).toBe(false);
    });
  });

  describe("layout helpers", () => {
    it("uses a smaller left margin on small screens", () => {
      const width = spyOnProperty(window, "innerWidth", "get");
      width.and.returnValue(400);
      expect(component.getStyle()).toEqual({ "margin-left": "2rem", "margin-right": "2rem" });
      width.and.returnValue(1200);
      expect(component.getStyle()).toEqual({ "margin-left": "7rem", "margin-right": "2rem" });
    });

    it("reads the route animation value from the outlet, tolerating no outlet", () => {
      expect(component.prepareRoute({ activatedRouteData: { animation: "2" } } as any)).toBe("2");
      expect(component.prepareRoute(undefined as any)).toBeUndefined();
    });
  });
});
