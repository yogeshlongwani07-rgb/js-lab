/**
 * @file iterators/index.js
 * @description Custom iterator implementations.
 *
 * JavaScript iterators follow the Iterator Protocol:
 *   - An object with a `next()` method.
 *   - `next()` returns { value: <any>, done: <boolean> }.
 *   - When done is true, the iterator is exhausted.
 *
 * This is the same protocol that powers for...of loops, spread (...),
 * destructuring, and generators under the hood.
 *
 * Usage:
 *   const { makeIterator } = require("js-lab/iterators");
 */

"use strict";

/**
 * makeIterator — Creates a custom range iterator.
 *
 * How it works:
 *  - Maintains `current` (the value to return next) and `iterationCount`.
 *  - Each call to `next()` returns the current value and advances by `step`.
 *  - When `iterationCount` reaches `end`, the iterator signals done.
 *
 * NOTE: `end` here acts as a COUNT (number of iterations), not a max value.
 * This matches the original code. If you want value-based end, see the
 * TODO below.
 *
 * @param {number} [start=0]    - Starting value.
 * @param {number} [end=Infinity] - Maximum number of iterations.
 * @param {number} [step=1]     - How much to increment each step.
 * @returns {{ next: Function }} An iterator object.
 *
 * @example
 * const it = makeIterator(0, 5, 2);
 * it.next(); // { value: 0, done: false }
 * it.next(); // { value: 2, done: false }
 * it.next(); // { value: 4, done: false }
 * it.next(); // { value: 6, done: false }
 * it.next(); // { value: 8, done: false }
 * it.next(); // { value: undefined, done: true }
 *
 * // Works with a while loop:
 * const counter = makeIterator(10, 3, 1);
 * let result = counter.next();
 * while (!result.done) {
 *   console.log(result.value); // 10, 11, 12
 *   result = counter.next();
 * }
 */
function makeIterator(start = 0, end = Infinity, step = 1) {
  let current = start;
  let iterationCount = 0;

  return {
    /**
     * next — Advances the iterator and returns the next value.
     * @returns {{ value: *, done: boolean }}
     */
    next() {
      if (iterationCount < end) {
        const result = { value: current, done: false };
        current += step;
        iterationCount++;
        return result;
      }

      // Iterator is exhausted
      return { value: undefined, done: true };
    },
  };

  // TODO: Add a value-based version where end is the max VALUE:
  // e.g. makeRangeIterator(0, 10, 2) → 0, 2, 4, 6, 8 (stops when current >= end)
}

module.exports = { makeIterator };
