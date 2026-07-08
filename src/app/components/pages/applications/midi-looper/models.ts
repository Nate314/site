export type Instrument = "sine" | "square" | "sawtooth" | "triangle";

export interface Note {
  pitch: number;          // MIDI note number, 0-127
  startBeat: number;       // position within the track's own loop, in beats
  durationBeats: number;
  velocity: number;        // 0-127
}

export interface Track {
  name: string;
  instrument: Instrument;
  loopLengthBeats: number;
  notes: Note[];
}

export interface Project {
  tempo: number; // BPM, shared by all tracks
  tracks: Track[];
}
