import { Note } from "./models";

const CONNECT_EPSILON = 1e-9;

/** Merges consecutive same-pitch notes where one note's end exactly meets the
 *  next note's start into a single longer note, so a run of adjacent grid
 *  cells plays back as one sustained tone instead of separately re-triggered
 *  notes. Does not mutate the input or affect editing/storage — callers that
 *  need the original per-cell notes (e.g. the piano roll UI) keep using them. */
export function mergeConnectedNotes(notes: Note[]): Note[] {
  const byPitch = new Map<number, Note[]>();
  for (const note of notes) {
    if (!byPitch.has(note.pitch)) byPitch.set(note.pitch, []);
    byPitch.get(note.pitch)!.push(note);
  }

  const merged: Note[] = [];
  for (const group of byPitch.values()) {
    const sorted = [...group].sort((a, b) => a.startBeat - b.startBeat);
    let current: Note | null = null;
    for (const note of sorted) {
      if (current && Math.abs((current.startBeat + current.durationBeats) - note.startBeat) < CONNECT_EPSILON) {
        current = { ...current, durationBeats: current.durationBeats + note.durationBeats };
      } else {
        if (current) merged.push(current);
        current = { ...note };
      }
    }
    if (current) merged.push(current);
  }
  return merged;
}

/** Every absolute time (seconds, same clock as windowStart/windowEnd) at which
 *  a note repeating every `loopLengthBeats` beats falls inside [windowStart, windowEnd). */
export function computeNoteOccurrences(
  noteStartBeats: number,
  loopLengthBeats: number,
  tempo: number,
  windowStartSec: number,
  windowEndSec: number
): number[] {
  if (loopLengthBeats <= 0) return [];
  const secondsPerBeat = 60 / tempo;
  const loopSeconds = loopLengthBeats * secondsPerBeat;
  const noteSeconds = noteStartBeats * secondsPerBeat;
  const firstLoopIndex = Math.floor((windowStartSec - noteSeconds) / loopSeconds);
  const times: number[] = [];
  for (let loopIndex = firstLoopIndex; ; loopIndex++) {
    const t = noteSeconds + loopIndex * loopSeconds;
    if (t >= windowEndSec) break;
    if (t >= windowStartSec) times.push(t);
  }
  return times;
}

export function pitchToFrequency(pitch: number): number {
  return 440 * Math.pow(2, (pitch - 69) / 12);
}
