# MIDI Piano Roll Looper Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new "MIDI Looper" web application to the site: a multi-track piano-roll looper with click-to-draw notes, an on-screen virtual keyboard, live Web MIDI input, a Web Audio synth, and JSON project export/import.

**Architecture:** Follows the site's existing "web application" pattern (an NgModule component with a unique selector, registered in `src/assets/db.json`, rendered via `*ngIf` in `applications.component.html`). The feature is split into a container component (`MidiLooperComponent`, owns the `Project` state) plus three presentational child components (`PianoRollComponent`, `VirtualKeyboardComponent`, `TrackListComponent`) that only emit events, and three services (`MidiLooperAudioService` for playback, `WebMidiService` for MIDI input, `MidiLooperFileService` for export/import). Pure calculation logic (quantization, loop scheduling math, pitch-to-frequency) lives in plain functions separate from any Web Audio/DOM API calls, so it can be unit tested directly.

**Tech Stack:** Angular 22 (NgModules, `standalone: false`), TypeScript, RxJS, Web Audio API, Web MIDI API, Karma + Jasmine (`@angular/build:karma`, `ChromeHeadless`).

## Global Constraints

- Every component uses `standalone: false` and a `templateUrl` (no inline templates), matching every existing component in this codebase.
- Import Angular packages using bare specifiers (`"@angular/core"`, not a relative `node_modules` path) — see `src/app/components/pages/applications/say2/say2.component.ts` history for why a relative `node_modules` import breaks under the esbuild/Vite builder.
- No SCSS files — existing web apps use plain HTML with inline `style` attributes or plain CSS classes; don't introduce a new styling convention.
- After any component state change from a non-template async source (RxJS subscription, `setTimeout`/timer callback), call `this.cdr.detectChanges()` — this app is zoneless (see `CLAUDE.md`).
- Tests are plain Jasmine specs instantiating the class directly (`new SomeComponent(...)`), not `TestBed` — matches every existing `*.spec.ts` in this repo.
- `Project`/`Track`/`Note` field names, once defined in Task 1, must be used identically (same names, same types) in every later task.

---

### Task 1: Data model and quantization utilities

**Files:**
- Create: `src/app/components/pages/applications/midi-looper/models.ts`
- Create: `src/app/components/pages/applications/midi-looper/quantize.ts`
- Test: `src/app/components/pages/applications/midi-looper/quantize.spec.ts`

**Interfaces:**
- Produces: `Instrument` type (`"sine" | "square" | "sawtooth" | "triangle"`), `Note` interface (`pitch: number`, `startBeat: number`, `durationBeats: number`, `velocity: number`), `Track` interface (`name: string`, `instrument: Instrument`, `loopLengthBeats: number`, `notes: Note[]`), `Project` interface (`tempo: number`, `tracks: Track[]`). Produces `quantizeBeat(beat: number, stepsPerBeat: number): number` and `wrapToLoop(beat: number, loopLengthBeats: number): number`.

- [ ] **Step 1: Write the failing test**

```ts
// src/app/components/pages/applications/midi-looper/quantize.spec.ts
import { quantizeBeat, wrapToLoop } from "./quantize";

describe("quantizeBeat", () => {
  it("snaps to the nearest 16th-note step (4 steps per beat)", () => {
    expect(quantizeBeat(0.42, 4)).toBeCloseTo(0.5, 10);
    expect(quantizeBeat(0.05, 4)).toBeCloseTo(0, 10);
  });

  it("snaps to the nearest quarter-note step (1 step per beat)", () => {
    expect(quantizeBeat(1.1, 1)).toBeCloseTo(1, 10);
    expect(quantizeBeat(1.6, 1)).toBeCloseTo(2, 10);
  });
});

describe("wrapToLoop", () => {
  it("wraps a beat position that has passed the loop end", () => {
    expect(wrapToLoop(5, 4)).toBeCloseTo(1, 10);
  });

  it("wraps a negative beat position into the loop", () => {
    expect(wrapToLoop(-1, 4)).toBeCloseTo(3, 10);
  });

  it("leaves an in-range beat position unchanged", () => {
    expect(wrapToLoop(2.5, 4)).toBeCloseTo(2.5, 10);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx ng test --watch=false --include=**/quantize.spec.ts`
Expected: FAIL — `Cannot find module './quantize'` (file doesn't exist yet).

- [ ] **Step 3: Write the models and implementation**

```ts
// src/app/components/pages/applications/midi-looper/models.ts
export type Instrument = "sine" | "square" | "sawtooth" | "triangle";

export interface Note {
  pitch: number;          // MIDI note number, 0-127
  startBeat: number;       // position within the track's own loop, in beats
  durationBeats: number;
  velocity: number;        // 0-127
}

export interface Track {
  name: string;
  instrument: Instrument;
  loopLengthBeats: number;
  notes: Note[];
}

export interface Project {
  tempo: number; // BPM, shared by all tracks
  tracks: Track[];
}
```

```ts
// src/app/components/pages/applications/midi-looper/quantize.ts
export function quantizeBeat(beat: number, stepsPerBeat: number): number {
  const stepSize = 1 / stepsPerBeat;
  return Math.round(beat / stepSize) * stepSize;
}

export function wrapToLoop(beat: number, loopLengthBeats: number): number {
  const wrapped = beat % loopLengthBeats;
  return wrapped < 0 ? wrapped + loopLengthBeats : wrapped;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx ng test --watch=false --include=**/quantize.spec.ts`
Expected: PASS (6 specs)

- [ ] **Step 5: Commit**

```bash
git add src/app/components/pages/applications/midi-looper/models.ts src/app/components/pages/applications/midi-looper/quantize.ts src/app/components/pages/applications/midi-looper/quantize.spec.ts
git commit -m "feat: add midi looper data model and quantization utilities"
```

---

### Task 2: Scheduling math and MidiLooperAudioService

**Files:**
- Create: `src/app/components/pages/applications/midi-looper/scheduling.ts`
- Create: `src/app/components/pages/applications/midi-looper/midi-looper-audio.service.ts`
- Test: `src/app/components/pages/applications/midi-looper/scheduling.spec.ts`

**Interfaces:**
- Consumes: `Instrument`, `Track`, `Note` from `./models` (Task 1).
- Produces: `computeNoteOccurrences(noteStartBeats: number, loopLengthBeats: number, tempo: number, windowStartSec: number, windowEndSec: number): number[]`, `pitchToFrequency(pitch: number): number`, `MidiLooperAudioService` class (`providedIn: "root"`) with methods `start(tracks: Track[], tempo: number): void`, `stop(): void`, `playImmediate(instrument: Instrument, pitch: number, velocity: number, durationSec?: number): void`. Later tasks (8) call `start`, `stop`, and `playImmediate` on an injected `MidiLooperAudioService`.

- [ ] **Step 1: Write the failing test**

```ts
// src/app/components/pages/applications/midi-looper/scheduling.spec.ts
import { computeNoteOccurrences, pitchToFrequency } from "./scheduling";

describe("computeNoteOccurrences", () => {
  it("returns the single occurrence inside a one-shot window", () => {
    // tempo 120 => 0.5 sec/beat. note at beat 2 => 1.0s. loop is 4 beats => 2.0s.
    const times = computeNoteOccurrences(2, 4, 120, 0, 1.5);
    expect(times).toEqual([1.0]);
  });

  it("returns every repeat of the note that falls inside a wider window", () => {
    const times = computeNoteOccurrences(0, 4, 120, 0, 5.0);
    // loop is 2.0s long, note at beat 0 => occurs at 0, 2, 4
    expect(times).toEqual([0, 2.0, 4.0]);
  });

  it("returns an empty array when the loop length is zero", () => {
    expect(computeNoteOccurrences(0, 0, 120, 0, 5.0)).toEqual([]);
  });

  it("does not return occurrences before the window start", () => {
    const times = computeNoteOccurrences(0, 4, 120, 2.5, 5.0);
    expect(times).toEqual([4.0]);
  });
});

describe("pitchToFrequency", () => {
  it("returns 440Hz for MIDI pitch 69 (A4)", () => {
    expect(pitchToFrequency(69)).toBeCloseTo(440, 5);
  });

  it("returns 220Hz for MIDI pitch 57 (A3, one octave down)", () => {
    expect(pitchToFrequency(57)).toBeCloseTo(220, 5);
  });

  it("returns middle C (~261.63Hz) for MIDI pitch 60", () => {
    expect(pitchToFrequency(60)).toBeCloseTo(261.63, 1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx ng test --watch=false --include=**/scheduling.spec.ts`
Expected: FAIL — `Cannot find module './scheduling'`

- [ ] **Step 3: Write the implementation**

```ts
// src/app/components/pages/applications/midi-looper/scheduling.ts

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
```

```ts
// src/app/components/pages/applications/midi-looper/midi-looper-audio.service.ts
import { Injectable } from "@angular/core";
import { Instrument, Track } from "./models";
import { computeNoteOccurrences, pitchToFrequency } from "./scheduling";

@Injectable({
  providedIn: "root"
})
export class MidiLooperAudioService {

  private audioContext: AudioContext | null = null;
  private schedulerTimer: ReturnType<typeof setInterval> | null = null;
  private startContextTime = 0;
  private tempo = 120;
  private tracks: Track[] = [];

  private readonly lookaheadMs = 25;
  private readonly scheduleAheadSec = 0.1;

  private ensureContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
    return this.audioContext;
  }

  start(tracks: Track[], tempo: number): void {
    const ctx = this.ensureContext();
    if (ctx.state === "suspended") ctx.resume();
    this.tracks = tracks;
    this.tempo = tempo;
    this.startContextTime = ctx.currentTime;
    if (this.schedulerTimer) clearInterval(this.schedulerTimer);
    this.schedulerTimer = setInterval(() => this.tick(), this.lookaheadMs);
  }

  stop(): void {
    if (this.schedulerTimer) {
      clearInterval(this.schedulerTimer);
      this.schedulerTimer = null;
    }
  }

  playImmediate(instrument: Instrument, pitch: number, velocity: number, durationSec: number = 0.3): void {
    const ctx = this.ensureContext();
    if (ctx.state === "suspended") ctx.resume();
    this.playNote(instrument, pitch, velocity, ctx.currentTime, durationSec);
  }

  private tick(): void {
    const ctx = this.ensureContext();
    const elapsed = ctx.currentTime - this.startContextTime;
    const windowEnd = elapsed + this.scheduleAheadSec;
    for (const track of this.tracks) {
      for (const note of track.notes) {
        const times = computeNoteOccurrences(note.startBeat, track.loopLengthBeats, this.tempo, elapsed, windowEnd);
        const durationSec = (note.durationBeats / this.tempo) * 60;
        for (const t of times) {
          this.playNote(track.instrument, note.pitch, note.velocity, this.startContextTime + t, durationSec);
        }
      }
    }
  }

  private playNote(instrument: Instrument, pitch: number, velocity: number, when: number, durationSec: number): void {
    const ctx = this.ensureContext();
    const osc = ctx.createOscillator();
    osc.type = instrument;
    osc.frequency.value = pitchToFrequency(pitch);

    const gain = ctx.createGain();
    const peak = Math.max(0, Math.min(1, velocity / 127));
    const sustainUntil = Math.max(when, when + durationSec - 0.01);
    gain.gain.setValueAtTime(0, when);
    gain.gain.linearRampToValueAtTime(peak, when + 0.01);
    gain.gain.setValueAtTime(peak, sustainUntil);
    gain.gain.linearRampToValueAtTime(0, when + durationSec);

    osc.connect(gain).connect(ctx.destination);
    osc.start(when);
    osc.stop(when + durationSec + 0.02);
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx ng test --watch=false --include=**/scheduling.spec.ts`
Expected: PASS (7 specs)

- [ ] **Step 5: Commit**

```bash
git add src/app/components/pages/applications/midi-looper/scheduling.ts src/app/components/pages/applications/midi-looper/scheduling.spec.ts src/app/components/pages/applications/midi-looper/midi-looper-audio.service.ts
git commit -m "feat: add midi looper scheduling math and audio playback service"
```

---

### Task 3: WebMidiService

**Files:**
- Create: `src/app/components/pages/applications/midi-looper/web-midi.service.ts`
- Test: `src/app/components/pages/applications/midi-looper/web-midi.service.spec.ts`

**Interfaces:**
- Produces: `MidiNoteEvent` interface (`pitch: number`, `velocity: number`, `type: "on" | "off"`), `WebMidiService` class (`providedIn: "root"`) with `isSupported(): boolean`, `connect(): Observable<boolean>`, `notes(): Observable<MidiNoteEvent>`, and a public `handleMessage(data: number[] | Uint8Array): void` used both internally (wired to real MIDI input ports in `connect()`) and directly by tests. Task 8 subscribes to `notes()` and calls `isSupported()`/`connect()`.

- [ ] **Step 1: Write the failing test**

```ts
// src/app/components/pages/applications/midi-looper/web-midi.service.spec.ts
import { WebMidiService, MidiNoteEvent } from "./web-midi.service";

describe("WebMidiService", () => {

  let service: WebMidiService;

  beforeEach(() => {
    service = new WebMidiService();
  });

  describe("isSupported", () => {
    it("returns true when navigator.requestMIDIAccess exists", () => {
      (navigator as any).requestMIDIAccess = () => Promise.resolve({});
      expect(service.isSupported()).toBe(true);
      delete (navigator as any).requestMIDIAccess;
    });

    it("returns false when navigator.requestMIDIAccess is absent", () => {
      delete (navigator as any).requestMIDIAccess;
      expect(service.isSupported()).toBe(false);
    });
  });

  describe("handleMessage", () => {
    it("emits a note-on event for a note-on message with velocity > 0", (done) => {
      service.notes().subscribe((event: MidiNoteEvent) => {
        expect(event).toEqual({ pitch: 60, velocity: 100, type: "on" });
        done();
      });
      service.handleMessage([0x90, 60, 100]);
    });

    it("emits a note-off event for a note-on message with velocity 0", (done) => {
      service.notes().subscribe((event: MidiNoteEvent) => {
        expect(event).toEqual({ pitch: 60, velocity: 0, type: "off" });
        done();
      });
      service.handleMessage([0x90, 60, 0]);
    });

    it("emits a note-off event for a note-off status byte", (done) => {
      service.notes().subscribe((event: MidiNoteEvent) => {
        expect(event).toEqual({ pitch: 64, velocity: 0, type: "off" });
        done();
      });
      service.handleMessage([0x80, 64, 0]);
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx ng test --watch=false --include=**/web-midi.service.spec.ts`
Expected: FAIL — `Cannot find module './web-midi.service'`

- [ ] **Step 3: Write the implementation**

```ts
// src/app/components/pages/applications/midi-looper/web-midi.service.ts
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

export interface MidiNoteEvent {
  pitch: number;
  velocity: number;
  type: "on" | "off";
}

@Injectable({
  providedIn: "root"
})
export class WebMidiService {

  private noteEvents$ = new Subject<MidiNoteEvent>();

  isSupported(): boolean {
    return typeof navigator !== "undefined" && !!(navigator as any).requestMIDIAccess;
  }

  connect(): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      if (!this.isSupported()) {
        subscriber.next(false);
        subscriber.complete();
        return;
      }
      (navigator as any).requestMIDIAccess().then((access: any) => {
        access.inputs.forEach((input: any) => {
          input.onmidimessage = (message: any) => this.handleMessage(message.data);
        });
        subscriber.next(true);
        subscriber.complete();
      }).catch(() => {
        subscriber.next(false);
        subscriber.complete();
      });
    });
  }

  notes(): Observable<MidiNoteEvent> {
    return this.noteEvents$.asObservable();
  }

  handleMessage(data: number[] | Uint8Array): void {
    const status = data[0];
    const pitch = data[1];
    const velocity = data[2];
    const command = status & 0xf0;
    if (command === 0x90 && velocity > 0) {
      this.noteEvents$.next({ pitch, velocity, type: "on" });
    } else if (command === 0x80 || (command === 0x90 && velocity === 0)) {
      this.noteEvents$.next({ pitch, velocity, type: "off" });
    }
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx ng test --watch=false --include=**/web-midi.service.spec.ts`
Expected: PASS (5 specs)

- [ ] **Step 5: Commit**

```bash
git add src/app/components/pages/applications/midi-looper/web-midi.service.ts src/app/components/pages/applications/midi-looper/web-midi.service.spec.ts
git commit -m "feat: add WebMidiService for live MIDI note input"
```

---

### Task 4: MidiLooperFileService (export/import)

**Files:**
- Create: `src/app/components/pages/applications/midi-looper/midi-looper-file.service.ts`
- Test: `src/app/components/pages/applications/midi-looper/midi-looper-file.service.spec.ts`

**Interfaces:**
- Consumes: `Project`, `Track`, `Note` from `./models` (Task 1).
- Produces: `InvalidProjectFileError` class, `MidiLooperFileService` class (`providedIn: "root"`) with `exportProject(project: Project): void`, `parseProject(json: string): Project` (throws `InvalidProjectFileError`), and `importProject(file: File): Promise<Project>`. Task 8 calls `exportProject` and `importProject`.

- [ ] **Step 1: Write the failing test**

```ts
// src/app/components/pages/applications/midi-looper/midi-looper-file.service.spec.ts
import { MidiLooperFileService, InvalidProjectFileError } from "./midi-looper-file.service";
import { Project } from "./models";

describe("MidiLooperFileService", () => {

  let service: MidiLooperFileService;
  const validProject: Project = {
    tempo: 120,
    tracks: [
      {
        name: "Track 1",
        instrument: "sine",
        loopLengthBeats: 16,
        notes: [{ pitch: 60, startBeat: 0, durationBeats: 1, velocity: 100 }]
      }
    ]
  };

  beforeEach(() => {
    service = new MidiLooperFileService();
  });

  describe("parseProject", () => {
    it("parses a valid project JSON string", () => {
      const parsed = service.parseProject(JSON.stringify(validProject));
      expect(parsed).toEqual(validProject);
    });

    it("throws InvalidProjectFileError for malformed JSON", () => {
      expect(() => service.parseProject("{not json")).toThrowError(InvalidProjectFileError);
    });

    it("throws InvalidProjectFileError when tempo is missing", () => {
      const bad = { tracks: validProject.tracks };
      expect(() => service.parseProject(JSON.stringify(bad))).toThrowError(InvalidProjectFileError);
    });

    it("throws InvalidProjectFileError when a track has an invalid instrument", () => {
      const bad = {
        tempo: 120,
        tracks: [{ name: "T", instrument: "banjo", loopLengthBeats: 4, notes: [] }]
      };
      expect(() => service.parseProject(JSON.stringify(bad))).toThrowError(InvalidProjectFileError);
    });

    it("throws InvalidProjectFileError when a note has an out-of-range pitch", () => {
      const bad = {
        tempo: 120,
        tracks: [{
          name: "T", instrument: "sine", loopLengthBeats: 4,
          notes: [{ pitch: 200, startBeat: 0, durationBeats: 1, velocity: 100 }]
        }]
      };
      expect(() => service.parseProject(JSON.stringify(bad))).toThrowError(InvalidProjectFileError);
    });
  });

  describe("importProject", () => {
    it("resolves a valid project from a File", async () => {
      const file = new File([JSON.stringify(validProject)], "project.json", { type: "application/json" });
      const parsed = await service.importProject(file);
      expect(parsed).toEqual(validProject);
    });

    it("rejects with InvalidProjectFileError for an invalid file", async () => {
      const file = new File(["not json"], "project.json", { type: "application/json" });
      await expectAsync(service.importProject(file)).toBeRejectedWithError(InvalidProjectFileError);
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx ng test --watch=false --include=**/midi-looper-file.service.spec.ts`
Expected: FAIL — `Cannot find module './midi-looper-file.service'`

- [ ] **Step 3: Write the implementation**

```ts
// src/app/components/pages/applications/midi-looper/midi-looper-file.service.ts
import { Injectable } from "@angular/core";
import { Instrument, Note, Project, Track } from "./models";

export class InvalidProjectFileError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidProjectFileError";
  }
}

const VALID_INSTRUMENTS: Instrument[] = ["sine", "square", "sawtooth", "triangle"];

@Injectable({
  providedIn: "root"
})
export class MidiLooperFileService {

  exportProject(project: Project): void {
    const json = JSON.stringify(project, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "midi-looper-project.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  parseProject(json: string): Project {
    let parsed: any;
    try {
      parsed = JSON.parse(json);
    } catch {
      throw new InvalidProjectFileError("File is not valid JSON.");
    }
    if (!this.isValidProject(parsed)) {
      throw new InvalidProjectFileError("File does not match the expected project format.");
    }
    return parsed as Project;
  }

  async importProject(file: File): Promise<Project> {
    const text = await file.text();
    return this.parseProject(text);
  }

  private isValidProject(value: any): value is Project {
    if (!value || typeof value.tempo !== "number" || value.tempo <= 0) return false;
    if (!Array.isArray(value.tracks)) return false;
    return value.tracks.every((track: any) => this.isValidTrack(track));
  }

  private isValidTrack(track: any): track is Track {
    if (!track || typeof track.name !== "string") return false;
    if (!VALID_INSTRUMENTS.includes(track.instrument)) return false;
    if (typeof track.loopLengthBeats !== "number" || track.loopLengthBeats <= 0) return false;
    if (!Array.isArray(track.notes)) return false;
    return track.notes.every((note: any) => this.isValidNote(note));
  }

  private isValidNote(note: any): note is Note {
    return !!note
      && typeof note.pitch === "number" && note.pitch >= 0 && note.pitch <= 127
      && typeof note.startBeat === "number" && note.startBeat >= 0
      && typeof note.durationBeats === "number" && note.durationBeats > 0
      && typeof note.velocity === "number" && note.velocity >= 0 && note.velocity <= 127;
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx ng test --watch=false --include=**/midi-looper-file.service.spec.ts`
Expected: PASS (7 specs)

- [ ] **Step 5: Commit**

```bash
git add src/app/components/pages/applications/midi-looper/midi-looper-file.service.ts src/app/components/pages/applications/midi-looper/midi-looper-file.service.spec.ts
git commit -m "feat: add MidiLooperFileService for project export/import"
```

---

### Task 5: VirtualKeyboardComponent

**Files:**
- Create: `src/app/components/pages/applications/midi-looper/virtual-keyboard/virtual-keyboard.component.ts`
- Create: `src/app/components/pages/applications/midi-looper/virtual-keyboard/virtual-keyboard.component.html`
- Test: `src/app/components/pages/applications/midi-looper/virtual-keyboard/virtual-keyboard.component.spec.ts`

**Interfaces:**
- Produces: `VirtualKeyboardComponent` (selector `app-virtual-keyboard`) with `@Input() baseOctave: number` (default 4), `@Output() noteOn: EventEmitter<number>`, `@Output() noteOff: EventEmitter<number>`, method `shiftOctave(delta: number): void`, getter `keys: { pitch: number; isBlack: boolean; label: string }[]` (24 keys, 2 octaves). Task 8 listens to `(noteOn)`/`(noteOff)` on `<app-virtual-keyboard>`.

- [ ] **Step 1: Write the failing test**

```ts
// src/app/components/pages/applications/midi-looper/virtual-keyboard/virtual-keyboard.component.spec.ts
import { VirtualKeyboardComponent } from "./virtual-keyboard.component";

describe("VirtualKeyboardComponent", () => {

  let component: VirtualKeyboardComponent;

  beforeEach(() => {
    component = new VirtualKeyboardComponent();
  });

  it("is created", () => {
    expect(component).toBeTruthy();
  });

  describe("keys", () => {
    it("returns 24 keys starting at C of the base octave", () => {
      component.baseOctave = 4;
      const keys = component.keys;
      expect(keys.length).toBe(24);
      expect(keys[0]).toEqual({ pitch: 60, isBlack: false, label: "C4" });
    });

    it("marks sharps as black keys", () => {
      component.baseOctave = 4;
      const cSharp = component.keys[1];
      expect(cSharp).toEqual({ pitch: 61, isBlack: true, label: "C#4" });
    });
  });

  describe("shiftOctave", () => {
    it("increases the base octave", () => {
      component.baseOctave = 4;
      component.shiftOctave(1);
      expect(component.baseOctave).toBe(5);
    });

    it("does not go below octave 0", () => {
      component.baseOctave = 0;
      component.shiftOctave(-1);
      expect(component.baseOctave).toBe(0);
    });

    it("does not go above octave 8", () => {
      component.baseOctave = 8;
      component.shiftOctave(1);
      expect(component.baseOctave).toBe(8);
    });
  });

  describe("press / release", () => {
    it("emits noteOn with the pressed pitch", () => {
      const emitted: number[] = [];
      component.noteOn.subscribe((pitch: number) => emitted.push(pitch));
      component.press(60);
      expect(emitted).toEqual([60]);
    });

    it("emits noteOff with the released pitch", () => {
      const emitted: number[] = [];
      component.noteOff.subscribe((pitch: number) => emitted.push(pitch));
      component.release(60);
      expect(emitted).toEqual([60]);
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx ng test --watch=false --include=**/virtual-keyboard.component.spec.ts`
Expected: FAIL — `Cannot find module './virtual-keyboard.component'`

- [ ] **Step 3: Write the implementation**

```ts
// src/app/components/pages/applications/midi-looper/virtual-keyboard/virtual-keyboard.component.ts
import { Component, EventEmitter, Input, Output } from "@angular/core";

interface KeyDef {
  pitch: number;
  isBlack: boolean;
  label: string;
}

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

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
      keys.push({ pitch, isBlack: name.includes("#"), label: name + octave });
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
```

```html
<!-- src/app/components/pages/applications/midi-looper/virtual-keyboard/virtual-keyboard.component.html -->
<div class="virtual-keyboard">
  <button type="button" (click)="shiftOctave(-1)">Octave -</button>
  <span>Octave: {{ baseOctave }}</span>
  <button type="button" (click)="shiftOctave(1)">Octave +</button>
  <div class="keys" style="display:flex;">
    <button type="button" *ngFor="let key of keys"
      [style.background]="key.isBlack ? 'black' : 'white'"
      [style.color]="key.isBlack ? 'white' : 'black'"
      (mousedown)="press(key.pitch)" (mouseup)="release(key.pitch)" (mouseleave)="release(key.pitch)">
      {{ key.label }}
    </button>
  </div>
</div>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx ng test --watch=false --include=**/virtual-keyboard.component.spec.ts`
Expected: PASS (7 specs)

- [ ] **Step 5: Commit**

```bash
git add src/app/components/pages/applications/midi-looper/virtual-keyboard/
git commit -m "feat: add VirtualKeyboardComponent for on-screen note input"
```

---

### Task 6: PianoRollComponent

**Files:**
- Create: `src/app/components/pages/applications/midi-looper/piano-roll/piano-roll.component.ts`
- Create: `src/app/components/pages/applications/midi-looper/piano-roll/piano-roll.component.html`
- Test: `src/app/components/pages/applications/midi-looper/piano-roll/piano-roll.component.spec.ts`

**Interfaces:**
- Consumes: `Track` from `../models` (Task 1), `quantizeBeat` from `../quantize` (Task 1).
- Produces: `PianoRollComponent` (selector `app-piano-roll`) with `@Input() track: Track`, `@Input() gridResolutionStepsPerBeat: number` (default 4), `@Output() noteToggled: EventEmitter<{ pitch: number; startBeat: number }>`, methods `stepIndices(): number[]`, `stepStartBeat(stepIndex: number): number`, `isNoteActive(pitch: number, stepIndex: number): boolean`, `toggleCell(pitch: number, stepIndex: number): void`. Task 8 listens to `(noteToggled)` on `<app-piano-roll>` and owns adding/removing the note.

- [ ] **Step 1: Write the failing test**

```ts
// src/app/components/pages/applications/midi-looper/piano-roll/piano-roll.component.spec.ts
import { PianoRollComponent } from "./piano-roll.component";
import { Track } from "../models";

describe("PianoRollComponent", () => {

  let component: PianoRollComponent;
  let track: Track;

  beforeEach(() => {
    component = new PianoRollComponent();
    track = { name: "T", instrument: "sine", loopLengthBeats: 4, notes: [] };
    component.track = track;
    component.gridResolutionStepsPerBeat = 4;
  });

  it("is created", () => {
    expect(component).toBeTruthy();
  });

  describe("stepIndices", () => {
    it("returns one index per 16th-note step across the loop", () => {
      expect(component.stepIndices().length).toBe(16); // 4 beats * 4 steps/beat
      expect(component.stepIndices()[0]).toBe(0);
      expect(component.stepIndices()[15]).toBe(15);
    });
  });

  describe("stepStartBeat", () => {
    it("converts a step index into a beat position", () => {
      expect(component.stepStartBeat(0)).toBe(0);
      expect(component.stepStartBeat(4)).toBe(1);
      expect(component.stepStartBeat(6)).toBe(1.5);
    });
  });

  describe("isNoteActive", () => {
    it("returns true when a note exists at that pitch/step", () => {
      track.notes.push({ pitch: 60, startBeat: 1, durationBeats: 0.25, velocity: 100 });
      expect(component.isNoteActive(60, 4)).toBe(true);
    });

    it("returns false when no note exists at that pitch/step", () => {
      expect(component.isNoteActive(60, 4)).toBe(false);
    });
  });

  describe("toggleCell", () => {
    it("emits the pitch and quantized start beat for the clicked cell", () => {
      const emitted: { pitch: number; startBeat: number }[] = [];
      component.noteToggled.subscribe(e => emitted.push(e));
      component.toggleCell(64, 6);
      expect(emitted).toEqual([{ pitch: 64, startBeat: 1.5 }]);
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx ng test --watch=false --include=**/piano-roll.component.spec.ts`
Expected: FAIL — `Cannot find module './piano-roll.component'`

- [ ] **Step 3: Write the implementation**

```ts
// src/app/components/pages/applications/midi-looper/piano-roll/piano-roll.component.ts
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Track } from "../models";
import { quantizeBeat } from "../quantize";

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
}
```

```html
<!-- src/app/components/pages/applications/midi-looper/piano-roll/piano-roll.component.html -->
<div class="piano-roll" style="overflow:auto; max-height:400px;">
  <table>
    <tr *ngFor="let pitch of pitches">
      <td class="pitch-label">{{ pitch }}</td>
      <td *ngFor="let step of stepIndices()"
          [style.background]="isNoteActive(pitch, step) ? 'purple' : 'transparent'"
          style="border:1px solid #ccc; width:16px; height:14px; cursor:pointer;"
          (click)="toggleCell(pitch, step)">
      </td>
    </tr>
  </table>
</div>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx ng test --watch=false --include=**/piano-roll.component.spec.ts`
Expected: PASS (7 specs)

- [ ] **Step 5: Commit**

```bash
git add src/app/components/pages/applications/midi-looper/piano-roll/
git commit -m "feat: add PianoRollComponent for click-to-draw note grid"
```

---

### Task 7: TrackListComponent

**Files:**
- Create: `src/app/components/pages/applications/midi-looper/track-list/track-list.component.ts`
- Create: `src/app/components/pages/applications/midi-looper/track-list/track-list.component.html`
- Test: `src/app/components/pages/applications/midi-looper/track-list/track-list.component.spec.ts`

**Interfaces:**
- Consumes: `Instrument`, `Track` from `../models` (Task 1).
- Produces: `TrackListComponent` (selector `app-track-list`) with `@Input() tracks: Track[]`, `@Input() selectedIndex: number`, `@Output() selectedIndexChange: EventEmitter<number>`, `@Output() trackAdded: EventEmitter<void>`, `@Output() trackRemoved: EventEmitter<number>`, `@Output() instrumentChanged: EventEmitter<{ index: number; instrument: Instrument }>`, `@Output() loopLengthChanged: EventEmitter<{ index: number; loopLengthBeats: number }>`, readonly `instruments: Instrument[]`, methods `select`, `addTrack`, `removeTrack`, `changeInstrument`, `changeLoopLength`. Task 8 listens to all five outputs on `<app-track-list>`.

- [ ] **Step 1: Write the failing test**

```ts
// src/app/components/pages/applications/midi-looper/track-list/track-list.component.spec.ts
import { TrackListComponent } from "./track-list.component";
import { Track } from "../models";

describe("TrackListComponent", () => {

  let component: TrackListComponent;

  beforeEach(() => {
    component = new TrackListComponent();
    component.tracks = [
      { name: "Track 1", instrument: "sine", loopLengthBeats: 16, notes: [] }
    ] as Track[];
    component.selectedIndex = 0;
  });

  it("is created", () => {
    expect(component).toBeTruthy();
  });

  it("emits selectedIndexChange when a track is selected", () => {
    const emitted: number[] = [];
    component.selectedIndexChange.subscribe(i => emitted.push(i));
    component.select(0);
    expect(emitted).toEqual([0]);
  });

  it("emits trackAdded when a track is added", () => {
    let calls = 0;
    component.trackAdded.subscribe(() => calls++);
    component.addTrack();
    expect(calls).toBe(1);
  });

  it("emits trackRemoved with the index when a track is removed", () => {
    const emitted: number[] = [];
    component.trackRemoved.subscribe(i => emitted.push(i));
    component.removeTrack(0);
    expect(emitted).toEqual([0]);
  });

  it("emits instrumentChanged with the index and new instrument", () => {
    const emitted: { index: number; instrument: string }[] = [];
    component.instrumentChanged.subscribe(e => emitted.push(e));
    component.changeInstrument(0, "square");
    expect(emitted).toEqual([{ index: 0, instrument: "square" }]);
  });

  describe("changeLoopLength", () => {
    it("emits loopLengthChanged for a positive value", () => {
      const emitted: { index: number; loopLengthBeats: number }[] = [];
      component.loopLengthChanged.subscribe(e => emitted.push(e));
      component.changeLoopLength(0, 8);
      expect(emitted).toEqual([{ index: 0, loopLengthBeats: 8 }]);
    });

    it("does not emit for a zero or negative value", () => {
      let calls = 0;
      component.loopLengthChanged.subscribe(() => calls++);
      component.changeLoopLength(0, 0);
      component.changeLoopLength(0, -4);
      expect(calls).toBe(0);
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx ng test --watch=false --include=**/track-list.component.spec.ts`
Expected: FAIL — `Cannot find module './track-list.component'`

- [ ] **Step 3: Write the implementation**

```ts
// src/app/components/pages/applications/midi-looper/track-list/track-list.component.ts
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
  @Output() trackAdded = new EventEmitter<void>();
  @Output() trackRemoved = new EventEmitter<number>();
  @Output() instrumentChanged = new EventEmitter<{ index: number; instrument: Instrument }>();
  @Output() loopLengthChanged = new EventEmitter<{ index: number; loopLengthBeats: number }>();

  readonly instruments: Instrument[] = ["sine", "square", "sawtooth", "triangle"];

  select(index: number): void {
    this.selectedIndexChange.emit(index);
  }

  addTrack(): void {
    this.trackAdded.emit();
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
```

```html
<!-- src/app/components/pages/applications/midi-looper/track-list/track-list.component.html -->
<div class="track-list">
  <div *ngFor="let track of tracks; let i = index" style="display:flex; gap:8px; align-items:center;">
    <button type="button" [style.fontWeight]="i === selectedIndex ? 'bold' : 'normal'" (click)="select(i)">
      {{ track.name }}
    </button>
    <select [ngModel]="track.instrument" (ngModelChange)="changeInstrument(i, $event)">
      <option *ngFor="let inst of instruments" [ngValue]="inst">{{ inst }}</option>
    </select>
    <label>
      Loop length (beats):
      <input type="number" min="1" [ngModel]="track.loopLengthBeats"
        (ngModelChange)="changeLoopLength(i, $event)" />
    </label>
    <button type="button" (click)="removeTrack(i)" [disabled]="tracks.length <= 1">Remove</button>
  </div>
  <button type="button" (click)="addTrack()">+ Add Track</button>
</div>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx ng test --watch=false --include=**/track-list.component.spec.ts`
Expected: PASS (6 specs)

- [ ] **Step 5: Commit**

```bash
git add src/app/components/pages/applications/midi-looper/track-list/
git commit -m "feat: add TrackListComponent for managing looper tracks"
```

---

### Task 8: MidiLooperComponent (container)

**Files:**
- Create: `src/app/components/pages/applications/midi-looper/midi-looper.component.ts`
- Create: `src/app/components/pages/applications/midi-looper/midi-looper.component.html`
- Test: `src/app/components/pages/applications/midi-looper/midi-looper.component.spec.ts`

**Interfaces:**
- Consumes: `Project`, `Track`, `Instrument` from `./models`; `quantizeBeat`, `wrapToLoop` from `./quantize`; `MidiLooperAudioService` from `./midi-looper-audio.service`; `WebMidiService`, `MidiNoteEvent` from `./web-midi.service`; `MidiLooperFileService`, `InvalidProjectFileError` from `./midi-looper-file.service`.
- Produces: `MidiLooperComponent` (selector `app-midi-looper`), the top-level component later tasks (9) reference by selector in `db.json`/`applications.component.html`.

- [ ] **Step 1: Write the failing test**

```ts
// src/app/components/pages/applications/midi-looper/midi-looper.component.spec.ts
import { of } from "rxjs";
import { MidiLooperComponent } from "./midi-looper.component";
import { MidiLooperAudioService } from "./midi-looper-audio.service";
import { WebMidiService } from "./web-midi.service";
import { MidiLooperFileService, InvalidProjectFileError } from "./midi-looper-file.service";

describe("MidiLooperComponent", () => {

  let component: MidiLooperComponent;
  let audioService: jasmine.SpyObj<MidiLooperAudioService>;
  let webMidiService: jasmine.SpyObj<WebMidiService>;
  let fileService: jasmine.SpyObj<MidiLooperFileService>;

  beforeEach(() => {
    audioService = jasmine.createSpyObj("MidiLooperAudioService", ["start", "stop", "playImmediate"]);
    webMidiService = jasmine.createSpyObj("WebMidiService", ["isSupported", "connect", "notes"]);
    webMidiService.isSupported.and.returnValue(false);
    webMidiService.notes.and.returnValue(of());
    fileService = jasmine.createSpyObj("MidiLooperFileService", ["exportProject", "importProject"]);

    component = new MidiLooperComponent(audioService, webMidiService, fileService, { detectChanges: () => { } } as any);
    component.ngOnInit();
  });

  it("is created with one default track selected", () => {
    expect(component.project.tracks.length).toBe(1);
    expect(component.selectedTrackIndex).toBe(0);
  });

  describe("addTrack / removeTrack", () => {
    it("adds a new track and selects it", () => {
      component.addTrack();
      expect(component.project.tracks.length).toBe(2);
      expect(component.selectedTrackIndex).toBe(1);
    });

    it("does not remove the last remaining track", () => {
      component.removeTrack(0);
      expect(component.project.tracks.length).toBe(1);
    });

    it("removes a track and re-selects a valid index", () => {
      component.addTrack();
      component.removeTrack(1);
      expect(component.project.tracks.length).toBe(1);
      expect(component.selectedTrackIndex).toBe(0);
    });
  });

  describe("onGridToggle", () => {
    it("adds a note when none exists at that pitch/beat", () => {
      component.onGridToggle({ pitch: 60, startBeat: 1 });
      expect(component.project.tracks[0].notes.length).toBe(1);
      expect(component.project.tracks[0].notes[0]).toEqual({ pitch: 60, startBeat: 1, durationBeats: 0.25, velocity: 100 });
    });

    it("removes the note when one already exists at that pitch/beat", () => {
      component.onGridToggle({ pitch: 60, startBeat: 1 });
      component.onGridToggle({ pitch: 60, startBeat: 1 });
      expect(component.project.tracks[0].notes.length).toBe(0);
    });
  });

  describe("onLiveNoteOn", () => {
    it("always plays an immediate preview", () => {
      component.onLiveNoteOn(60);
      expect(audioService.playImmediate).toHaveBeenCalledWith("sine", 60, 100);
    });

    it("does not record a note when not recording", () => {
      component.onLiveNoteOn(60);
      expect(component.project.tracks[0].notes.length).toBe(0);
    });

    it("records an overdubbed note onto the selected track when recording", () => {
      component.isPlaying = true;
      component.isRecording = true;
      component.transportStartMs = performance.now();
      component.onLiveNoteOn(60);
      expect(component.project.tracks[0].notes.length).toBe(1);
    });
  });

  describe("play / stop / toggleRecord", () => {
    it("starts playback", () => {
      component.play();
      expect(audioService.start).toHaveBeenCalledWith(component.project.tracks, component.project.tempo);
      expect(component.isPlaying).toBe(true);
    });

    it("stops playback and recording", () => {
      component.play();
      component.isRecording = true;
      component.stop();
      expect(audioService.stop).toHaveBeenCalled();
      expect(component.isPlaying).toBe(false);
      expect(component.isRecording).toBe(false);
    });

    it("toggleRecord starts playback if not already playing", () => {
      component.toggleRecord();
      expect(component.isPlaying).toBe(true);
      expect(component.isRecording).toBe(true);
    });
  });

  describe("exportProject", () => {
    it("delegates to the file service", () => {
      component.exportProject();
      expect(fileService.exportProject).toHaveBeenCalledWith(component.project);
    });
  });

  describe("onImportFile", () => {
    it("replaces the project on a successful import", async () => {
      const imported = { tempo: 90, tracks: [{ name: "Imported", instrument: "square" as const, loopLengthBeats: 8, notes: [] }] };
      fileService.importProject.and.returnValue(Promise.resolve(imported));
      await component.onImportFile({} as File);
      expect(component.project).toEqual(imported);
      expect(component.selectedTrackIndex).toBe(0);
      expect(component.importError).toBeNull();
    });

    it("sets importError and keeps the current project on failure", async () => {
      const originalProject = component.project;
      fileService.importProject.and.returnValue(Promise.reject(new InvalidProjectFileError("bad file")));
      await component.onImportFile({} as File);
      expect(component.project).toBe(originalProject);
      expect(component.importError).toBe("bad file");
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx ng test --watch=false --include=**/midi-looper.component.spec.ts`
Expected: FAIL — `Cannot find module './midi-looper.component'`

- [ ] **Step 3: Write the implementation**

```ts
// src/app/components/pages/applications/midi-looper/midi-looper.component.ts
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
    if (this.selectedTrackIndex >= this.project.tracks.length) {
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

  toggleRecord(): void {
    if (!this.isPlaying) this.play();
    this.isRecording = !this.isRecording;
    this.cdr.detectChanges();
  }

  exportProject(): void {
    this.fileService.exportProject(this.project);
  }

  async onImportFile(file: File): Promise<void> {
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
```

```html
<!-- src/app/components/pages/applications/midi-looper/midi-looper.component.html -->
<div class="midi-looper">
  <div class="transport" style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
    <label>Tempo (BPM):
      <input type="number" min="20" max="300" [(ngModel)]="project.tempo" />
    </label>
    <button type="button" (click)="play()" [disabled]="isPlaying">Play</button>
    <button type="button" (click)="stop()" [disabled]="!isPlaying">Stop</button>
    <button type="button" (click)="toggleRecord()">{{ isRecording ? "Stop Recording" : "Record" }}</button>
    <label>Grid:
      <select [(ngModel)]="gridResolutionStepsPerBeat">
        <option [ngValue]="1">4th notes</option>
        <option [ngValue]="2">8th notes</option>
        <option [ngValue]="4">16th notes</option>
        <option [ngValue]="8">32nd notes</option>
      </select>
    </label>
    <button type="button" (click)="exportProject()">Export</button>
    <input type="file" accept="application/json" (change)="handleFileInput($event)" />
    <span *ngIf="importError" style="color:red;">{{ importError }}</span>
    <span *ngIf="!midiSupported">Live MIDI input is not supported in this browser (try Chrome or Edge).</span>
  </div>

  <app-track-list *ngIf="project"
    [tracks]="project.tracks"
    [selectedIndex]="selectedTrackIndex"
    (selectedIndexChange)="selectedTrackIndex = $event"
    (trackAdded)="addTrack()"
    (trackRemoved)="removeTrack($event)"
    (instrumentChanged)="onInstrumentChanged($event)"
    (loopLengthChanged)="onLoopLengthChanged($event)">
  </app-track-list>

  <app-piano-roll *ngIf="project && project.tracks[selectedTrackIndex]"
    [track]="project.tracks[selectedTrackIndex]"
    [gridResolutionStepsPerBeat]="gridResolutionStepsPerBeat"
    (noteToggled)="onGridToggle($event)">
  </app-piano-roll>

  <app-virtual-keyboard (noteOn)="onLiveNoteOn($event)"></app-virtual-keyboard>
</div>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx ng test --watch=false --include=**/midi-looper.component.spec.ts`
Expected: PASS (16 specs)

- [ ] **Step 5: Commit**

```bash
git add src/app/components/pages/applications/midi-looper/midi-looper.component.ts src/app/components/pages/applications/midi-looper/midi-looper.component.html src/app/components/pages/applications/midi-looper/midi-looper.component.spec.ts
git commit -m "feat: add MidiLooperComponent container wiring the looper together"
```

---

### Task 9: Wire the MIDI Looper into the site

**Files:**
- Modify: `src/app/components/pages/applications/index.ts`
- Modify: `src/app/app.module.ts`
- Modify: `src/assets/db.json`
- Modify: `src/app/components/pages/applications/applications.component.html`

**Interfaces:**
- Consumes: `MidiLooperComponent`, `PianoRollComponent`, `VirtualKeyboardComponent`, `TrackListComponent` (Tasks 5-8), all exported from `./midi-looper/...` and re-exported via `applications/index.ts`.

- [ ] **Step 1: Add barrel exports**

```ts
// src/app/components/pages/applications/index.ts
export * from "./betting-calculator/betting-calculator.component";
export * from "./dto-convert/dto-convert.component";
export * from "./final-grade-calculator/final-grade-calculator.component";
export * from "./group-creator/group-creator.component";
export * from "./html-sandbox/html-sandbox.component";
export * from "./midi-looper/midi-looper.component";
export * from "./midi-looper/piano-roll/piano-roll.component";
export * from "./midi-looper/track-list/track-list.component";
export * from "./midi-looper/virtual-keyboard/virtual-keyboard.component";
export * from "./multiplication-table/multiplication-table.component";
export * from "./say2/say2.component";
export * from "./typing-test/typing-test.component";
export * from "./iframe-app.component";
export * from "./applications.component";
```

- [ ] **Step 2: Declare the components in AppModule**

Modify `src/app/app.module.ts` — update the import from `./components/index` and the `declarations` array:

```ts
import {
  // application-structure
  AppComponent, NavbarComponent, FooterComponent, NotFoundComponent,
  // pages
  HomeComponent, VideosComponent, GithubProjectsComponent,
  // applications
  BettingCalculatorComponent, DtoConvertComponent, FinalGradeCalculatorComponent,
  GroupCreatorComponent, HtmlSandboxComponent, MidiLooperComponent, MultiplicationTableComponent,
  PianoRollComponent, Say2Component, TrackListComponent, TypingTestComponent,
  VirtualKeyboardComponent, IFrameAppComponent, ApplicationsComponent,
  // general components
  ListOfLinksComponent
} from "./components/index";
```

```ts
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotFoundComponent,
    HomeComponent,
    FooterComponent,
    ApplicationsComponent,
    VideosComponent,
    GithubProjectsComponent,
    IFrameAppComponent,
    MultiplicationTableComponent,
    FinalGradeCalculatorComponent,
    BettingCalculatorComponent,
    Say2Component,
    GroupCreatorComponent,
    HtmlSandboxComponent,
    TypingTestComponent,
    DtoConvertComponent,
    MidiLooperComponent,
    PianoRollComponent,
    TrackListComponent,
    VirtualKeyboardComponent,
    ListOfLinksComponent
  ],
  // ...imports/providers/bootstrap unchanged
```

- [ ] **Step 3: Register the app in `db.json`**

In `src/assets/db.json`, inside `webApplications.apps` (alphabetically, between the `HTMLSandbox` and `MultiplicationTable` entries), add:

```json
{
  "description": "MidiLooper is a multi-track piano-roll looper. Draw notes on the grid, play them with the on-screen keyboard, or record live input from a MIDI controller, then loop and layer tracks over each other. Export your composition as a JSON file and import it again later.",
  "file": "webapplications/midilooper",
  "name": "MidiLooper",
  "selector": "app-midi-looper"
},
```

- [ ] **Step 4: Render it in the applications page**

In `src/app/components/pages/applications/applications.component.html`, add a line alongside the other selector checks (order doesn't matter functionally, keep alphabetical for readability):

```html
<app-midi-looper *ngIf="webApp.selector === 'app-midi-looper'"></app-midi-looper>
```
placed between the `app-html-sandbox` and `app-multiplication-table` lines.

- [ ] **Step 5: Run the full test suite**

Run: `npx ng test --watch=false`
Expected: PASS — all existing specs plus all new midi-looper specs (46 new specs across Tasks 1-8), no failures.

- [ ] **Step 6: Manually verify in the browser**

Run: `npx ng serve`, open `http://localhost:4200/applications/web/MidiLooper`, and confirm:
- The transport, track list, piano roll, and virtual keyboard all render.
- Clicking a grid cell adds a purple-highlighted note; clicking it again removes it.
- Clicking Play starts audible looped playback (browser tab must have received a user gesture, which the Play click itself provides).
- Clicking a virtual keyboard key plays an immediate preview sound, and also gets recorded onto the loop when Record is active.
- Add Track / Remove Track / instrument dropdown / loop length input all work from the track list.
- Export downloads a `.json` file; re-importing it via the file input restores the same project.
- If MIDI is unsupported by the browser (e.g. Firefox/Safari), the "Live MIDI input is not supported" message appears and nothing else breaks.

- [ ] **Step 7: Commit**

```bash
git add src/app/components/pages/applications/index.ts src/app/app.module.ts src/assets/db.json src/app/components/pages/applications/applications.component.html
git commit -m "feat: wire the MIDI looper into the applications page and db.json"
```
