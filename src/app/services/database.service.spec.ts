import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { DatabaseService } from "./database.service";
import { DB } from "../helpers/DB";
import { dbJsonFixture } from "../testing/db-fixture";

describe("DatabaseService", () => {

  let service: DatabaseService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(DatabaseService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it("loads the static assets/db.json with a GET and wraps the nate314 node in a DB", () => {
    let result: DB | undefined;
    service.connection().subscribe(db => result = db);
    const req = http.expectOne("assets/db.json");
    expect(req.request.method).toBe("GET");
    req.flush(dbJsonFixture());
    expect(result instanceof DB).toBe(true);
    expect(result!.getJavaApplications().name).toBe("JavaApplications");
  });

  it("does not request anything until connection() is subscribed", () => {
    service.connection();
    expect(http.match("assets/db.json").length).toBe(0);
  });

  it("shares one request between subscribers and replays the parsed DB to late ones", () => {
    const first: DB[] = [];
    const second: DB[] = [];
    service.connection().subscribe(db => first.push(db));
    service.connection().subscribe(db => second.push(db));
    http.expectOne("assets/db.json").flush(dbJsonFixture());
    // A subscriber arriving after the response is served from the cache, not a new request.
    const late: DB[] = [];
    service.connection().subscribe(db => late.push(db));
    http.expectNone("assets/db.json");
    expect(first.length).toBe(1);
    expect(second[0]).toBe(first[0]);
    expect(late[0]).toBe(first[0]);
  });

  it("propagates an HTTP failure to the subscriber", () => {
    let status: number | undefined;
    service.connection().subscribe({ error: e => status = e.status });
    http.expectOne("assets/db.json").flush("nope", { status: 500, statusText: "Server Error" });
    expect(status).toBe(500);
  });
});
