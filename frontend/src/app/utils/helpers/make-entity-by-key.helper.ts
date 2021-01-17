export const makeEntityByKey = <T>(
  items: T[],
  predicate: (item: T) => number,
): Record<number, T> => {
  return items.reduce((prev, curr) => {
    prev[predicate(curr)] = curr;
    return prev;
  }, {});
};
