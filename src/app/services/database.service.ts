import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DB } from "../helpers/DB";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class DatabaseService {

    constructor(
        private http: HttpClient
    ) {}

    connection(): Observable<DB> {
        return new DB(this.http).getDB();
    }
}
