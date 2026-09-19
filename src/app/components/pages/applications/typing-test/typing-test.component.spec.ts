import { TypingTestComponent } from "./typing-test.component";

// typingparagraphchanged() starts an untracked setInterval, so these specs drive the pure
// steps (submit, correctPart, clockTick, restart) directly.
describe("TypingTestComponent", () => {

  let component: TypingTestComponent;

  beforeEach(() => component = new TypingTestComponent({ detectChanges: () => { } } as any));

  describe("pad", () => {
    it("zero pads single digits only", () => {
      expect(component.pad(0)).toBe("00");
      expect(component.pad(9)).toBe("09");
      expect(component.pad(10)).toBe("10");
      expect(component.pad(59)).toBe("59");
    });
  });

  describe("replaceSpaces", () => {
    it("collapses runs of spaces to one", () => {
      expect(component.replaceSpaces("a    b  c")).toBe("a b c");
    });
  });

  describe("submit", () => {
    it("uses the custom text plus a trailing space as the paragraph to type", () => {
      component.customparagraph = "the quick  brown fox";
      component.submit();
      expect(component.paragraph).toBe("the quick brown fox ");
      expect(component.untypedText).toBe(component.paragraph);
    });
  });

  describe("correctPart", () => {
    beforeEach(() => {
      component.customparagraph = "hello world";
      component.submit(); // paragraph is "hello world "
    });

    it("marks correctly typed text as typed and shows the next character as the cursor", () => {
      component.typingparagraph = "hel";
      component.correctPart();
      expect(component.typedText).toBe("hel");
      expect(component.wrongtypedText).toBe("");
      expect(component.cursorText).toBe("l");
    });

    it("moves everything from the first mistake onward into the wrong text", () => {
      component.typingparagraph = "helXo";
      component.correctPart();
      expect(component.typedText).toBe("hel");
      expect(component.wrongtypedText).toBe("Xo");
    });

    it("treats a correct character after a mistake as wrong too", () => {
      component.typingparagraph = "hXllo";
      component.correctPart();
      expect(component.typedText).toBe("h");
      expect(component.wrongtypedText).toBe("Xllo");
    });

    it("has nothing typed for an empty input and points the cursor at the first character", () => {
      component.typingparagraph = "";
      component.correctPart();
      expect(component.typedText).toBe("");
      expect(component.cursorText).toBe("h");
    });
  });

  describe("clockTick", () => {
    it("counts a minute down through 59 seconds", () => {
      component.clockTick();
      expect([component.timerMinutes, component.timerSeconds]).toEqual([0, 59]);
      component.clockTick();
      expect([component.timerMinutes, component.timerSeconds]).toEqual([0, 58]);
      expect(component.disableTextBox).toBe(false);
    });

    it("disables the box and reports words per minute when time runs out", () => {
      component.typedText = "one two three";
      component.cursorText = " ";
      component.timerMinutes = 0;
      component.timerSeconds = 1;
      component.clockTick();
      expect(component.disableTextBox).toBe(true);
      // Three words typed and the cursor sits on a space, so the last word is complete.
      expect(component.outputText).toBe("You typed at 3 words per minute");
    });

    it("does not count the word in progress", () => {
      component.typedText = "one two thr";
      component.cursorText = "e";
      component.timerMinutes = 0;
      component.timerSeconds = 1;
      component.clockTick();
      expect(component.outputText).toBe("You typed at 2 words per minute");
    });
  });

  describe("restart", () => {
    it("returns the timer and typed state to their start but keeps the paragraph", () => {
      component.customparagraph = "abc";
      component.submit();
      component.typingparagraph = "ab";
      component.typedText = "ab";
      component.timerMinutes = 0;
      component.timerSeconds = 12;
      component.timerStarted = true;
      component.disableTextBox = true;
      component.outputText = "done";
      component.restart();
      expect([component.timerMinutes, component.timerSeconds]).toEqual([1, 0]);
      expect(component.typingparagraph).toBe("");
      expect(component.typedText).toBe("");
      expect(component.outputText).toBe("");
      expect(component.timerStarted).toBe(false);
      expect(component.disableTextBox).toBe(false);
      expect(component.untypedText).toBe("abc ");
    });
  });
});
