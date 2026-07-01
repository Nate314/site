import { FinalGradeCalculatorComponent } from "./final-grade-calculator.component";

describe("FinalGradeCalculatorComponent", () => {

  let component: FinalGradeCalculatorComponent;

  beforeEach(() => {
    component = new FinalGradeCalculatorComponent();
  });

  it("is created", () => {
    expect(component).toBeTruthy();
  });

  describe("finalGradeRequired", () => {
    it("computes the grade needed on the final (scaled by 10000)", () => {
      // current 90%, final worth 20%, goal 90% -> need 90% on the final
      expect(component.finalGradeRequired(0.9, 0.2, 0.9)).toBe(9000);
    });
  });

  describe("finalGrade", () => {
    it("computes the resulting class grade (scaled by 10000)", () => {
      expect(component.finalGrade(0.9, 0.2, 0.9)).toBe(9000);
    });
  });

  describe("calculate", () => {
    it("produces a descriptive label for valid input", () => {
      component.currentGrade = 90;
      component.finalPercentage = 20;
      component.goal = 90;
      component.calculate();
      expect(component.error).toBe("");
      expect(component.label).toBe(
        "You need a 90% on the final to get a grade of 90% in the class");
    });

    it("sets an error when a field is missing", () => {
      component.currentGrade = 90;
      component.finalPercentage = undefined as any;
      component.goal = 90;
      component.calculate();
      expect(component.label).toBe("");
      expect(component.error).toContain("Please fill out all three textboxes");
    });
  });
});
