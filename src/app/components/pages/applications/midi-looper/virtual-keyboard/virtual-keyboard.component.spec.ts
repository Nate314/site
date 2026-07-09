import { VirtualKeyboardComponent, computeBlackKeyLeftPx } from "./virtual-keyboard.component";

describe("computeBlackKeyLeftPx", () => {
  const keys = [
    { pitch: 60, isBlack: false, label: "C4" },
    { pitch: 61, isBlack: true, label: "C#4/Db4" },
    { pitch: 62, isBlack: false, label: "D4" },
    { pitch: 63, isBlack: true, label: "D#4/Eb4" },
    { pitch: 64, isBlack: false, label: "E4" }
  ];

  it("positions the first black key right after the first white key, independent of total key count", () => {
    // 1 white key (C4) precedes C#4
    expect(computeBlackKeyLeftPx(keys, 61, 44, 26)).toBe(1 * 44 - 26 / 2);
  });

  it("positions a later black key after all white keys preceding it", () => {
    // 2 white keys (C4, D4) precede D#4
    expect(computeBlackKeyLeftPx(keys, 63, 44, 26)).toBe(2 * 44 - 26 / 2);
  });

  it("stays a fixed size/position relative to a fixed white-key width, regardless of how many keys are shown", () => {
    // Same white-key width (44px) as above, but a much longer keys array (more octaves) —
    // the black key's position must not change just because the total range grew.
    const manyKeys = [...keys, ...keys.map(k => ({ ...k, pitch: k.pitch + 12 }))];
    expect(computeBlackKeyLeftPx(manyKeys, 61, 44, 26)).toBe(1 * 44 - 26 / 2);
  });
});

describe("VirtualKeyboardComponent", () => {

  let component: VirtualKeyboardComponent;

  beforeEach(() => {
    component = new VirtualKeyboardComponent();
  });

  it("is created", () => {
    expect(component).toBeTruthy();
  });

  describe("keys", () => {
    it("returns 24 keys starting at C of the base octave", () => {
      component.baseOctave = 4;
      const keys = component.keys;
      expect(keys.length).toBe(24);
      expect(keys[0]).toEqual({ pitch: 60, isBlack: false, label: "C4" });
    });

    it("marks sharps as black keys and labels them with both enharmonic names", () => {
      component.baseOctave = 4;
      const cSharp = component.keys[1];
      expect(cSharp).toEqual({ pitch: 61, isBlack: true, label: "C#4/Db4" });
    });

    it("returns 12 keys for a single octave when octaveCount is 1", () => {
      component.baseOctave = 4;
      component.octaveCount = 1;
      expect(component.keys.length).toBe(12);
    });

    it("returns 36 keys for three octaves when octaveCount is 3", () => {
      component.baseOctave = 4;
      component.octaveCount = 3;
      expect(component.keys.length).toBe(36);
    });
  });

  describe("keyboardWidthPx", () => {
    it("equals the number of white keys times the fixed white-key width", () => {
      component.baseOctave = 4;
      component.octaveCount = 2;
      expect(component.keyboardWidthPx).toBe(component.whiteKeys.length * component.whiteKeyWidthPx);
    });
  });

  describe("shiftOctave", () => {
    it("increases the base octave", () => {
      component.baseOctave = 4;
      component.shiftOctave(1);
      expect(component.baseOctave).toBe(5);
    });

    it("does not go below octave 0", () => {
      component.baseOctave = 0;
      component.shiftOctave(-1);
      expect(component.baseOctave).toBe(0);
    });

    it("does not go above octave 8", () => {
      component.baseOctave = 8;
      component.shiftOctave(1);
      expect(component.baseOctave).toBe(8);
    });
  });

  describe("press / release", () => {
    it("emits noteOn with the pressed pitch", () => {
      const emitted: number[] = [];
      component.noteOn.subscribe((pitch: number) => emitted.push(pitch));
      component.press(60);
      expect(emitted).toEqual([60]);
    });

    it("emits noteOff with the released pitch", () => {
      const emitted: number[] = [];
      component.noteOff.subscribe((pitch: number) => emitted.push(pitch));
      component.release(60);
      expect(emitted).toEqual([60]);
    });
  });
});
