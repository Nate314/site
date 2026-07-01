import { DtoConvertComponent } from "./dto-convert.component";

describe("DtoConvertComponent", () => {

  let component: DtoConvertComponent;

  beforeEach(() => {
    component = new DtoConvertComponent();
  });

  it("is created", () => {
    expect(component).toBeTruthy();
  });

  describe("csharp_to_typescript", () => {
    it("converts a C# class with auto-properties to TypeScript fields", () => {
      component.csharp_text = "class User {\n"
        + "public string username { get; set; }\n"
        + "public string password { get; set; }\n"
        + "}";
      component.csharp_to_typescript();
      expect(component.typescript_text).toContain("username: string;");
      expect(component.typescript_text).toContain("password: string;");
      expect(component.typescript_text).toContain("class User {");
    });
  });

  describe("typescript_to_csharp", () => {
    it("converts TypeScript fields back to C# auto-properties", () => {
      component.typescript_text = "class User {\n"
        + "\tusername: string;\n"
        + "\tpassword: string;\n"
        + "}";
      component.typescript_to_csharp();
      expect(component.csharp_text).toContain("public string username { get; set; }");
      expect(component.csharp_text).toContain("public string password { get; set; }");
      expect(component.csharp_text).toContain("class User {");
    });
  });
});
