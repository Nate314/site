import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Track } from "../models";
import { quantizeBeat } from "../quantize";

const NOTE_NAMES = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];

@Component({
  standalone: false,
  selector: "app-piano-roll",
  templateUrl: "./piano-roll.component.html"
})
export class PianoRollComponent {

  @Input() track: Track;
  @Input() gridResolutionStepsPerBeat: number = 4;

  @Output() noteToggled = new EventEmitter<{ pitch: number; startBeat: number }>();

  readonly minPitch = 21;  // A0
  readonly maxPitch = 108; // C8

  get pitches(): number[] {
    const list: number[] = [];
    for (let p = this.maxPitch; p >= this.minPitch; p--) list.push(p);
    return list;
  }

  stepIndices(): number[] {
    const count = Math.round(this.track.loopLengthBeats * this.gridResolutionStepsPerBeat);
    return Array.from({ length: count }, (_, i) => i);
  }

  stepStartBeat(stepIndex: number): number {
    return stepIndex / this.gridResolutionStepsPerBeat;
  }

  isNoteActive(pitch: number, stepIndex: number): boolean {
    const startBeat = this.stepStartBeat(stepIndex);
    return this.track.notes.some(n =>
      n.pitch === pitch && quantizeBeat(n.startBeat, this.gridResolutionStepsPerBeat) === startBeat);
  }

  toggleCell(pitch: number, stepIndex: number): void {
    this.noteToggled.emit({ pitch, startBeat: this.stepStartBeat(stepIndex) });
  }

  pitchLabel(pitch: number): string {
    const octave = Math.floor(pitch / 12) - 1;
    return NOTE_NAMES[pitch % 12].split("/").map(name => name + octave).join("/");
  }
}
