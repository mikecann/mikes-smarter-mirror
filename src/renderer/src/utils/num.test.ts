import { wrap } from "./num";
import { describe, expect, it } from "vitest";

describe("wrap", () => {
  it("works", () => {
    expect(wrap(0, 0, 9)).toEqual(0);
    expect(wrap(1, 0, 9)).toEqual(1);
    expect(wrap(9, 0, 9)).toEqual(9);
    expect(wrap(10, 0, 9)).toEqual(0);
    expect(wrap(11, 0, 9)).toEqual(1);
    expect(wrap(19, 0, 9)).toEqual(9);
    expect(wrap(10, 0, 9)).toEqual(0);
    expect(wrap(-1, 0, 9)).toEqual(9);
    expect(wrap(-10, 0, 9)).toEqual(0);
    expect(wrap(-11, 0, 9)).toEqual(9);

    expect(wrap(10, 10, 19)).toEqual(10);
    expect(wrap(11, 10, 19)).toEqual(11);
    expect(wrap(19, 10, 19)).toEqual(19);
    expect(wrap(20, 10, 19)).toEqual(10);
    expect(wrap(0, 10, 19)).toEqual(10);
  });
});
