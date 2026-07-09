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
