import { randomIntRange, randomRange, wrap } from "./num";
import { getRng } from "./Random";

export function randomIntFromRange(range: Range, rng = getRng()): number {
  return randomIntRange(range.min, range.max, rng);
}

export function randomFromRange(range: Range, rng = getRng()): number {
  return randomRange(range.min, range.max, rng);
}

export function wrapFromRange(value: number, range: Range): number {
  return wrap(value, range.min, range.max);
}

export interface Range {
  min: number;
  max: number;
}

export const createRange = (min = 0, max = 0): Range => ({ min, max });
