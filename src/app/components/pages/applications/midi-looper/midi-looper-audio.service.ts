import { Injectable } from "@angular/core";
import { Instrument, Track } from "./models";
import { computeNoteOccurrences, mergeConnectedNotes, pitchToFrequency } from "./scheduling";

@Injectable({
  providedIn: "root"
})
export class MidiLooperAudioService {

  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private schedulerTimer: ReturnType<typeof setInterval> | null = null;
  private startContextTime = 0;
  private nextWindowStart = 0;
  private tempo = 120;
  private tracks: Track[] = [];
  private activeVoices: { osc: OscillatorNode; gain: GainNode }[] = [];

  private readonly lookaheadMs = 25;
  private readonly scheduleAheadSec = 0.1;

  private ensureContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
    return this.audioContext;
  }

  private ensureMasterGain(): GainNode {
    const ctx = this.ensureContext();
    if (!this.masterGain) {
      this.masterGain = ctx.createGain();
      this.masterGain.connect(ctx.destination);
    }
    return this.masterGain;
  }

  setVolume(volume: number): void {
    this.ensureMasterGain().gain.value = Math.max(0, Math.min(1, volume));
  }

  start(tracks: Track[], tempo: number): void {
    const ctx = this.ensureContext();
    if (ctx.state === "suspended") ctx.resume();
    this.tracks = tracks;
    this.tempo = tempo;
    this.startContextTime = ctx.currentTime;
    this.nextWindowStart = 0;
    if (this.schedulerTimer) clearInterval(this.schedulerTimer);
    this.schedulerTimer = setInterval(() => this.tick(), this.lookaheadMs);
  }

  stop(): void {
    if (this.schedulerTimer) {
      clearInterval(this.schedulerTimer);
      this.schedulerTimer = null;
    }
    this.silenceActiveVoices();
  }

  setTempo(tempo: number): void {
    this.tempo = tempo;
  }

  playImmediate(instrument: Instrument, pitch: number, velocity: number, durationSec: number = 0.3): void {
    const ctx = this.ensureContext();
    if (ctx.state === "suspended") ctx.resume();
    this.playNote(instrument, pitch, velocity, ctx.currentTime, durationSec);
  }

  private tick(): void {
    const ctx = this.ensureContext();
    const elapsed = ctx.currentTime - this.startContextTime;
    const windowStart = this.nextWindowStart;
    const windowEnd = elapsed + this.scheduleAheadSec;
    if (windowEnd <= windowStart) return;
    for (const track of this.tracks) {
      for (const note of mergeConnectedNotes(track.notes)) {
        const times = computeNoteOccurrences(note.startBeat, track.loopLengthBeats, this.tempo, windowStart, windowEnd);
        const durationSec = (note.durationBeats / this.tempo) * 60;
        for (const t of times) {
          this.playNote(track.instrument, note.pitch, note.velocity, this.startContextTime + t, durationSec);
        }
      }
    }
    this.nextWindowStart = windowEnd;
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

    osc.connect(gain).connect(this.ensureMasterGain());
    const voice = { osc, gain };
    this.activeVoices.push(voice);
    osc.onended = () => {
      const i = this.activeVoices.indexOf(voice);
      if (i >= 0) this.activeVoices.splice(i, 1);
    };
    osc.start(when);
    osc.stop(when + durationSec + 0.02);
  }

  /** Immediately silences every currently-sounding note, instead of letting
   *  already-scheduled notes ring out to their natural end. */
  private silenceActiveVoices(): void {
    const ctx = this.ensureContext();
    const now = ctx.currentTime;
    for (const voice of this.activeVoices) {
      try {
        voice.gain.gain.cancelScheduledValues(now);
        voice.gain.gain.setValueAtTime(0, now);
        voice.osc.stop(now);
      } catch {
        // the oscillator may already have stopped naturally - nothing to do
      }
    }
    this.activeVoices = [];
  }
}
