import { Say2Component } from "./say2.component";

describe("Say2Component", () => {

  let component: Say2Component;

  beforeEach(() => {
    component = new Say2Component(null as any, null as any);
  });

  it("is created", () => {
    expect(component).toBeTruthy();
  });

  describe("say", () => {
    it("converts single digit numbers", () => {
      expect(component.say(1)).toBe(" one");
      expect(component.say(5)).toBe(" five");
    });

    it("converts teens", () => {
      expect(component.say(19)).toBe(" nineteen");
    });

    it("converts tens", () => {
      expect(component.say(20)).toBe(" twenty");
      expect(component.say(21)).toBe(" twenty one");
    });

    it("converts hundreds", () => {
      expect(component.say(100)).toBe(" one hundred");
    });
  });

  describe("log10", () => {
    it("returns the base-10 logarithm", () => {
      expect(component.log10(100)).toBeCloseTo(2, 10);
      expect(component.log10(1000)).toBeCloseTo(3, 10);
    });
  });

  describe("calculate", () => {
    it("labels zero", () => {
      component.input = 0;
      component.calculate();
      expect(component.numberLabel).toBe("zero");
    });

    it("labels small positive numbers", () => {
      component.input = 2;
      component.calculate();
      expect(component.numberLabel).toBe(" two");
    });

    it("prefixes negative numbers with 'negative'", () => {
      component.input = -2;
      component.calculate();
      expect(component.numberLabel).toBe("negative two");
    });

    it("rejects numbers that are too big", () => {
      component.input = 1000000000000000;
      component.calculate();
      expect(component.numberLabel).toBe("number is too big");
    });

    it("rejects numbers that are too small", () => {
      component.input = -1000000000000000;
      component.calculate();
      expect(component.numberLabel).toBe("number is too small");
    });
  });
});
