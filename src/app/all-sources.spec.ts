// Angular's Karma builder only instruments files that a spec imports, so a file with
// no spec would be missing from the coverage report. Importing the root module, the
// barrel and the one helper nothing else imports puts every file under src/app in it.
import { AppModule } from "./app.module";
import * as barrel from "./index";
import * as fileStructure from "./helpers/FileStructure";

describe("coverage scope", () => {
  it("loads every source file under src/app", () => {
    expect(AppModule).toBeDefined();
    expect(barrel).toBeDefined();
    expect(fileStructure).toBeDefined();
  });
});
