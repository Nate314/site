import { GroupCreatorComponent } from "./group-creator.component";

describe("GroupCreatorComponent", () => {

  let component: GroupCreatorComponent;

  beforeEach(() => {
    component = new GroupCreatorComponent();
  });

  it("is created", () => {
    expect(component).toBeTruthy();
  });

  describe("myParseInt", () => {
    it("parses a numeric string", () => {
      expect(component.myParseInt("5")).toBe(5);
      expect(component.myParseInt("0")).toBe(0);
    });

    it("returns -1 for a non-numeric string", () => {
      expect(component.myParseInt("abc")).toBe(-1);
    });
  });

  describe("shuffleArray", () => {
    it("preserves the length and the set of elements", () => {
      const input = [1, 2, 3, 4, 5];
      const result = component.shuffleArray([...input]);
      expect(result.length).toBe(input.length);
      expect([...result].sort((a, b) => a - b)).toEqual(input);
    });
  });

  describe("group", () => {
    it("includes every name and the total count in the output", () => {
      component.list = "alice,bob,carol";
      component.minPeople = 1;
      component.maxPeople = 1;
      component.generateList();
      expect(component.output).toContain("Total names:</strong> 3");
      expect(component.output).toContain("alice");
      expect(component.output).toContain("bob");
      expect(component.output).toContain("carol");
    });
  });
});
