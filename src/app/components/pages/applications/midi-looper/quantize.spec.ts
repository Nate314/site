import { quantizeBeat, wrapToLoop } from "./quantize";

describe("quantizeBeat", () => {
  it("snaps to the nearest 16th-note step (4 steps per beat)", () => {
    expect(quantizeBeat(0.42, 4)).toBeCloseTo(0.5, 10);
    expect(quantizeBeat(0.05, 4)).toBeCloseTo(0, 10);
  });

  it("snaps to the nearest quarter-note step (1 step per beat)", () => {
    expect(quantizeBeat(1.1, 1)).toBeCloseTo(1, 10);
    expect(quantizeBeat(1.6, 1)).toBeCloseTo(2, 10);
  });
});

describe("wrapToLoop", () => {
  it("wraps a beat position that has passed the loop end", () => {
    expect(wrapToLoop(5, 4)).toBeCloseTo(1, 10);
  });

  it("wraps a negative beat position into the loop", () => {
    expect(wrapToLoop(-1, 4)).toBeCloseTo(3, 10);
  });

  it("leaves an in-range beat position unchanged", () => {
    expect(wrapToLoop(2.5, 4)).toBeCloseTo(2.5, 10);
  });
});
