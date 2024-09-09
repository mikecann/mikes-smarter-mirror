import { minutesInSeconds, hoursInSeconds, hoursInMs } from "./time";
import { describe, expect, it } from "vitest";

describe(`minutesInSeconds`, () => {
  it(`works`, () => {
    expect(minutesInSeconds(-1)).toBe(-60);
    expect(minutesInSeconds(0)).toBe(0);
    expect(minutesInSeconds(1)).toBe(60);
    expect(minutesInSeconds(2)).toBe(120);
    expect(minutesInSeconds(1.5)).toBe(90);
  });
});

describe(`hoursInSeconds`, () => {
  it(`works`, () => {
    expect(hoursInSeconds(-1)).toBe(-3600);
    expect(hoursInSeconds(0)).toBe(0);
    expect(hoursInSeconds(1)).toBe(3600);
    expect(hoursInSeconds(2)).toBe(7200);
    expect(hoursInSeconds(1.5)).toBe(5400);
  });
});

describe(`hoursInMs`, () => {
  it(`works`, () => {
    expect(hoursInMs(-1)).toBe(-3600000);
    expect(hoursInMs(0)).toBe(0);
    expect(hoursInMs(1)).toBe(3600000);
    expect(hoursInMs(2)).toBe(7200000);
    expect(hoursInMs(1.5)).toBe(5400000);
  });
});
