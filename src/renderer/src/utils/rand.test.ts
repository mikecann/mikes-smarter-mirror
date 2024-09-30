import { randomiseNumber } from "./rand";
import { Random } from "./Random";
import { describe, expect, it } from "vitest";

describe("randomiseNumber", () => {
  it("works", () => {
    const rnd = new Random(123);
    expect([
      randomiseNumber(10, 0.2, rnd),
      randomiseNumber(10, 0.2, rnd),
      randomiseNumber(10, 0.2, rnd),
      randomiseNumber(10, 0.2, rnd),
    ]).toEqual([11.482345937165046, 11.564776607920596, 9.430696694047818, 10.142354625310366]);
  });
});
