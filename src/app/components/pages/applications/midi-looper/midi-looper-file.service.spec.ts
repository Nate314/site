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
