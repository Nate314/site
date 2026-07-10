import { Component, EventEmitter, Input, Output } from "@angular/core";

interface KeyDef {
  pitch: number;
  isBlack: boolean;
  label: string;
}

const NOTE_NAMES = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];

/** Horizontal position (in px) for a black key, centered over the boundary
 *  between the white keys on either side of it. Fixed-pixel (not percentage)
 *  so a black key's size/position stays constant regardless of how many
 *  octaves are shown — only the fixed white-key width matters. */
export function computeBlackKeyLeftPx(
  keys: KeyDef[],
  pitch: number,
  whiteKeyWidthPx: number,
  blackKeyWidthPx: number
): number {
  const whiteKeys = keys.filter(k => !k.isBlack);
  const whiteKeysBefore = whiteKeys.filter(k => k.pitch < pitch).length;
  return whiteKeysBefore * whiteKeyWidthPx - blackKeyWidthPx / 2;
}

@Component({
  standalone: false,
  selector: "app-virtual-keyboard",
  templateUrl: "./virtual-keyboard.component.html"
})
export class VirtualKeyboardComponent {

  @Input() baseOctave: number = 4;
  @Input() octaveCount: number = 2;

  @Output() noteOn = new EventEmitter<number>();
  @Output() noteOff = new EventEmitter<number>();
  @Output() baseOctaveChange = new EventEmitter<number>();

  readonly whiteKeyWidthPx = 44;
  readonly blackKeyWidthPx = 26;

  get keys(): KeyDef[] {
    const basePitch = (this.baseOctave + 1) * 12; // MIDI pitch of C in this octave
    const keys: KeyDef[] = [];
    for (let i = 0; i < this.octaveCount * 12; i++) {
      const pitch = basePitch + i;
      const name = NOTE_NAMES[pitch % 12];
      const octave = Math.floor(pitch / 12) - 1;
      const label = name.split("/").map(n => n + octave).join("/");
      keys.push({ pitch, isBlack: name.includes("#"), label });
    }
    return keys;
  }

  get whiteKeys(): KeyDef[] {
    return this.keys.filter(k => !k.isBlack);
  }

  get blackKeys(): KeyDef[] {
    return this.keys.filter(k => k.isBlack);
  }

  get keyboardWidthPx(): number {
    return this.whiteKeys.length * this.whiteKeyWidthPx;
  }

  blackKeyLeftPx(pitch: number): number {
    return computeBlackKeyLeftPx(this.keys, pitch, this.whiteKeyWidthPx, this.blackKeyWidthPx);
  }

  shiftOctave(delta: number): void {
    const next = this.baseOctave + delta;
    if (next >= 0 && next <= 8) this.baseOctaveChange.emit(next);
  }

  press(pitch: number): void {
    this.noteOn.emit(pitch);
  }

  release(pitch: number): void {
    this.noteOff.emit(pitch);
  }
}
