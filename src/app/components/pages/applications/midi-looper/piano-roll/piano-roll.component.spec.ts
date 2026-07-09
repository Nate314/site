import { PianoRollComponent, computeCenteredScrollTop } from "./piano-roll.component";
import { Track } from "../models";

describe("computeCenteredScrollTop", () => {
  it("centers a row within the container's visible height", () => {
    // container is 400px tall, row is 15px tall, positioned 500px down the full scrollable content
    expect(computeCenteredScrollTop(500, 15, 400)).toBe(500 - 200 + 7.5);
  });

  it("returns a negative value when the row is near the very top (browser clamps this to 0)", () => {
    expect(computeCenteredScrollTop(10, 15, 400)).toBe(10 - 200 + 7.5);
  });
});

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

  describe("startDrag / continueDrag / endDrag", () => {
    // Mirrors what the parent (MidiLooperComponent) does on noteToggled: add if
    // absent, remove if present. Kept in the test since PianoRollComponent
    // itself never mutates track.notes.
    function applyToggle(emitted: { pitch: number; startBeat: number }) {
      const i = track.notes.findIndex(n => n.pitch === emitted.pitch && n.startBeat === emitted.startBeat);
      if (i >= 0) track.notes.splice(i, 1);
      else track.notes.push({ pitch: emitted.pitch, startBeat: emitted.startBeat, durationBeats: 0.25, velocity: 100 });
    }

    let emitted: { pitch: number; startBeat: number }[];

    beforeEach(() => {
      emitted = [];
      component.noteToggled.subscribe(e => {
        emitted.push(e);
        applyToggle(e);
      });
    });

    it("starts a draw drag when the initial cell is empty, and adds a note there", () => {
      component.startDrag(60, 4);
      expect(component.isDragging).toBe(true);
      expect(component.dragMode).toBe("draw");
      expect(emitted).toEqual([{ pitch: 60, startBeat: 1 }]);
    });

    it("starts an erase drag when the initial cell already has a note, and removes it", () => {
      track.notes.push({ pitch: 60, startBeat: 1, durationBeats: 0.25, velocity: 100 });
      component.startDrag(60, 4);
      expect(component.dragMode).toBe("erase");
      expect(emitted).toEqual([{ pitch: 60, startBeat: 1 }]);
      expect(component.isNoteActive(60, 4)).toBe(false);
    });

    it("continues painting empty cells while dragging in draw mode", () => {
      component.startDrag(60, 0); // empty -> draw mode, adds (60, beat 0)
      component.continueDrag(62, 1); // empty -> should add (62, beat 0.25)
      expect(emitted).toEqual([
        { pitch: 60, startBeat: 0 },
        { pitch: 62, startBeat: 0.25 }
      ]);
    });

    it("does not re-toggle a cell that already matches draw mode", () => {
      track.notes.push({ pitch: 62, startBeat: 0.25, durationBeats: 0.25, velocity: 100 });
      component.startDrag(60, 0); // empty -> draw mode, adds (60, beat 0)
      component.continueDrag(62, 1); // already active -> should be skipped
      expect(emitted).toEqual([{ pitch: 60, startBeat: 0 }]);
    });

    it("continues erasing filled cells while dragging in erase mode", () => {
      track.notes.push({ pitch: 60, startBeat: 0, durationBeats: 0.25, velocity: 100 });
      track.notes.push({ pitch: 62, startBeat: 0.25, durationBeats: 0.25, velocity: 100 });
      component.startDrag(60, 0); // active -> erase mode, removes (60, beat 0)
      component.continueDrag(62, 1); // active -> should remove (62, beat 0.25)
      expect(emitted).toEqual([
        { pitch: 60, startBeat: 0 },
        { pitch: 62, startBeat: 0.25 }
      ]);
    });

    it("does not re-toggle a cell that already matches erase mode", () => {
      track.notes.push({ pitch: 60, startBeat: 0, durationBeats: 0.25, velocity: 100 });
      component.startDrag(60, 0); // active -> erase mode, removes (60, beat 0)
      component.continueDrag(62, 1); // empty -> should be skipped
      expect(emitted).toEqual([{ pitch: 60, startBeat: 0 }]);
    });

    it("does nothing on continueDrag when not dragging", () => {
      component.continueDrag(60, 0);
      expect(emitted).toEqual([]);
    });

    it("stops the drag on endDrag, so a later continueDrag does nothing", () => {
      component.startDrag(60, 0);
      component.endDrag();
      expect(component.isDragging).toBe(false);
      expect(component.dragMode).toBeNull();
      emitted = [];
      component.continueDrag(62, 1);
      expect(emitted).toEqual([]);
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
