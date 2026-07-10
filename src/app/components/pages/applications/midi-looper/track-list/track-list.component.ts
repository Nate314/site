import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Instrument, Track } from "../models";

@Component({
  standalone: false,
  selector: "app-track-list",
  templateUrl: "./track-list.component.html"
})
export class TrackListComponent {

  @Input() tracks: Track[] = [];
  @Input() selectedIndex: number = 0;

  @Output() selectedIndexChange = new EventEmitter<number>();
  @Output() trackAdded = new EventEmitter<string>();
  @Output() trackRemoved = new EventEmitter<number>();
  @Output() instrumentChanged = new EventEmitter<{ index: number; instrument: Instrument }>();
  @Output() loopLengthChanged = new EventEmitter<{ index: number; loopLengthBeats: number }>();

  readonly instruments: Instrument[] = ["sine", "square", "sawtooth", "triangle"];

  newTrackName: string = "";

  select(index: number): void {
    this.selectedIndexChange.emit(index);
  }

  addTrack(): void {
    this.trackAdded.emit(this.newTrackName.trim());
    this.newTrackName = "";
  }

  removeTrack(index: number): void {
    this.trackRemoved.emit(index);
  }

  changeInstrument(index: number, instrument: Instrument): void {
    this.instrumentChanged.emit({ index, instrument });
  }

  changeLoopLength(index: number, loopLengthBeats: number): void {
    if (loopLengthBeats > 0) {
      this.loopLengthChanged.emit({ index, loopLengthBeats: Number(loopLengthBeats) });
    }
  }
}
