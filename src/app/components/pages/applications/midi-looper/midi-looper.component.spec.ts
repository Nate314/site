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

    it("shifts the selected index down when a track before it is removed", () => {
      component.addTrack(); // now 2 tracks: ["Track 1", "Track 2"], selectedTrackIndex = 1
      component.addTrack(); // now 3 tracks: ["Track 1", "Track 2", "Track 3"], selectedTrackIndex = 2
      component.selectedTrackIndex = 1; // select the middle track ("Track 2"), not the last one
      const selectedTrackName = component.project.tracks[component.selectedTrackIndex].name;
      component.removeTrack(0); // remove "Track 1", which is before the selected track
      expect(component.project.tracks.length).toBe(2);
      expect(component.selectedTrackIndex).toBe(0); // shifted down by 1 since a track before it was removed
      expect(component.project.tracks[component.selectedTrackIndex].name).toBe(selectedTrackName); // still points at the same logical track ("Track 2")
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
