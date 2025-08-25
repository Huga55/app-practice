import { describe, expect, it } from "vitest";
import { sortDirections } from "./sortDirections";

const entryRoutes = [
  { from: "Питер", to: "Минск", index: 2 },
  { from: "Киев", to: "Новосибирск", index: 4 },
  { from: "Череповец", to: "Москва", index: 0 },
  { from: "Минск", to: "Киев", index: 3 },
  { from: "Москва", to: "Питер", index: 1 },
];

describe("sortDirections func", () => {
  it("Correct work", () => {
    const expectedResult = [...entryRoutes]
      .sort((a, b) => a.index - b.index)
      .map(({ from, to }) => {
        return { from, to };
      });
    const result = sortDirections(entryRoutes);

    expect(result).toEqual(expectedResult);
  });
});
