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
