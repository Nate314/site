import { UnlockService } from "./unlock.service";

describe("UnlockService", () => {

  const KEY = "secretUnlocked";

  beforeEach(() => localStorage.removeItem(KEY));
  afterEach(() => localStorage.removeItem(KEY));

  it("starts locked when nothing is stored", () => {
    expect(new UnlockService().unlocked).toBe(false);
  });

  it("starts unlocked when the stored value is exactly \"true\"", () => {
    localStorage.setItem(KEY, "true");
    expect(new UnlockService().unlocked).toBe(true);
  });

  it("treats any other stored value as locked", () => {
    localStorage.setItem(KEY, "1");
    expect(new UnlockService().unlocked).toBe(false);
  });

  it("toggle flips the state and persists it", () => {
    const service = new UnlockService();
    service.toggle();
    expect(service.unlocked).toBe(true);
    expect(localStorage.getItem(KEY)).toBe("true");
    service.toggle();
    expect(service.unlocked).toBe(false);
    expect(localStorage.getItem(KEY)).toBe("false");
  });

  it("a persisted unlock survives a new service instance", () => {
    new UnlockService().toggle();
    expect(new UnlockService().unlocked).toBe(true);
  });

  it("emits the current value on subscribe and each change after", () => {
    const service = new UnlockService();
    const seen: boolean[] = [];
    service.unlocked$.subscribe(v => seen.push(v));
    service.toggle();
    service.toggle();
    expect(seen).toEqual([false, true, false]);
  });
});
