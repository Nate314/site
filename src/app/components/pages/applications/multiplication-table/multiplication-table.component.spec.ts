import { MultiplicationTableComponent } from "./multiplication-table.component";

describe("MultiplicationTableComponent", () => {

  let component: MultiplicationTableComponent;

  beforeEach(() => {
    component = new MultiplicationTableComponent();
  });

  it("is created", () => {
    expect(component).toBeTruthy();
  });

  describe("getClass", () => {
    it("uses the gray header style for the first row and column", () => {
      expect(component.getClass(0, 0)).toBe("w3-gray");
      expect(component.getClass(0, 5)).toBe("w3-gray");
      expect(component.getClass(5, 0)).toBe("w3-gray");
    });

    it("uses the gray style along the diagonal", () => {
      expect(component.getClass(3, 3)).toBe("w3-gray");
    });

    it("uses the light gray style for body cells", () => {
      expect(component.getClass(2, 3)).toBe("w3-light-gray");
    });
  });

  describe("ngOnInit", () => {
    it("populates the multiplication table", () => {
      component.ngOnInit();
      expect(component.size).toBe(12);
      expect(component.multTable.length).toBeGreaterThan(0);
      expect(component.loading).toBe(false);
    });
  });
});
