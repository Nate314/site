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
