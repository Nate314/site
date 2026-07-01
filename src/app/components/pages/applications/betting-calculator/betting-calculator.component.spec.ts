import { BettingCalculatorComponent } from "./betting-calculator.component";

describe("BettingCalculatorComponent", () => {

  let component: BettingCalculatorComponent;

  beforeEach(() => {
    component = new BettingCalculatorComponent();
  });

  it("is created", () => {
    expect(component).toBeTruthy();
  });

  describe("setUpTable", () => {
    it("builds a humans x players grid of zeros", () => {
      component.humans = 2;
      component.players = 3;
      component.setUpTable();
      expect(component.humanIndecies).toEqual([1, 2]);
      expect(component.playerIndecies).toEqual([1, 2, 3]);
      expect(component.grid).toEqual([[0, 0, 0], [0, 0, 0]]);
      expect(component.output).toBe("");
    });
  });

  describe("playerWon", () => {
    it("pays out the whole pot to the sole winning bettor", () => {
      component.humans = 2;
      component.players = 2;
      component.houseAccount = 0;
      component.grid = [[10, 0], [0, 20]];
      component.playerWon(1); // player 1 (index 0) wins
      // total pot = 30, winning pot = 10, all of it goes to human 1
      expect(component.output).toContain("TotalLoot: 30");
      expect(component.output).toContain("WinningPot: 10");
      expect(component.output).toContain("LoosingPot: 20");
      expect(component.output).toContain("Human 1: 30");
      expect(component.houseAccount).toBe(0);
    });
  });
});
