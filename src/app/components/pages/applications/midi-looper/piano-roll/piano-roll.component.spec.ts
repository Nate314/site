import {
  PianoRollComponent, computeCenteredScrollTop,
  beatLineIntervalBeats, measureLineIntervalBeats, isBeatLine, isMeasureLine
} from "./piano-roll.component";
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

describe("beatLineIntervalBeats", () => {
  it("converts a 16th-note beat (denominator 16) into quarter-note beats", () => {
    expect(beatLineIntervalBeats(16)).toBeCloseTo(0.25, 10);
  });

  it("converts a quarter-note beat (denominator 4) into quarter-note beats", () => {
    expect(beatLineIntervalBeats(4)).toBeCloseTo(1, 10);
  });

  it("converts an 8th-note beat (denominator 8) into quarter-note beats", () => {
    expect(beatLineIntervalBeats(8)).toBeCloseTo(0.5, 10);
  });
});

describe("measureLineIntervalBeats", () => {
  it("computes the measure length for the default 64:16 signature", () => {
    // 64 sixteenth-note-beats per measure * 0.25 quarter-beats each = 16 quarter-beats (4 whole notes)
    expect(measureLineIntervalBeats(64, 16)).toBeCloseTo(16, 10);
  });

  it("computes the measure length for standard 4/4", () => {
    expect(measureLineIntervalBeats(4, 4)).toBeCloseTo(4, 10);
  });
});

describe("isBeatLine", () => {
  it("is true exactly on beat-line boundaries", () => {
    const interval = beatLineIntervalBeats(16); // 0.25
    expect(isBeatLine(0, interval)).toBe(true);
    expect(isBeatLine(0.25, interval)).toBe(true);
    expect(isBeatLine(0.5, interval)).toBe(true);
  });

  it("is false between beat-line boundaries", () => {
    const interval = beatLineIntervalBeats(16); // 0.25
    expect(isBeatLine(0.125, interval)).toBe(false);
  });
});

describe("isMeasureLine", () => {
  it("is true exactly on measure-line boundaries", () => {
    const interval = measureLineIntervalBeats(64, 16); // 16
    expect(isMeasureLine(0, interval)).toBe(true);
    expect(isMeasureLine(16, interval)).toBe(true);
    expect(isMeasureLine(32, interval)).toBe(true);
  });

  it("is false between measure-line boundaries", () => {
    const interval = measureLineIntervalBeats(64, 16); // 16
    expect(isMeasureLine(8, interval)).toBe(false);
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

  describe("isConnectedToPrevious", () => {
    it("returns false for the first step in the row (no previous step)", () => {
      expect(component.isConnectedToPrevious(60, 0)).toBe(false);
    });

    it("returns false when the previous cell at that pitch is empty", () => {
      track.notes.push({ pitch: 60, startBeat: 0.25, durationBeats: 0.25, velocity: 100 });
      expect(component.isConnectedToPrevious(60, 1)).toBe(false);
    });

    it("returns true when both this cell and the previous cell at that pitch are active", () => {
      track.notes.push({ pitch: 60, startBeat: 0, durationBeats: 0.25, velocity: 100 });
      track.notes.push({ pitch: 60, startBeat: 0.25, durationBeats: 0.25, velocity: 100 });
      expect(component.isConnectedToPrevious(60, 1)).toBe(true);
    });

    it("returns false when the previous cell is active but at a different pitch", () => {
      track.notes.push({ pitch: 62, startBeat: 0, durationBeats: 0.25, velocity: 100 });
      track.notes.push({ pitch: 60, startBeat: 0.25, durationBeats: 0.25, velocity: 100 });
      expect(component.isConnectedToPrevious(60, 1)).toBe(false);
    });
  });

  describe("lineClass", () => {
    beforeEach(() => {
      component.timeSignatureNumerator = 64;
      component.timeSignatureDenominator = 16;
    });

    it("returns 'measure' at the start of a measure (step 0)", () => {
      expect(component.lineClass(0)).toBe("measure");
    });

    it("returns 'measure' at the start of the second measure (16 beats in, at 4 steps/beat = step 64)", () => {
      expect(component.lineClass(64)).toBe("measure");
    });

    it("returns 'beat' at a beat boundary that isn't a measure boundary", () => {
      // beat interval is 0.25 beats = step 1 at 4 steps/beat
      expect(component.lineClass(1)).toBe("beat");
    });

    it("returns 'normal' between beat boundaries", () => {
      component.gridResolutionStepsPerBeat = 8; // finer than the 0.25-beat signature interval
      expect(component.lineClass(1)).toBe("normal");
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
