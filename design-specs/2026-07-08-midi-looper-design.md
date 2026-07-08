# MIDI Piano Roll Looper — Design

## Purpose

A new web application on the site (alongside the existing calculators, typing
test, etc.) that lets a user compose short multi-track loops on a piano-roll
grid, play them back with a simple synth, record notes live via a MIDI
controller or an on-screen keyboard, and export/import the composition as
JSON.

## Integration with the existing "web applications" pattern

This site's web apps are plain NgModule components with a unique selector,
registered in `src/assets/db.json` (`webApplications.apps`) and rendered
conditionally in `applications.component.html` via `*ngIf="webApp.selector === '...'"`.
The looper follows the same pattern:

- Selector: `app-midi-looper`
- `db.json` entry: `name: "MidiLooper"`, `file: "webapplications/midilooper"`,
  `selector: "app-midi-looper"`, with a short description.
- New `<app-midi-looper *ngIf="webApp.selector === 'app-midi-looper'"></app-midi-looper>`
  line added to `applications.component.html`.
- Component declared in `app.module.ts` like every other web app component.

## Components

`src/app/components/pages/applications/midi-looper/`:

- **`midi-looper.component.ts/html/scss`** — top-level container. Holds
  transport controls (play/stop/record, tempo/BPM), the track list, and the
  piano roll for the currently-selected track. Owns the `Project` state and
  wires the services together.
- **`piano-roll/piano-roll.component.ts`** — grid for the selected track's
  notes. Click a cell to add/remove a note. Supports adjustable grid
  resolution (4th/8th/16th/32nd) and the full 88-key pitch range with
  vertical scroll.
- **`virtual-keyboard/virtual-keyboard.component.ts`** — clickable on-screen
  piano keys; emits note-on/note-off events identically shaped to MIDI/grid
  input so downstream recording logic doesn't care about the source.
- **`track-list/track-list.component.ts`** — add/remove tracks, select the
  active (recording/editing) track, per-track instrument (oscillator
  waveform) picker, per-track loop length in beats.

## Services

- **`midi-looper-audio.service.ts`** — wraps a single `AudioContext`.
  Synthesizes notes as an oscillator (waveform per track) + gain envelope.
  Runs the playback scheduler: a single lookahead clock (poll every ~25ms,
  schedule any note starts falling within the next ~100ms) drives all tracks.
  Each track loops independently at its own `loopLengthBeats`, computed from
  the shared global tempo (BPM) — tracks of different lengths phase against
  each other continuously rather than resetting in lockstep.
- **`web-midi.service.ts`** — wraps `navigator.requestMIDIAccess`, exposes
  incoming note-on/note-off events as an observable. Resolves to "unsupported"
  gracefully when the API is absent or access is denied.
- **`midi-looper-file.service.ts`** — exports the current `Project` as a
  downloadable JSON file; imports/validates a JSON file back into a `Project`.

## Data model

```ts
interface Note {
  pitch: number;          // MIDI note number, 0-127
  startBeat: number;       // position within the track's own loop, in beats
  durationBeats: number;
  velocity: number;        // 0-127
}

interface Track {
  name: string;
  instrument: OscillatorType; // 'sine' | 'square' | 'sawtooth' | 'triangle'
  loopLengthBeats: number;
  notes: Note[];
}

interface Project {
  tempo: number; // BPM, shared by all tracks
  tracks: Track[];
}
```

Export/import format is exactly this `Project` shape as JSON (no separate
wire format — import just reloads what export produced).

## Recording flow

- Only one track can record at a time (single input source: one MIDI
  controller / one virtual keyboard being played at once).
- Hitting **Record** starts the transport if it isn't already running.
- While recording, any note-on from MIDI, the virtual keyboard, or a
  held/clicked grid cell is added to the **currently selected track**, at the
  transport's current position within that track's loop, quantized to the
  nearest step of the active grid resolution. This is overdub — existing
  notes on the track are not cleared, so multiple recording passes layer up.
- Grid clicks always add an exact-quantized note directly regardless of
  record state (the "draw" input method).
- Changing the selected track while recording stops recording onto the old
  track and arms the new one.

## Error handling & browser compatibility

- **Web MIDI unsupported** (Safari/Firefox lack `requestMIDIAccess`):
  detected at init; the "Live MIDI" input control is disabled with a short
  inline note. Grid, virtual keyboard, synth playback, and export/import all
  still work.
- **Web MIDI permission denied**: the `requestMIDIAccess()` rejection is
  caught and handled the same as unsupported.
- **AudioContext autoplay policy**: the `AudioContext` is created lazily and
  `resume()`d on the first Play/Record click (a user gesture), not at
  component load, per browser autoplay restrictions.
- **Import validation**: the JSON file is checked for the expected shape
  (`tempo` is a positive number, `tracks` is an array, each note has valid
  `pitch`/`startBeat`/`durationBeats`/`velocity`) before it replaces the
  current project. A malformed file shows an inline error and leaves the
  current project untouched.

## Testing

- **Unit tests** (Karma, matching the project's existing zero-config test
  setup): quantization math, per-track loop-position/scheduling-window
  calculations, JSON export/import round-trip, project-shape validation.
- **Component tests**: piano-roll add/remove-note on click, track-list
  add/remove/select-track, virtual-keyboard emitting correct note events.
- **Not unit-testable**: actual audio output and real MIDI hardware input —
  there is no real Web Audio/Web MIDI implementation under Karma/jsdom.
  These are verified manually in a real browser instead of claimed as
  automated coverage.
