import { Project } from "./models";

/** A short original demo composition (4 measures at 4/4, 16 beats) so a new
 *  user can hear the looper working immediately instead of starting from a
 *  blank project. Loaded via MidiLooperComponent.loadDemo(). */
export const DEMO_PROJECT: Project = {
  tempo: 100,
  tracks: [
    {
      name: "Bass",
      instrument: "sine",
      loopLengthBeats: 16,
      notes: [
        { pitch: 36, startBeat: 0, durationBeats: 4, velocity: 90 },
        { pitch: 31, startBeat: 4, durationBeats: 4, velocity: 90 },
        { pitch: 33, startBeat: 8, durationBeats: 4, velocity: 90 },
        { pitch: 29, startBeat: 12, durationBeats: 4, velocity: 90 }
      ]
    },
    {
      name: "Chords",
      instrument: "triangle",
      loopLengthBeats: 16,
      notes: [
        // C major
        { pitch: 60, startBeat: 0, durationBeats: 4, velocity: 70 },
        { pitch: 64, startBeat: 0, durationBeats: 4, velocity: 70 },
        { pitch: 67, startBeat: 0, durationBeats: 4, velocity: 70 },
        // G major
        { pitch: 55, startBeat: 4, durationBeats: 4, velocity: 70 },
        { pitch: 59, startBeat: 4, durationBeats: 4, velocity: 70 },
        { pitch: 62, startBeat: 4, durationBeats: 4, velocity: 70 },
        // A minor
        { pitch: 57, startBeat: 8, durationBeats: 4, velocity: 70 },
        { pitch: 60, startBeat: 8, durationBeats: 4, velocity: 70 },
        { pitch: 64, startBeat: 8, durationBeats: 4, velocity: 70 },
        // F major
        { pitch: 53, startBeat: 12, durationBeats: 4, velocity: 70 },
        { pitch: 57, startBeat: 12, durationBeats: 4, velocity: 70 },
        { pitch: 60, startBeat: 12, durationBeats: 4, velocity: 70 }
      ]
    },
    {
      name: "Melody",
      instrument: "square",
      loopLengthBeats: 16,
      notes: [
        { pitch: 64, startBeat: 0, durationBeats: 1, velocity: 100 },
        { pitch: 67, startBeat: 1, durationBeats: 1, velocity: 100 },
        { pitch: 72, startBeat: 2, durationBeats: 1, velocity: 100 },
        { pitch: 71, startBeat: 3, durationBeats: 1, velocity: 100 },
        { pitch: 69, startBeat: 4, durationBeats: 1, velocity: 100 },
        { pitch: 67, startBeat: 5, durationBeats: 1, velocity: 100 },
        { pitch: 64, startBeat: 6, durationBeats: 1, velocity: 100 },
        { pitch: 62, startBeat: 7, durationBeats: 1, velocity: 100 },
        { pitch: 60, startBeat: 8, durationBeats: 1, velocity: 100 },
        { pitch: 64, startBeat: 9, durationBeats: 1, velocity: 100 },
        { pitch: 67, startBeat: 10, durationBeats: 1, velocity: 100 },
        { pitch: 65, startBeat: 11, durationBeats: 1, velocity: 100 },
        { pitch: 64, startBeat: 12, durationBeats: 1, velocity: 100 },
        { pitch: 62, startBeat: 13, durationBeats: 1, velocity: 100 },
        { pitch: 60, startBeat: 14, durationBeats: 1, velocity: 100 },
        { pitch: 59, startBeat: 15, durationBeats: 1, velocity: 100 }
      ]
    }
  ]
};
