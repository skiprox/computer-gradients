/**
 * Linear interpolation
 * @param  {number} v0 [lower bound]
 * @param  {number} v1 [upper bound]
 * @param  {number} t  [value between 0 and 1]
 * @return {number}    [interpolated value]
 */
export const Lerp = (v0, v1, t) => {
  return v0*(1-t)+v1*t;
};
/**
 * Clamp
 * @param  {number} min [minimum number]
 * @param  {number} max [maximum number]
 * @param  {number} num [number to clamp]
 * @return {number}     [clamped number]
 */
export const Clamp = (min, max, num) => {
  return Math.min(Math.max(num, min), max);
};
