import { Component, EventEmitter, Input, Output } from "@angular/core";

interface KeyDef {
  pitch: number;
  isBlack: boolean;
  label: string;
}

const NOTE_NAMES = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];
const DEFAULT_BLACK_KEY_WIDTH_PERCENT = 5.5;

/** Horizontal position (as a % of the white-key row's width) for a black key,
 *  centered over the boundary between the white keys on either side of it. */
export function computeBlackKeyLeftPercent(
  keys: KeyDef[],
  pitch: number,
  blackKeyWidthPercent: number = DEFAULT_BLACK_KEY_WIDTH_PERCENT
): number {
  const whiteKeys = keys.filter(k => !k.isBlack);
  const whiteKeysBefore = whiteKeys.filter(k => k.pitch < pitch).length;
  const whiteKeyWidthPercent = 100 / whiteKeys.length;
  return whiteKeysBefore * whiteKeyWidthPercent - blackKeyWidthPercent / 2;
}

@Component({
  standalone: false,
  selector: "app-virtual-keyboard",
  templateUrl: "./virtual-keyboard.component.html"
})
export class VirtualKeyboardComponent {

  @Input() baseOctave: number = 4;

  @Output() noteOn = new EventEmitter<number>();
  @Output() noteOff = new EventEmitter<number>();

  get keys(): KeyDef[] {
    const basePitch = (this.baseOctave + 1) * 12; // MIDI pitch of C in this octave
    const keys: KeyDef[] = [];
    for (let i = 0; i < 24; i++) {
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

  blackKeyLeftPercent(pitch: number): number {
    return computeBlackKeyLeftPercent(this.keys, pitch);
  }

  shiftOctave(delta: number): void {
    const next = this.baseOctave + delta;
    if (next >= 0 && next <= 8) this.baseOctave = next;
  }

  press(pitch: number): void {
    this.noteOn.emit(pitch);
  }

  release(pitch: number): void {
    this.noteOff.emit(pitch);
  }
}
