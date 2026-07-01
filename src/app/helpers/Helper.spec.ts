import { Helper, PageNames } from "./Helper";

describe("Helper", () => {

  describe("flatten2dArray", () => {
    it("flattens a 2d array into a 1d array preserving order", () => {
      expect(Helper.flatten2dArray([[1, 2], [3], [4, 5]])).toEqual([1, 2, 3, 4, 5]);
    });

    it("returns an empty array when given an empty array", () => {
      expect(Helper.flatten2dArray([])).toEqual([]);
    });

    it("handles rows that are themselves empty", () => {
      expect(Helper.flatten2dArray([[], [1], []])).toEqual([1]);
    });
  });

  describe("replaceAll", () => {
    it("replaces every occurrence of the substring", () => {
      expect(Helper.replaceAll("a-b-c-d", "-", "_")).toBe("a_b_c_d");
    });

    it("returns the original string when the substring is absent", () => {
      expect(Helper.replaceAll("abc", "x", "y")).toBe("abc");
    });

    it("can remove a substring by replacing with an empty string", () => {
      expect(Helper.replaceAll("{ get; set; }", " ", "")).toBe("{get;set;}");
    });
  });

  describe("equalsNull", () => {
    it("returns true for null, undefined and empty string", () => {
      expect(Helper.equalsNull(null)).toBe(true);
      expect(Helper.equalsNull(undefined)).toBe(true);
      expect(Helper.equalsNull("")).toBe(true);
    });

    it("returns false for non-empty values", () => {
      expect(Helper.equalsNull("x")).toBe(false);
      expect(Helper.equalsNull(0)).toBe(false);
      expect(Helper.equalsNull("0")).toBe(false);
    });
  });

  describe("isScreenSmall", () => {
    it("returns a boolean based on the window width", () => {
      expect(typeof Helper.isScreenSmall()).toBe("boolean");
    });
  });

  describe("initializePage", () => {
    it("sets the document title to the site name plus the page name", () => {
      const component: any = {};
      Helper.initializePage(component, "/home", PageNames.HOME);
      expect(document.title).toBe(`${PageNames.SITE_TITLE} | ${PageNames.HOME}`);
    });
  });
});
