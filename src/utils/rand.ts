import { getRng, Random } from "./Random";
import { removeAt } from "./array";

export const randomIndex = <T>(items: T[]): number =>
  Math.floor(getRng().nextNumber() * items.length);

type NonEmptyArray<T> = [T, ...T[]];

export const randomOne = <T>(items: NonEmptyArray<T>): T => {
  return randomOneNullable(items)!;
};

export const randomOneNullable = <T>(items: T[]): T | null => {
  if (items.length == 0) return null;
  return items[randomIndex(items)]!;
};

export function randomFew<T>(items: T[], count: number): T[] {
  let input = [...items];
  const output: T[] = [];

  for (let i = 0; i < count; i++) {
    if (input.length == 0) return output;
    const index = randomIndex(input);
    output.push(input[index]!);
    input = removeAt(input, index);
  }

  return output;
}

// Borrowed from: https://blobfolio.com/2019/randomizing-weighted-choices-in-javascript/
export const weightedRandomOne = <T>(data: [T, number][]): T | undefined => {
  if (data.length == 0) return undefined;

  // First, we loop the main dataset to count up the total weight.
  // We're starting the counter at one because the upper boundary
  // of Math.random() is exclusive.
  let total = 0;
  for (let i = 0; i < data.length; ++i) {
    total += data[i]![1];
  }

  // Total in hand, we can now pick a random value akin to our
  // random index from before.
  const threshold = Math.random() * total;

  // Now we just need to loop through the main data one more time
  // until we discover which value would live within this
  // particular threshold. We need to keep a running count of
  // weights as we go, so let's just reuse the "total" variable
  // since it was already declared.
  total = 0;
  for (let i = 0; i < data.length - 1; ++i) {
    // Add the weight to our running total.
    total += data[i]![1];

    // If this value falls within the threshold, we're done!
    if (total >= threshold) {
      return data[i]![0];
    }
  }

  // Wouldn't you know it, we needed the very last entry!
  return data[data.length - 1]![0];
};

export const randomiseNumber = (
  num: number,
  byPercentageRatio: number,
  rng: Random = getRng(),
): number => {
  const min = num * (1 - byPercentageRatio);
  const max = num * (1 + byPercentageRatio);
  return rng.nextNumber() * (max - min + 1) + min;
};
