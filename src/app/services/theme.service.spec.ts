import { ThemeService } from "./theme.service";

describe("ThemeService", () => {

  const KEY = "theme";

  beforeEach(() => localStorage.removeItem(KEY));
  afterEach(() => localStorage.removeItem(KEY));

  it("defaults to light", () => {
    expect(new ThemeService().theme).toBe("light");
  });

  it("restores a stored dark theme", () => {
    localStorage.setItem(KEY, "dark");
    expect(new ThemeService().theme).toBe("dark");
  });

  it("toggle alternates between light and dark and stores the choice", () => {
    const service = new ThemeService();
    service.toggle();
    expect(service.theme).toBe("dark");
    expect(localStorage.getItem(KEY)).toBe("dark");
    service.toggle();
    expect(service.theme).toBe("light");
    expect(localStorage.getItem(KEY)).toBe("light");
  });

  it("emits the current theme on subscribe and every change after", () => {
    const service = new ThemeService();
    const seen: string[] = [];
    service.theme$.subscribe(v => seen.push(v));
    service.toggle();
    expect(seen).toEqual(["light", "dark"]);
  });
});
