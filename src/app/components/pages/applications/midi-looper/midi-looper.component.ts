import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Instrument, Project } from "./models";
import { quantizeBeat, wrapToLoop } from "./quantize";
import { MidiLooperAudioService } from "./midi-looper-audio.service";
import { WebMidiService } from "./web-midi.service";
import { MidiLooperFileService } from "./midi-looper-file.service";

@Component({
  standalone: false,
  selector: "app-midi-looper",
  templateUrl: "./midi-looper.component.html"
})
export class MidiLooperComponent implements OnInit {

  project: Project;
  selectedTrackIndex: number = 0;
  gridResolutionStepsPerBeat: number = 4;
  timeSignatureNumerator: number = 4;
  timeSignatureDenominator: number = 4;
  keyboardOctaveCount: number = 2;

  isPlaying: boolean = false;
  isRecording: boolean = false;
  midiSupported: boolean = false;
  importError: string | null = null;

  /** performance.now() timestamp when the transport last started, used to
   *  compute the current beat position for overdub recording. */
  transportStartMs: number = 0;

  constructor(
    private audioService: MidiLooperAudioService,
    private webMidi: WebMidiService,
    private fileService: MidiLooperFileService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.project = {
      tempo: 120,
      tracks: [{ name: "Track 1", instrument: "sine", loopLengthBeats: 16, notes: [] }]
    };
    this.selectedTrackIndex = 0;

    this.midiSupported = this.webMidi.isSupported();
    if (this.midiSupported) {
      this.webMidi.connect().subscribe(connected => {
        this.midiSupported = connected;
        this.cdr.detectChanges();
      });
    }
    this.webMidi.notes().subscribe(event => {
      if (event.type === "on") this.onLiveNoteOn(event.pitch);
    });
  }

  addTrack(): void {
    this.project.tracks.push({
      name: "Track " + (this.project.tracks.length + 1),
      instrument: "sine",
      loopLengthBeats: 16,
      notes: []
    });
    this.selectedTrackIndex = this.project.tracks.length - 1;
    this.cdr.detectChanges();
  }

  removeTrack(index: number): void {
    if (this.project.tracks.length <= 1) return;
    this.project.tracks.splice(index, 1);
    if (index < this.selectedTrackIndex) {
      this.selectedTrackIndex--;
    } else if (this.selectedTrackIndex >= this.project.tracks.length) {
      this.selectedTrackIndex = this.project.tracks.length - 1;
    }
    this.cdr.detectChanges();
  }

  onInstrumentChanged(event: { index: number; instrument: Instrument }): void {
    this.project.tracks[event.index].instrument = event.instrument;
    this.cdr.detectChanges();
  }

  onLoopLengthChanged(event: { index: number; loopLengthBeats: number }): void {
    this.project.tracks[event.index].loopLengthBeats = event.loopLengthBeats;
    this.cdr.detectChanges();
  }

  onGridToggle(event: { pitch: number; startBeat: number }): void {
    const track = this.project.tracks[this.selectedTrackIndex];
    const existingIndex = track.notes.findIndex(n => n.pitch === event.pitch && n.startBeat === event.startBeat);
    if (existingIndex >= 0) {
      track.notes.splice(existingIndex, 1);
    } else {
      track.notes.push({
        pitch: event.pitch,
        startBeat: event.startBeat,
        durationBeats: 1 / this.gridResolutionStepsPerBeat,
        velocity: 100
      });
    }
    this.cdr.detectChanges();
  }

  /** Recorded notes (MIDI/virtual keyboard) always play a preview and, while
   *  recording, always ADD an overdubbed note — unlike the grid's toggle
   *  behavior, existing notes at the same slot are never removed here. */
  onLiveNoteOn(pitch: number): void {
    const track = this.project.tracks[this.selectedTrackIndex];
    this.audioService.playImmediate(track.instrument, pitch, 100);
    if (this.isRecording) {
      const beat = quantizeBeat(wrapToLoop(this.currentBeat(), track.loopLengthBeats), this.gridResolutionStepsPerBeat);
      track.notes.push({ pitch, startBeat: beat, durationBeats: 1 / this.gridResolutionStepsPerBeat, velocity: 100 });
    }
    this.cdr.detectChanges();
  }

  play(): void {
    if (this.isPlaying) return;
    this.transportStartMs = performance.now();
    this.audioService.start(this.project.tracks, this.project.tempo);
    this.isPlaying = true;
    this.cdr.detectChanges();
  }

  stop(): void {
    this.audioService.stop();
    this.isPlaying = false;
    this.isRecording = false;
    this.cdr.detectChanges();
  }

  onTempoChanged(tempo: number): void {
    this.project.tempo = tempo;
    if (this.isPlaying) {
      this.audioService.setTempo(tempo);
    }
    this.cdr.detectChanges();
  }

  toggleRecord(): void {
    if (!this.isPlaying) this.play();
    this.isRecording = !this.isRecording;
    this.cdr.detectChanges();
  }

  exportProject(): void {
    this.fileService.exportProject(this.project);
  }

  async onImportFile(file: File): Promise<void> {
    this.stop();
    this.importError = null;
    try {
      this.project = await this.fileService.importProject(file);
      this.selectedTrackIndex = 0;
    } catch (err) {
      this.importError = err instanceof Error ? err.message : "Failed to import file.";
    }
    this.cdr.detectChanges();
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.onImportFile(input.files[0]);
      input.value = "";
    }
  }

  private currentBeat(): number {
    const elapsedMs = performance.now() - this.transportStartMs;
    return (elapsedMs / 1000) * (this.project.tempo / 60);
  }
}
