import { BehaviorSubject, of } from "rxjs";
import { HomeComponent } from "./home.component";

describe("HomeComponent", () => {

  let router: { url: string; navigate: jasmine.Spy };
  let cdr: { detectChanges: jasmine.Spy };
  let unlock: { unlocked: boolean; unlocked$: BehaviorSubject<boolean> };
  let component: HomeComponent;

  const otherwebsites = {
    friends: [{ name: "Friend", url: "https://friend.example.com" }],
    youtube: [{ name: "Channel", url: "https://www.youtube.com/@channel" }],
    languages: [
      { name: "Angular", url: "https://a.example.com", context: "work" },
      { name: "Java", url: "https://j.example.com", context: "personal" },
      { name: "TypeScript", url: "https://t.example.com", context: "both" }
    ],
    tools: [
      { name: "Git", url: "https://g.example.com", context: "both" },
      { name: "Windows", url: "https://w.example.com", context: "personal" }
    ]
  };

  beforeEach(() => {
    router = { url: "/home", navigate: jasmine.createSpy("navigate") };
    cdr = { detectChanges: jasmine.createSpy("detectChanges") };
    unlock = { unlocked: false, unlocked$: new BehaviorSubject(false) };
    const db: any = { connection: () => of({ getHome: () => ({ otherwebsites }) }) };
    component = new HomeComponent(router as any, db, cdr as any, unlock as any);
    component.ngOnInit();
  });

  it("titles the page Home", () => {
    expect(document.title).toBe("NathanGawith | Home");
  });

  it("splits languages and tools by context, counting \"both\" in each list", () => {
    expect(component.workLinks.map(l => l.name)).toEqual(["Angular", "TypeScript", "Git"]);
    expect(component.personalLinks.map(l => l.name)).toEqual(["Java", "TypeScript", "Git", "Windows"]);
  });

  it("keeps the friend and youtube lists as given", () => {
    expect(component.friendLinks).toEqual(otherwebsites.friends);
    expect(component.youtubeLinks).toEqual(otherwebsites.youtube);
  });

  it("re-renders after the data arrives and when the unlock changes", () => {
    expect(cdr.detectChanges).toHaveBeenCalled();
    cdr.detectChanges.calls.reset();
    unlock.unlocked$.next(true);
    expect(cdr.detectChanges).toHaveBeenCalled();
  });

  it("gives internal links a leading slash and leaves absolute links alone", () => {
    expect(component.hrefFor("videos")).toBe("/videos");
    expect(component.hrefFor("https://example.com/x")).toBe("https://example.com/x");
  });

  it("routes a plain click on an internal link through the router", () => {
    const event = new MouseEvent("click", { button: 0, cancelable: true });
    component.go(event, "videos");
    expect(event.defaultPrevented).toBe(true);
    expect(router.navigate).toHaveBeenCalledWith(["videos"]);
  });

  it("leaves a click on an external link to the browser", () => {
    const event = new MouseEvent("click", { button: 0, cancelable: true });
    component.go(event, "https://example.com/");
    expect(event.defaultPrevented).toBe(false);
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
