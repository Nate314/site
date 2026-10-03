import { MidiLooperAudioService } from "./midi-looper-audio.service";
import { Track } from "./models";

class FakeParam {
  value = 0;
  setValueAtTime = jasmine.createSpy("setValueAtTime");
  linearRampToValueAtTime = jasmine.createSpy("linearRampToValueAtTime");
  cancelScheduledValues = jasmine.createSpy("cancelScheduledValues");
}

class FakeGain {
  gain = new FakeParam();
  connect = jasmine.createSpy("connect").and.callFake((target: unknown) => target);
}

class FakeOscillator {
  type = "";
  frequency = new FakeParam();
  onended: (() => void) | null = null;
  connect = jasmine.createSpy("connect").and.callFake((target: unknown) => target);
  start = jasmine.createSpy("start");
  stop = jasmine.createSpy("stop");
}

class FakeAudioContext {
  currentTime = 0;
  state = "running";
  destination = {};
  gains: FakeGain[] = [];
  oscillators: FakeOscillator[] = [];
  resume = jasmine.createSpy("resume");

  createGain(): FakeGain {
    const gain = new FakeGain();
    this.gains.push(gain);
    return gain;
  }

  createOscillator(): FakeOscillator {
    const osc = new FakeOscillator();
    this.oscillators.push(osc);
    return osc;
  }
}

describe("MidiLooperAudioService", () => {

  let ctx: FakeAudioContext;
  let service: MidiLooperAudioService;

  // One quarter note at the start of a 4 beat loop: at 120 BPM it lasts 0.5s and repeats every 2s.
  const track: Track = {
    name: "Lead",
    instrument: "square",
    loopLengthBeats: 4,
    notes: [{ pitch: 69, startBeat: 0, durationBeats: 1, velocity: 127 }]
  };

  beforeEach(() => {
    ctx = new FakeAudioContext();
    spyOn(window as any, "AudioContext").and.returnValue(ctx);
    jasmine.clock().install();
    service = new MidiLooperAudioService();
  });

  afterEach(() => {
    service.stop();
    jasmine.clock().uninstall();
  });

  describe("setVolume", () => {
    it("sets the master gain, connected to the context destination once", () => {
      service.setVolume(0.4);
      service.setVolume(0.6);
      expect(ctx.gains.length).toBe(1);
      expect(ctx.gains[0].connect).toHaveBeenCalledOnceWith(ctx.destination);
      expect(ctx.gains[0].gain.value).toBe(0.6);
    });

    it("clamps the volume to the range 0 to 1", () => {
      service.setVolume(3);
      expect(ctx.gains[0].gain.value).toBe(1);
      service.setVolume(-1);
      expect(ctx.gains[0].gain.value).toBe(0);
    });
  });

  describe("playImmediate", () => {
    it("plays an oscillator of the instrument's waveform at the note's frequency, now", () => {
      ctx.currentTime = 2;
      service.playImmediate("sawtooth", 69, 127);
      const osc = ctx.oscillators[0];
      expect(osc.type).toBe("sawtooth");
      expect(osc.frequency.value).toBeCloseTo(440, 5);
      expect(osc.start).toHaveBeenCalledWith(2);
      expect(osc.stop.calls.mostRecent().args[0]).toBeCloseTo(2.32, 5);
    });

    it("shapes the note with a gain envelope that peaks at velocity / 127", () => {
      service.playImmediate("sine", 60, 63.5, 1);
      const envelope = ctx.gains[0].gain;
      expect(envelope.setValueAtTime.calls.argsFor(0)).toEqual([0, 0]);
      expect(envelope.linearRampToValueAtTime.calls.argsFor(0)).toEqual([0.5, 0.01]);
      expect(envelope.linearRampToValueAtTime.calls.argsFor(1)).toEqual([0, 1]);
    });

    it("resumes a suspended context first", () => {
      ctx.state = "suspended";
      service.playImmediate("sine", 60, 100);
      expect(ctx.resume).toHaveBeenCalled();
    });
  });

  describe("transport", () => {
    it("reports elapsed time on the audio context clock since start", () => {
      ctx.currentTime = 5;
      service.start([track], 120);
      ctx.currentTime = 6.5;
      expect(service.getElapsedSeconds()).toBe(1.5);
    });

    it("resumes a suspended context on start", () => {
      ctx.state = "suspended";
      service.start([track], 120);
      expect(ctx.resume).toHaveBeenCalled();
    });

    it("schedules each note once per loop, offset from the start time", () => {
      ctx.currentTime = 10;
      service.start([track], 120);
      jasmine.clock().tick(25);
      expect(ctx.oscillators.length).toBe(1);
      expect(ctx.oscillators[0].type).toBe("square");
      expect(ctx.oscillators[0].start).toHaveBeenCalledWith(10);

      // Same window again: nothing new is scheduled.
      jasmine.clock().tick(25);
      expect(ctx.oscillators.length).toBe(1);

      // The loop comes round again 2 seconds later.
      ctx.currentTime = 12;
      jasmine.clock().tick(25);
      expect(ctx.oscillators.length).toBe(2);
      expect(ctx.oscillators[1].start).toHaveBeenCalledWith(12);
    });

    it("uses the new tempo for notes scheduled after setTempo", () => {
      service.start([track], 120);
      service.setTempo(60);
      jasmine.clock().tick(25);
      // A one beat note lasts 1s at 60 BPM, plus the 0.02s release tail.
      expect(ctx.oscillators[0].stop.calls.mostRecent().args[0]).toBeCloseTo(1.02, 5);
    });

    it("restarting replaces the previous scheduler instead of doubling it", () => {
      service.start([track], 120);
      service.start([track], 120);
      jasmine.clock().tick(25);
      expect(ctx.oscillators.length).toBe(1);
    });

    it("stop halts the scheduler and silences the notes still sounding", () => {
      service.start([track], 120);
      jasmine.clock().tick(25);
      const osc = ctx.oscillators[0];
      const envelope = ctx.gains[0].gain;
      ctx.currentTime = 0.2;
      service.stop();
      expect(envelope.cancelScheduledValues).toHaveBeenCalledWith(0.2);
      expect(envelope.setValueAtTime).toHaveBeenCalledWith(0, 0.2);
      expect(osc.stop).toHaveBeenCalledWith(0.2);

      ctx.currentTime = 4;
      jasmine.clock().tick(100);
      expect(ctx.oscillators.length).toBe(1);
    });

    it("does not silence a note again once it has ended", () => {
      service.playImmediate("sine", 60, 100);
      const osc = ctx.oscillators[0];
      osc.onended!();
      osc.stop.calls.reset();
      service.stop();
      expect(osc.stop).not.toHaveBeenCalled();
    });

    it("stop tolerates an oscillator that throws because it already stopped", () => {
      service.playImmediate("sine", 60, 100);
      ctx.oscillators[0].stop.and.throwError("InvalidStateError");
      expect(() => service.stop()).not.toThrow();
    });
  });
});
