import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IFrameAppComponent } from "./iframe-app.component";

// The frame targets are data: URLs so nothing is fetched from the network and no script runs.
describe("IFrameAppComponent", () => {

  let fixture: ComponentFixture<IFrameAppComponent>;
  const host = () => fixture.nativeElement.querySelector("#iframediv") as HTMLElement;

  function render(src: string) {
    fixture = TestBed.createComponent(IFrameAppComponent);
    fixture.componentInstance.src = src;
    fixture.detectChanges();
  }

  beforeEach(() => TestBed.configureTestingModule({ declarations: [IFrameAppComponent] }));

  it("creates one iframe inside #iframediv with the given src", () => {
    render("data:text/plain,hello");
    const frames = host().querySelectorAll("iframe");
    expect(frames.length).toBe(1);
    expect(frames[0].getAttribute("src")).toBe("data:text/plain,hello");
  });

  it("sets the border, width and height the layout relies on", () => {
    render("data:text/plain,hello");
    const frame = host().querySelector("iframe")!;
    expect(frame.getAttribute("frameborder")).toBe("0");
    expect(frame.style.width).toBe("100%");
    expect(frame.style.height).toBe("60vh");
  });

  it("offers a plain link to open the application on its own", () => {
    render("data:text/plain,hello");
    const link = fixture.nativeElement.querySelector("a") as HTMLAnchorElement;
    expect(link.textContent).toContain("here");
    expect(link.getAttribute("href")).toBe("data:text/plain,hello");
  });

  it("keeps a hostile-looking src inside the attribute instead of parsing it as markup", () => {
    const hostile = "data:text/plain,\"><b id=injected>x</b><script>window.__iframeInjected=1</script>";
    render(hostile);
    expect(host().children.length).toBe(1);
    expect(host().querySelector("#injected")).toBeNull();
    expect(host().querySelector("iframe")!.getAttribute("src")).toBe(hostile);
    expect((window as any).__iframeInjected).toBeUndefined();
  });

  it("replaces the previous iframe if initialised again rather than stacking frames", () => {
    render("data:text/plain,one");
    fixture.componentInstance.src = "data:text/plain,two";
    fixture.componentInstance.ngOnInit();
    const frames = host().querySelectorAll("iframe");
    expect(frames.length).toBe(1);
    expect(frames[0].getAttribute("src")).toBe("data:text/plain,two");
  });
});
