import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

const STORAGE_KEY = "secretUnlocked";

@Injectable({ providedIn: "root" })
export class UnlockService {

  private readonly subject = new BehaviorSubject<boolean>(
    localStorage.getItem(STORAGE_KEY) === "true"
  );

  readonly unlocked$ = this.subject.asObservable();

  get unlocked(): boolean {
    return this.subject.value;
  }

  toggle() {
    const next = !this.subject.value;
    localStorage.setItem(STORAGE_KEY, String(next));
    this.subject.next(next);
  }
}
