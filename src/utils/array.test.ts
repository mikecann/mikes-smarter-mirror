import { getNextInRotation, join } from "./array";
import { describe, expect, it } from "vitest";

describe("join", () => {
  it("works", () => {
    expect(join([{ a: "a" }, { b: 2 }, { c: true }], { some: "glue" })).toEqual([
      { a: "a" },
      { some: "glue" },
      { b: 2 },
      { some: "glue" },
      { c: true },
    ]);
  });
});

describe("getNextInRotation", () => {
  it("works", () => {
    const rotation = ["a", "b", "c", "d", "e"];

    expect(getNextInRotation({ item: "a", rotation })).toEqual("b");
    expect(getNextInRotation({ item: "b", rotation })).toEqual("c");
    expect(getNextInRotation({ item: "e", rotation })).toEqual("a");

    expect(getNextInRotation({ item: "a", rotation, rotationIncrement: 2 })).toEqual("c");
    expect(getNextInRotation({ item: "b", rotation, rotationIncrement: 2 })).toEqual("d");
    expect(getNextInRotation({ item: "d", rotation, rotationIncrement: 2 })).toEqual("a");
    expect(getNextInRotation({ item: "e", rotation, rotationIncrement: 2 })).toEqual("b");
  });
});
