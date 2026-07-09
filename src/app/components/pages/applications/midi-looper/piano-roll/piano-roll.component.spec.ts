import { PianoRollComponent } from "./piano-roll.component";
import { Track } from "../models";

describe("PianoRollComponent", () => {

  let component: PianoRollComponent;
  let track: Track;

  beforeEach(() => {
    component = new PianoRollComponent();
    track = { name: "T", instrument: "sine", loopLengthBeats: 4, notes: [] };
    component.track = track;
    component.gridResolutionStepsPerBeat = 4;
  });

  it("is created", () => {
    expect(component).toBeTruthy();
  });

  describe("stepIndices", () => {
    it("returns one index per 16th-note step across the loop", () => {
      expect(component.stepIndices().length).toBe(16); // 4 beats * 4 steps/beat
      expect(component.stepIndices()[0]).toBe(0);
      expect(component.stepIndices()[15]).toBe(15);
    });
  });

  describe("stepStartBeat", () => {
    it("converts a step index into a beat position", () => {
      expect(component.stepStartBeat(0)).toBe(0);
      expect(component.stepStartBeat(4)).toBe(1);
      expect(component.stepStartBeat(6)).toBe(1.5);
    });
  });

  describe("isNoteActive", () => {
    it("returns true when a note exists at that pitch/step", () => {
      track.notes.push({ pitch: 60, startBeat: 1, durationBeats: 0.25, velocity: 100 });
      expect(component.isNoteActive(60, 4)).toBe(true);
    });

    it("returns false when no note exists at that pitch/step", () => {
      expect(component.isNoteActive(60, 4)).toBe(false);
    });
  });

  describe("toggleCell", () => {
    it("emits the pitch and quantized start beat for the clicked cell", () => {
      const emitted: { pitch: number; startBeat: number }[] = [];
      component.noteToggled.subscribe(e => emitted.push(e));
      component.toggleCell(64, 6);
      expect(emitted).toEqual([{ pitch: 64, startBeat: 1.5 }]);
    });
  });

  describe("pitchLabel", () => {
    it("labels a natural note with its name and octave", () => {
      expect(component.pitchLabel(60)).toBe("C4");
    });

    it("labels a sharp/flat note with both enharmonic names and octave", () => {
      expect(component.pitchLabel(61)).toBe("C#4/Db4");
    });

    it("labels the lowest pitch on the roll (A0)", () => {
      expect(component.pitchLabel(21)).toBe("A0");
    });

    it("labels the highest pitch on the roll (C8)", () => {
      expect(component.pitchLabel(108)).toBe("C8");
    });
  });
});
