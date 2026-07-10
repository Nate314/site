export function quantizeBeat(beat: number, stepsPerBeat: number): number {
  const stepSize = 1 / stepsPerBeat;
  return Math.round(beat / stepSize) * stepSize;
}

export function wrapToLoop(beat: number, loopLengthBeats: number): number {
  const wrapped = beat % loopLengthBeats;
  return wrapped < 0 ? wrapped + loopLengthBeats : wrapped;
}
