import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Helper } from "./Helper";

describe("Helper links and navigation", () => {

  let router: jasmine.SpyObj<Router>;

  beforeEach(() => router = jasmine.createSpyObj<Router>("Router", ["navigate"]));

  const click = (init: MouseEventInit = {}) => {
    const event = new MouseEvent("click", { button: 0, cancelable: true, ...init });
    spyOn(event, "preventDefault").and.callThrough();
    return event;
  };

  describe("hrefFor", () => {
    it("prefixes bare internal routes with a slash", () => {
      expect(Helper.hrefFor("videos")).toBe("/videos");
      expect(Helper.hrefFor("github-projects")).toBe("/github-projects");
    });

    it("leaves absolute http and https URLs untouched", () => {
      expect(Helper.hrefFor("https://example.com/a?b=1")).toBe("https://example.com/a?b=1");
      expect(Helper.hrefFor("HTTP://example.com")).toBe("HTTP://example.com");
    });
  });

  describe("smartNavigate", () => {
    it("routes a bare internal link through the router on a plain left click", () => {
      const event = click();
      Helper.smartNavigate(router, "videos", event);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(["videos"]);
    });

    it("routes a same-origin absolute URL as its path and query string", () => {
      const event = click();
      Helper.smartNavigate(router, `${window.location.origin}/videos?video=Timelapse`, event);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(["/videos?video=Timelapse"]);
    });

    it("does not intercept external URLs, so the real href handles them", () => {
      const event = click();
      Helper.smartNavigate(router, "https://example.com/", event);
      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it("does not intercept modified or non-primary clicks, so new-tab gestures keep working", () => {
      const gestures: MouseEventInit[] = [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { button: 1 }, { button: 2 }];
      for (const gesture of gestures) {
        const event = click(gesture);
        Helper.smartNavigate(router, "videos", event);
        expect(event.preventDefault).withContext(JSON.stringify(gesture)).not.toHaveBeenCalled();
      }
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  describe("navigate", () => {
    it("navigates the router to the given url", () => {
      Helper.navigate(router, {} as Location, "/applications/web/Say2");
      expect(router.navigate).toHaveBeenCalledWith(["/applications/web/Say2"]);
    });
  });

  describe("navigateTo", () => {
    beforeEach(() => jasmine.clock().install());
    afterEach(() => jasmine.clock().uninstall());

    it("bounces through /not-found first so a same-url navigation still re-renders, then goes to the target", () => {
      Helper.navigateTo(router, {} as Location, ["/videos"], { queryParams: { video: "x" } });
      expect(router.navigate).not.toHaveBeenCalled();
      jasmine.clock().tick(1);
      expect(router.navigate.calls.allArgs()).toEqual([
        [["/not-found"]],
        [["/videos"], { queryParams: { video: "x" } }]
      ]);
    });

    it("treats a lone slash as /home", () => {
      Helper.navigateTo(router, {} as Location, ["/"], {});
      jasmine.clock().tick(1);
      expect(router.navigate.calls.mostRecent().args[0]).toEqual(["/home"]);
    });
  });

  describe("isScreenSmall", () => {
    it("is true below 600px and false from 600px up", () => {
      const width = spyOnProperty(window, "innerWidth", "get");
      width.and.returnValue(599);
      expect(Helper.isScreenSmall()).toBe(true);
      width.and.returnValue(600);
      expect(Helper.isScreenSmall()).toBe(false);
    });
  });
});
