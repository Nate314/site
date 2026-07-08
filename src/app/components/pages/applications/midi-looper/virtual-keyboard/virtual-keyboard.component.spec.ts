import { VirtualKeyboardComponent } from "./virtual-keyboard.component";

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

    it("marks sharps as black keys", () => {
      component.baseOctave = 4;
      const cSharp = component.keys[1];
      expect(cSharp).toEqual({ pitch: 61, isBlack: true, label: "C#4" });
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
