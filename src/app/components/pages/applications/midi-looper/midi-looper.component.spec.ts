import { of } from "rxjs";
import { MidiLooperComponent, STORAGE_KEY } from "./midi-looper.component";
import { MidiLooperAudioService } from "./midi-looper-audio.service";
import { WebMidiService } from "./web-midi.service";
import { MidiLooperFileService, InvalidProjectFileError } from "./midi-looper-file.service";
import { DEMO_PROJECT } from "./demo-project";

describe("MidiLooperComponent", () => {

  let component: MidiLooperComponent;
  let audioService: jasmine.SpyObj<MidiLooperAudioService>;
  let webMidiService: jasmine.SpyObj<WebMidiService>;
  let fileService: jasmine.SpyObj<MidiLooperFileService>;

  function createComponent(): MidiLooperComponent {
    const c = new MidiLooperComponent(audioService, webMidiService, fileService, { detectChanges: () => { } } as any);
    c.ngOnInit();
    return c;
  }

  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);
    audioService = jasmine.createSpyObj("MidiLooperAudioService", ["start", "stop", "playImmediate", "setTempo", "setVolume"]);
    webMidiService = jasmine.createSpyObj("WebMidiService", ["isSupported", "connect", "notes"]);
    webMidiService.isSupported.and.returnValue(false);
    webMidiService.notes.and.returnValue(of());
    fileService = jasmine.createSpyObj("MidiLooperFileService", ["exportProject", "importProject", "parseProject"]);

    component = createComponent();
  });

  afterEach(() => {
    localStorage.removeItem(STORAGE_KEY);
  });

  it("is created with one default track selected", () => {
    expect(component.project.tracks.length).toBe(1);
    expect(component.selectedTrackIndex).toBe(0);
  });

  it("defaults volume to 0.75 and applies it to the audio service on init", () => {
    expect(component.volume).toBe(0.75);
    expect(audioService.setVolume).toHaveBeenCalledWith(0.75);
  });

  describe("persistence", () => {
    it("saves the project, volume, and settings to localStorage after a change", () => {
      component.onVolumeChanged(0.4);
      component.onGridResolutionChanged(8);
      component.onTimeSignatureNumeratorChanged(3);
      component.onTimeSignatureDenominatorChanged(8);
      component.onKeyboardOctaveCountChanged(3);
      component.addTrack();

      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) as string);
      expect(saved.volume).toBe(0.4);
      expect(saved.gridResolutionStepsPerBeat).toBe(8);
      expect(saved.timeSignatureNumerator).toBe(3);
      expect(saved.timeSignatureDenominator).toBe(8);
      expect(saved.keyboardOctaveCount).toBe(3);
      expect(saved.project.tracks.length).toBe(2);
    });

    it("loads a previously saved volume and settings on init", () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        volume: 0.2,
        gridResolutionStepsPerBeat: 2,
        timeSignatureNumerator: 6,
        timeSignatureDenominator: 8,
        keyboardOctaveCount: 4
      }));

      const reloaded = createComponent();

      expect(reloaded.volume).toBe(0.2);
      expect(reloaded.gridResolutionStepsPerBeat).toBe(2);
      expect(reloaded.timeSignatureNumerator).toBe(6);
      expect(reloaded.timeSignatureDenominator).toBe(8);
      expect(reloaded.keyboardOctaveCount).toBe(4);
      expect(audioService.setVolume).toHaveBeenCalledWith(0.2);
    });

    it("loads a previously saved project on init, validating it via the file service", () => {
      const savedProject = { tempo: 90, tracks: [{ name: "Saved", instrument: "square" as const, loopLengthBeats: 8, notes: [] }] };
      fileService.parseProject.and.returnValue(savedProject);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ project: savedProject }));

      const reloaded = createComponent();

      expect(fileService.parseProject).toHaveBeenCalledWith(JSON.stringify(savedProject));
      expect(reloaded.project).toBe(savedProject);
    });

    it("falls back to the default project when the saved project fails validation", () => {
      fileService.parseProject.and.throwError(new InvalidProjectFileError("bad saved project"));
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ project: { tempo: -1, tracks: "not an array" } }));

      const reloaded = createComponent();

      expect(reloaded.project.tracks.length).toBe(1);
      expect(reloaded.project.tracks[0].name).toBe("Track 1");
    });

    it("ignores corrupted localStorage content and falls back to defaults", () => {
      localStorage.setItem(STORAGE_KEY, "not valid json{{{");

      const reloaded = createComponent();

      expect(reloaded.volume).toBe(0.75);
      expect(reloaded.project.tracks.length).toBe(1);
    });
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

  describe("onTempoChanged", () => {
    it("updates the project tempo", () => {
      component.onTempoChanged(140);
      expect(component.project.tempo).toBe(140);
    });

    it("pushes the new tempo to the audio service while playing", () => {
      component.play();
      component.onTempoChanged(140);
      expect(audioService.setTempo).toHaveBeenCalledWith(140);
    });

    it("does not call the audio service when not playing", () => {
      component.onTempoChanged(140);
      expect(audioService.setTempo).not.toHaveBeenCalled();
    });
  });

  describe("onVolumeChanged", () => {
    it("updates the volume", () => {
      component.onVolumeChanged(0.5);
      expect(component.volume).toBe(0.5);
    });

    it("pushes the new volume to the audio service", () => {
      component.onVolumeChanged(0.5);
      expect(audioService.setVolume).toHaveBeenCalledWith(0.5);
    });

    it("pushes the volume to the audio service even when not playing", () => {
      component.onVolumeChanged(0.25);
      expect(audioService.setVolume).toHaveBeenCalledWith(0.25);
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

    it("stops playback before importing", async () => {
      component.play();
      const imported = { tempo: 90, tracks: [{ name: "Imported", instrument: "square" as const, loopLengthBeats: 8, notes: [] }] };
      fileService.importProject.and.returnValue(Promise.resolve(imported));
      await component.onImportFile({} as File);
      expect(audioService.stop).toHaveBeenCalled();
      expect(component.isPlaying).toBe(false);
    });
  });

  describe("loadDemo", () => {
    it("does nothing when the user cancels the confirmation", () => {
      spyOn(component, "confirmAction").and.returnValue(false);
      const originalProject = component.project;
      component.loadDemo();
      expect(component.project).toBe(originalProject);
    });

    it("loads a copy of the demo project when confirmed", () => {
      spyOn(component, "confirmAction").and.returnValue(true);
      component.loadDemo();
      expect(component.project).toEqual(DEMO_PROJECT);
      expect(component.project).not.toBe(DEMO_PROJECT);
      expect(component.selectedTrackIndex).toBe(0);
    });

    it("does not mutate the shared DEMO_PROJECT constant when the loaded copy is edited", () => {
      spyOn(component, "confirmAction").and.returnValue(true);
      component.loadDemo();
      component.onGridToggle({ pitch: 100, startBeat: 0 });
      expect(DEMO_PROJECT.tracks[0].notes.find(n => n.pitch === 100)).toBeUndefined();
    });

    it("stops playback before loading", () => {
      component.play();
      spyOn(component, "confirmAction").and.returnValue(true);
      component.loadDemo();
      expect(audioService.stop).toHaveBeenCalled();
      expect(component.isPlaying).toBe(false);
    });
  });

  describe("clearProject", () => {
    it("does nothing when the user cancels the confirmation", () => {
      spyOn(component, "confirmAction").and.returnValue(false);
      const originalProject = component.project;
      component.clearProject();
      expect(component.project).toBe(originalProject);
    });

    it("resets to a single empty default track when confirmed", () => {
      component.addTrack();
      component.onGridToggle({ pitch: 60, startBeat: 0 });
      spyOn(component, "confirmAction").and.returnValue(true);
      component.clearProject();
      expect(component.project.tracks.length).toBe(1);
      expect(component.project.tracks[0].notes.length).toBe(0);
      expect(component.selectedTrackIndex).toBe(0);
    });

    it("stops playback before clearing", () => {
      component.play();
      spyOn(component, "confirmAction").and.returnValue(true);
      component.clearProject();
      expect(audioService.stop).toHaveBeenCalled();
      expect(component.isPlaying).toBe(false);
    });
  });
});
