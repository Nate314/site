import { computeNoteOccurrences, pitchToFrequency } from "./scheduling";

describe("computeNoteOccurrences", () => {
  it("returns the single occurrence inside a one-shot window", () => {
    // tempo 120 => 0.5 sec/beat. note at beat 2 => 1.0s. loop is 4 beats => 2.0s.
    const times = computeNoteOccurrences(2, 4, 120, 0, 1.5);
    expect(times).toEqual([1.0]);
  });

  it("returns every repeat of the note that falls inside a wider window", () => {
    const times = computeNoteOccurrences(0, 4, 120, 0, 5.0);
    // loop is 2.0s long, note at beat 0 => occurs at 0, 2, 4
    expect(times).toEqual([0, 2.0, 4.0]);
  });

  it("returns an empty array when the loop length is zero", () => {
    expect(computeNoteOccurrences(0, 0, 120, 0, 5.0)).toEqual([]);
  });

  it("does not return occurrences before the window start", () => {
    const times = computeNoteOccurrences(0, 4, 120, 2.5, 5.0);
    expect(times).toEqual([4.0]);
  });
});

describe("pitchToFrequency", () => {
  it("returns 440Hz for MIDI pitch 69 (A4)", () => {
    expect(pitchToFrequency(69)).toBeCloseTo(440, 5);
  });

  it("returns 220Hz for MIDI pitch 57 (A3, one octave down)", () => {
    expect(pitchToFrequency(57)).toBeCloseTo(220, 5);
  });

  it("returns middle C (~261.63Hz) for MIDI pitch 60", () => {
    expect(pitchToFrequency(60)).toBeCloseTo(261.63, 1);
  });
});
