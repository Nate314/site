import { TestBed } from "@angular/core/testing";
import { DomSanitizer } from "@angular/platform-browser";
import { convertToParamMap } from "@angular/router";
import { BehaviorSubject, of } from "rxjs";
import { VideosComponent } from "./videos.component";
import { dbFixture } from "../../../testing/db-fixture";

describe("VideosComponent", () => {

  let unlock: { unlocked: boolean; unlocked$: BehaviorSubject<boolean> };
  let cdr: { detectChanges: jasmine.Spy };
  let component: VideosComponent;

  function create(query: Record<string, string> = {}) {
    const route: any = { snapshot: { queryParamMap: convertToParamMap(query) } };
    const db: any = { connection: () => of(dbFixture()) };
    component = new VideosComponent({ url: "/videos" } as any, route, TestBed.inject(DomSanitizer), db, cdr as any, unlock as any);
    component.ngOnInit();
  }

  beforeEach(() => {
    unlock = { unlocked: false, unlocked$: new BehaviorSubject(false) };
    cdr = { detectChanges: jasmine.createSpy("detectChanges") };
    jasmine.clock().install();
  });

  afterEach(() => jasmine.clock().uninstall());

  it("stops showing the skeleton once the data arrives and sets the page title", () => {
    create();
    expect(component.loading).toBe(false);
    expect(document.title).toBe("NathanGawith | Videos");
    expect(cdr.detectChanges).toHaveBeenCalled();
  });

  describe("video mapping", () => {
    beforeEach(() => create());

    it("normalises a full embed URL and a bare id to the same youtube embed form", () => {
      const embed = (title: string) => (component.videos.find(v => v.title === title)!.link as any).changingThisBreaksApplicationSecurity;
      expect(embed("Timelapse")).toBe("https://www.youtube.com/embed/abc123");
      expect(embed("Typing Bot")).toBe("https://www.youtube.com/embed/bareId99");
    });

    it("drops query strings from the embed id", () => {
      const secret = component.videos.find(v => v.title === "Secret Vid")!;
      expect((secret.link as any).changingThisBreaksApplicationSecurity).toBe("https://www.youtube.com/embed/sec1");
    });

    it("uses the youtube thumbnail when there is no preview and a cache-busted preview when there is", () => {
      const byTitle = (title: string) => component.videos.find(v => v.title === title)!;
      expect(byTitle("Timelapse").preview).toBe("https://img.youtube.com/vi/abc123/hqdefault.jpg");
      expect(byTitle("Typing Bot").preview).toMatch(/^https:\/\/cdn\.example\.com\/p\.png\?time=\d+$/);
    });

    it("starts every video as a thumbnail, not an embed", () => {
      expect(component.videos.every(v => v.enabled === false)).toBe(true);
    });
  });

  describe("getYoutubeLink", () => {
    beforeEach(() => create());

    it("turns the sanitized embed URL back into a watch URL", () => {
      const video = component.videos.find(v => v.title === "Timelapse")!;
      expect(component.getYoutubeLink(video.link)).toBe("https://www.youtube.com/watch?v=abc123");
    });
  });

  describe("groups and tabs", () => {
    beforeEach(() => create());

    it("orders categories Code, Rubik's Cube, Other Projects and omits hidden videos", () => {
      expect(component.videoGroups.map(g => g.category)).toEqual(["Code", "Rubik's Cube", "Other Projects"]);
      expect(component.videoGroups[0].videos.map(v => v.title)).toEqual(["Typing Bot"]);
    });

    it("includes hidden videos once unlocked", () => {
      unlock.unlocked = true;
      expect(component.videoGroups[0].videos.map(v => v.title)).toEqual(["Typing Bot", "Secret Vid"]);
    });

    it("builds one tab per non-empty group, labelled with the category", () => {
      expect(component.pageTabs).toEqual([
        { key: "Code", label: "Code" },
        { key: "Rubik's Cube", label: "Rubik's Cube" },
        { key: "Other Projects", label: "Other Projects" }
      ]);
    });

    it("selectTab changes the active tab and re-renders", () => {
      cdr.detectChanges.calls.reset();
      component.selectTab("Other Projects");
      expect(component.activeTab).toBe("Other Projects");
      expect(cdr.detectChanges).toHaveBeenCalled();
    });

    it("defaults to the Code tab", () => {
      expect(component.activeTab).toBe("Code");
    });
  });

  describe("btnThumbnail", () => {
    beforeEach(() => create());

    it("turns the clicked video into an embed and any other embed back into a thumbnail", () => {
      const [a, b] = [component.videos[0], component.videos[1]];
      component.btnThumbnail(a);
      expect([a.enabled, b.enabled]).toEqual([true, false]);
      component.btnThumbnail(b);
      expect([a.enabled, b.enabled]).toEqual([false, true]);
    });
  });

  describe("?video= deep link", () => {
    it("switches to the video's category and pulses it, then clears the highlight", () => {
      create({ video: "Misc" });
      expect(component.activeTab).toBe("Other Projects");
      jasmine.clock().tick(1);
      expect(component.highlightedVideoTitle).toBe("Misc");
      jasmine.clock().tick(2000);
      expect(component.highlightedVideoTitle).toBeNull();
    });

    it("leaves everything alone for an unknown title", () => {
      create({ video: "No such video" });
      expect(component.activeTab).toBe("Code");
      jasmine.clock().tick(5000);
      expect(component.highlightedVideoTitle).toBeNull();
    });
  });

  it("derives a DOM-safe element id from a title", () => {
    create();
    expect(component.videoElementId("Minecraft: Stats (Search) Mod!")).toBe("video-Minecraft-Stats-Search-Mod-");
  });
});
