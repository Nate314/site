import { Component, EventEmitter, Input, Output } from "@angular/core";

interface KeyDef {
  pitch: number;
  isBlack: boolean;
  label: string;
}

const NOTE_NAMES = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];

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
