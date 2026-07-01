import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DB } from "../helpers/DB";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DatabaseService {

  private db$: Observable<DB>;

  constructor(
    private http: HttpClient
  ) { }

  connection(): Observable<DB> {
    // Load the site content from the static asset instead of Firebase.
    // shareReplay caches the parsed DB so repeated subscriptions reuse one request.
    if (!this.db$) {
      this.db$ = this.http.get<any>("assets/db.json").pipe(
        map(json => new DB(json.nate314)),
        shareReplay(1)
      );
    }
    return this.db$;
  }
}
