import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Instrument, Project } from "./models";
import { quantizeBeat, wrapToLoop } from "./quantize";
import { MidiLooperAudioService } from "./midi-looper-audio.service";
import { WebMidiService } from "./web-midi.service";
import { InvalidProjectFileError, MidiLooperFileService } from "./midi-looper-file.service";
import { DEMO_PROJECT } from "./demo-project";

export const STORAGE_KEY = "midi-looper-state";

interface PersistedState {
  project: Project;
  volume: number;
  gridResolutionStepsPerBeat: number;
  timeSignatureNumerator: number;
  timeSignatureDenominator: number;
  keyboardOctaveCount: number;
  keyboardBaseOctave: number;
}

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
  keyboardBaseOctave: number = 4;
  volume: number = 0.75;

  isPlaying: boolean = false;
  isRecording: boolean = false;
  midiSupported: boolean = false;
  importError: string | null = null;
  currentStepIndex: number | null = null;

  private playheadTimer: ReturnType<typeof setInterval> | null = null;
  private readonly playheadUpdateIntervalMs = 50;

  constructor(
    private audioService: MidiLooperAudioService,
    private webMidi: WebMidiService,
    private fileService: MidiLooperFileService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.project = this.createDefaultProject();
    this.selectedTrackIndex = 0;
    this.loadState();
    this.audioService.setVolume(this.volume);

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

  addTrack(name?: string): void {
    this.project.tracks.push({
      name: name && name.length > 0 ? name : this.nextDefaultTrackName(),
      instrument: "sine",
      loopLengthBeats: 16,
      notes: []
    });
    this.selectedTrackIndex = this.project.tracks.length - 1;
    this.saveState();
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
    this.saveState();
    this.cdr.detectChanges();
  }

  onInstrumentChanged(event: { index: number; instrument: Instrument }): void {
    this.project.tracks[event.index].instrument = event.instrument;
    this.saveState();
    this.cdr.detectChanges();
  }

  onLoopLengthChanged(event: { index: number; loopLengthBeats: number }): void {
    this.project.tracks[event.index].loopLengthBeats = event.loopLengthBeats;
    this.saveState();
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
    this.saveState();
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
      this.saveState();
    }
    this.cdr.detectChanges();
  }

  play(): void {
    if (this.isPlaying) return;
    this.audioService.start(this.project.tracks, this.project.tempo);
    this.isPlaying = true;
    this.playheadTimer = setInterval(() => this.updatePlayhead(), this.playheadUpdateIntervalMs);
    this.cdr.detectChanges();
  }

  stop(): void {
    this.audioService.stop();
    this.isPlaying = false;
    this.isRecording = false;
    if (this.playheadTimer) {
      clearInterval(this.playheadTimer);
      this.playheadTimer = null;
    }
    this.currentStepIndex = null;
    this.cdr.detectChanges();
  }

  updatePlayhead(): void {
    const track = this.project.tracks[this.selectedTrackIndex];
    if (!track) return;
    const beat = wrapToLoop(this.currentBeat(), track.loopLengthBeats);
    this.currentStepIndex = Math.floor(beat * this.gridResolutionStepsPerBeat);
    this.cdr.detectChanges();
  }

  onVolumeChanged(volume: number): void {
    this.volume = volume;
    this.audioService.setVolume(volume);
    this.saveState();
  }

  onTempoChanged(tempo: number): void {
    this.project.tempo = tempo;
    if (this.isPlaying) {
      this.audioService.setTempo(tempo);
    }
    this.saveState();
    this.cdr.detectChanges();
  }

  onGridResolutionChanged(gridResolutionStepsPerBeat: number): void {
    this.gridResolutionStepsPerBeat = gridResolutionStepsPerBeat;
    this.saveState();
  }

  onTimeSignatureNumeratorChanged(timeSignatureNumerator: number): void {
    this.timeSignatureNumerator = timeSignatureNumerator;
    this.saveState();
  }

  onTimeSignatureDenominatorChanged(timeSignatureDenominator: number): void {
    this.timeSignatureDenominator = timeSignatureDenominator;
    this.saveState();
  }

  onKeyboardOctaveCountChanged(keyboardOctaveCount: number): void {
    this.keyboardOctaveCount = keyboardOctaveCount;
    this.saveState();
  }

  onKeyboardBaseOctaveChanged(keyboardBaseOctave: number): void {
    this.keyboardBaseOctave = keyboardBaseOctave;
    this.saveState();
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
      this.saveState();
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

  /** Wrapped so tests can spy on it instead of the global window.confirm. */
  confirmAction(message: string): boolean {
    return window.confirm(message);
  }

  loadDemo(): void {
    if (!this.confirmAction("Loading the demo will replace your current project. Are you sure?")) return;
    this.stop();
    this.project = JSON.parse(JSON.stringify(DEMO_PROJECT));
    this.selectedTrackIndex = 0;
    this.saveState();
    this.cdr.detectChanges();
  }

  clearProject(): void {
    if (!this.confirmAction("This will clear your current project. Are you sure?")) return;
    this.stop();
    this.project = this.createDefaultProject();
    this.selectedTrackIndex = 0;
    this.saveState();
    this.cdr.detectChanges();
  }

  private nextDefaultTrackName(): string {
    let n = this.project.tracks.length + 1;
    while (this.project.tracks.some(t => t.name === `Track ${n}`)) {
      n++;
    }
    return `Track ${n}`;
  }

  private createDefaultProject(): Project {
    return {
      tempo: 120,
      tracks: [{ name: "Track 1", instrument: "sine", loopLengthBeats: 16, notes: [] }]
    };
  }

  private currentBeat(): number {
    return this.audioService.getElapsedSeconds() * (this.project.tempo / 60);
  }

  private saveState(): void {
    const state: PersistedState = {
      project: this.project,
      volume: this.volume,
      gridResolutionStepsPerBeat: this.gridResolutionStepsPerBeat,
      timeSignatureNumerator: this.timeSignatureNumerator,
      timeSignatureDenominator: this.timeSignatureDenominator,
      keyboardOctaveCount: this.keyboardOctaveCount,
      keyboardBaseOctave: this.keyboardBaseOctave
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // localStorage may be unavailable (e.g. private browsing quota) - persistence is best-effort
    }
  }

  private loadState(): void {
    let raw: string | null;
    try {
      raw = localStorage.getItem(STORAGE_KEY);
    } catch {
      return;
    }
    if (!raw) return;

    let parsed: Partial<PersistedState>;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return;
    }

    if (parsed.project) {
      try {
        this.project = this.fileService.parseProject(JSON.stringify(parsed.project));
      } catch (err) {
        if (!(err instanceof InvalidProjectFileError)) throw err;
      }
    }
    if (typeof parsed.volume === "number") this.volume = Math.max(0, Math.min(1, parsed.volume));
    if (typeof parsed.gridResolutionStepsPerBeat === "number") this.gridResolutionStepsPerBeat = parsed.gridResolutionStepsPerBeat;
    if (typeof parsed.timeSignatureNumerator === "number") this.timeSignatureNumerator = parsed.timeSignatureNumerator;
    if (typeof parsed.timeSignatureDenominator === "number") this.timeSignatureDenominator = parsed.timeSignatureDenominator;
    if (typeof parsed.keyboardOctaveCount === "number") this.keyboardOctaveCount = parsed.keyboardOctaveCount;
    if (typeof parsed.keyboardBaseOctave === "number") this.keyboardBaseOctave = parsed.keyboardBaseOctave;
  }
}
