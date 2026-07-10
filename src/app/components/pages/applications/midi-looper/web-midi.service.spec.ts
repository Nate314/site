import { WebMidiService, MidiNoteEvent } from "./web-midi.service";

describe("WebMidiService", () => {

  let service: WebMidiService;

  beforeEach(() => {
    service = new WebMidiService();
  });

  describe("isSupported", () => {
    let originalRequestMIDIAccess: any;

    beforeEach(() => {
      originalRequestMIDIAccess = (navigator as any).requestMIDIAccess;
    });

    afterEach(() => {
      (navigator as any).requestMIDIAccess = originalRequestMIDIAccess;
    });

    it("returns true when navigator.requestMIDIAccess exists", () => {
      (navigator as any).requestMIDIAccess = () => Promise.resolve({});
      expect(service.isSupported()).toBe(true);
    });

    it("returns false when navigator.requestMIDIAccess is absent", () => {
      (navigator as any).requestMIDIAccess = undefined;
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
