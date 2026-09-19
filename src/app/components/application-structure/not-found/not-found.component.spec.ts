import { of } from "rxjs";
import { NotFoundComponent } from "./not-found.component";

// The redirect itself assigns window.location.href, which would navigate the test runner away, so these
// specs never advance the clock to the redirect delay. They cover the message, the dots animation and,
// importantly, that destroying the component cancels the pending redirect.
describe("NotFoundComponent", () => {

  let cdr: { detectChanges: jasmine.Spy };

  const create = (redirects: any[]) => {
    const db: any = { connection: () => of({ getRedirects: () => redirects }) };
    const component = new NotFoundComponent(db, cdr as any);
    component.ngOnInit();
    return component;
  };

  beforeEach(() => {
    cdr = { detectChanges: jasmine.createSpy("detectChanges") };
    jasmine.clock().install();
  });

  afterEach(() => jasmine.clock().uninstall());

  it("shows the not found message once data has loaded when the path is not a redirect", () => {
    const component = create([{ title: "/somewhere-else", link: "/x", description: "x" }]);
    expect(component.loaded).toBe(true);
    expect(component.content).toContain("NOT FOUND");
    expect(cdr.detectChanges).toHaveBeenCalled();
    component.ngOnDestroy();
  });

  it("announces the redirect target and animates dots while waiting", () => {
    const component = create([{ title: window.location.pathname, link: "https://example.com", description: "example.com" }]);
    expect(component.content).toBe("Redirecting to example.com");
    jasmine.clock().tick(200);
    expect(component.content).toBe("Redirecting to example.com .");
    jasmine.clock().tick(200);
    expect(component.content).toBe("Redirecting to example.com . .");
    component.ngOnDestroy();
  });

  it("cancels the pending redirect and the animation when destroyed", () => {
    const component = create([{ title: window.location.pathname, link: "https://example.com", description: "example.com" }]);
    jasmine.clock().tick(200);
    component.ngOnDestroy();
    const before = component.content;
    // Well past the 1200ms redirect delay: nothing may fire, or this spec would navigate the runner away.
    jasmine.clock().tick(10000);
    expect(component.content).toBe(before);
  });

  it("does nothing on destroy when no redirect was scheduled", () => {
    const component = create([]);
    expect(() => component.ngOnDestroy()).not.toThrow();
  });
});
