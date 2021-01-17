export const areSetsEqual = <T>(a: Set<T>, b: Set<T>): boolean => {
  if (a.size !== b.size) return false;
  for (let ael of a) if (!b.has(ael)) return false;
  return true;
};

// Borrowed from: https://2ality.com/2015/01/es6-set-operations.html
export const getDifferenceBetweenSets = <T>(a: Set<T>, b: Set<T>): Set<T> =>
  new Set([...a].filter((x) => !b.has(x)));
