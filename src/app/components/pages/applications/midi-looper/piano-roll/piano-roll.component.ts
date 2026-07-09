import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from "@angular/core";
import { Track } from "../models";
import { quantizeBeat } from "../quantize";

const NOTE_NAMES = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];
const MIDDLE_C_PITCH = 60;

export function computeCenteredScrollTop(rowOffsetTop: number, rowHeight: number, containerClientHeight: number): number {
  return rowOffsetTop - containerClientHeight / 2 + rowHeight / 2;
}

const EPSILON = 1e-9;

export function beatLineIntervalBeats(timeSignatureDenominator: number): number {
  return 4 / timeSignatureDenominator;
}

export function measureLineIntervalBeats(timeSignatureNumerator: number, timeSignatureDenominator: number): number {
  return timeSignatureNumerator * beatLineIntervalBeats(timeSignatureDenominator);
}

export function isBeatLine(stepStartBeat: number, intervalBeats: number): boolean {
  const ratio = stepStartBeat / intervalBeats;
  return Math.abs(ratio - Math.round(ratio)) < EPSILON;
}

export function isMeasureLine(stepStartBeat: number, intervalBeats: number): boolean {
  return isBeatLine(stepStartBeat, intervalBeats);
}

@Component({
  standalone: false,
  selector: "app-piano-roll",
  templateUrl: "./piano-roll.component.html"
})
export class PianoRollComponent implements AfterViewInit {

  @Input() track: Track;
  @Input() gridResolutionStepsPerBeat: number = 4;
  @Input() timeSignatureNumerator: number = 4;
  @Input() timeSignatureDenominator: number = 4;
  @Input() currentStepIndex: number | null = null;

  @ViewChild("scrollContainer") scrollContainer: ElementRef<HTMLDivElement>;

  @Output() noteToggled = new EventEmitter<{ pitch: number; startBeat: number }>();

  isDragging: boolean = false;
  dragMode: "draw" | "erase" | null = null;

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

  isConnectedToPrevious(pitch: number, stepIndex: number): boolean {
    if (stepIndex <= 0) return false;
    return this.isNoteActive(pitch, stepIndex - 1) && this.isNoteActive(pitch, stepIndex);
  }

  toggleCell(pitch: number, stepIndex: number): void {
    this.noteToggled.emit({ pitch, startBeat: this.stepStartBeat(stepIndex) });
  }

  startDrag(pitch: number, stepIndex: number): void {
    this.dragMode = this.isNoteActive(pitch, stepIndex) ? "erase" : "draw";
    this.isDragging = true;
    this.toggleCell(pitch, stepIndex);
  }

  continueDrag(pitch: number, stepIndex: number): void {
    if (!this.isDragging) return;
    const active = this.isNoteActive(pitch, stepIndex);
    if (this.dragMode === "draw" && !active) this.toggleCell(pitch, stepIndex);
    else if (this.dragMode === "erase" && active) this.toggleCell(pitch, stepIndex);
  }

  @HostListener("document:mouseup")
  endDrag(): void {
    this.isDragging = false;
    this.dragMode = null;
  }

  lineClass(stepIndex: number): "measure" | "beat" | "normal" {
    const startBeat = this.stepStartBeat(stepIndex);
    const measureInterval = measureLineIntervalBeats(this.timeSignatureNumerator, this.timeSignatureDenominator);
    if (isMeasureLine(startBeat, measureInterval)) return "measure";
    const beatInterval = beatLineIntervalBeats(this.timeSignatureDenominator);
    if (isBeatLine(startBeat, beatInterval)) return "beat";
    return "normal";
  }

  isCurrentStep(stepIndex: number): boolean {
    return this.currentStepIndex === stepIndex;
  }

  pitchLabel(pitch: number): string {
    const octave = Math.floor(pitch / 12) - 1;
    return NOTE_NAMES[pitch % 12].split("/").map(name => name + octave).join("/");
  }

  ngAfterViewInit(): void {
    const container = this.scrollContainer.nativeElement;
    const middleCRow = container.querySelector(`tr[data-pitch="${MIDDLE_C_PITCH}"]`) as HTMLElement;
    if (middleCRow) {
      container.scrollTop = computeCenteredScrollTop(middleCRow.offsetTop, middleCRow.offsetHeight, container.clientHeight);
    }
  }
}
