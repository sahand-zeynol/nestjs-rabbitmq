export const getPropertyName = (obj, expression) => {
  try {
    const res = {};
    Object.keys(obj).map((k) => {
      res[k] = () => k;
    });
    return expression(res)();
  } catch (e) {
    throw new Error(`${expression} not found!`);
  }
};

/**
 * Make delay
 *
 * @format
 * @param {number} ms - Milliseconds
 */

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
