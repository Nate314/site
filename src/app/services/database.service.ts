import { Injectable } from "@angular/core";
import { DB } from "../helpers/DB";
import { Observable } from "rxjs";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable({
  providedIn: "root"
})
export class DatabaseService {

  constructor(
    private afdb: AngularFireDatabase
  ) { }

  connection(): Observable<DB> {
    return new DB(this.afdb).getDB();
  }
}
