import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

const STORAGE_KEY = "theme";

@Injectable({ providedIn: "root" })
export class ThemeService {

  private readonly subject = new BehaviorSubject<"light" | "dark">(
    (localStorage.getItem(STORAGE_KEY) as "light" | "dark") || "light"
  );

  readonly theme$ = this.subject.asObservable();

  get theme(): "light" | "dark" {
    return this.subject.value;
  }

  toggle() {
    const next = this.subject.value === "light" ? "dark" : "light";
    localStorage.setItem(STORAGE_KEY, next);
    this.subject.next(next);
  }
}
