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
