/**
 * @file array/prototypes.js
 * @description Custom re-implementations of built-in Array prototype methods.
 *
 * WHY: Building these from scratch is one of the best ways to understand how
 * JavaScript arrays actually work under the hood — iteration, callbacks,
 * `this` binding, and mutation vs. immutability.
 *
 * HOW TO USE:
 *   import "js-lab/array";   // auto-patches Array.prototype
 *   // or
 *   const { applyArrayPrototypes } = require("js-lab/array");
 *   applyArrayPrototypes();
 *
 * After calling applyArrayPrototypes(), all arrays gain the `my*` methods:
 *   [1,2,3].myMap(x => x * 2)  // [2, 4, 6]
 */

"use strict";

// ─────────────────────────────────────────────────────────────
// MUTATION METHODS  (change the original array)
// ─────────────────────────────────────────────────────────────

/**
 * myPush — Adds one or more elements to the END of an array.
 *
 * How it works: Arrays in JS are objects whose keys are indices.
 * this[this.length] = x  creates the next index slot directly.
 *
 * Native equivalent: Array.prototype.push
 *
 * @param {...*} items - One or more values to add.
 * @returns {number} The new length of the array.
 *
 * @example
 * const arr = [1, 2];
 * arr.myPush(3, 4); // returns 4, arr is now [1, 2, 3, 4]
 */
function myPush(...items) {
  for (let i = 0; i < items.length; i++) {
    // Directly assign to the next available index slot
    this[this.length] = items[i];
  }
  return this.length;
}

/**
 * myPop — Removes and returns the LAST element of an array.
 *
 * How it works: We grab the last element, then shrink this.length by 1.
 * Shrinking .length causes JS to automatically discard the last slot.
 *
 * Native equivalent: Array.prototype.pop
 *
 * @returns {*} The removed element, or undefined if the array is empty.
 *
 * @example
 * const arr = [1, 2, 3];
 * arr.myPop(); // returns 3, arr is now [1, 2]
 */
function myPop() {
  // Guard: nothing to pop from an empty array
  if (this.length === 0) return undefined;

  const lastElement = this[this.length - 1];

  // Reducing length removes the last element — JS arrays are length-bound
  this.length = this.length - 1;

  return lastElement;
}

/**
 * myShift — Removes and returns the FIRST element of an array.
 *
 * How it works: We save element[0], then shift every element one index
 * to the left to fill the gap, and shrink the length.
 *
 * Native equivalent: Array.prototype.shift
 *
 * @returns {*} The removed element, or undefined if the array is empty.
 *
 * @example
 * const arr = [1, 2, 3];
 * arr.myShift(); // returns 1, arr is now [2, 3]
 */
function myShift() {
  if (this.length === 0) return undefined;

  const firstElement = this[0];

  // Move every element one position to the left
  for (let i = 0; i < this.length - 1; i++) {
    this[i] = this[i + 1];
  }

  // The last slot is now a duplicate — shrink length to remove it
  this.length = this.length - 1;

  return firstElement;
}

/**
 * myUnshift — Adds one or more elements to the BEGINNING of an array.
 *
 * How it works: We shift existing elements right to make room, then
 * place the new element at index 0.
 *
 * NOTE: Currently supports a single element. Multi-element support is pending.
 * Native equivalent: Array.prototype.unshift
 *
 * @param {*} x - The element to add at the start.
 * @returns {number} The new length of the array.
 *
 * @example
 * const arr = [2, 3];
 * arr.myUnshift(1); // returns 3, arr is now [1, 2, 3]
 */
function myUnshift(x) {
  // Shift all existing elements one position to the right to make room at [0]
  for (let i = this.length - 1; i >= 0; i--) {
    this[i + 1] = this[i];
  }

  // Place the new element at the beginning
  this[0] = x;

  return this.length;
}

/**
 * myReverse — Reverses an array IN PLACE (mutates the original).
 *
 * How it works: Two-pointer technique — swap elements from both ends
 * moving inward until the pointers meet in the middle.
 *
 * Native equivalent: Array.prototype.reverse
 *
 * @returns {Array} The same (now reversed) array.
 *
 * @example
 * const arr = [1, 2, 3];
 * arr.myReverse(); // returns [3, 2, 1], arr is mutated
 */
function myReverse() {
  let start = 0;
  let end = this.length - 1;

  while (start < end) {
    // Classic swap using a temporary variable
    const temp = this[start];
    this[start] = this[end];
    this[end] = temp;

    start++;
    end--;
  }

  return this;
}

/**
 * mySplice — Removes elements from an array starting at a given index.
 *
 * How it works: Overwrite elements starting at `start` with elements
 * that come `deleteCount` positions ahead, then shrink the array.
 *
 * KNOWN LIMITATION: Does not yet return the deleted items or support
 * inserting new elements (native splice does both).
 *
 * Native equivalent: Array.prototype.splice
 *
 * @param {number} start - Index to start removing from.
 * @param {number} deleteCount - How many elements to remove.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * arr.mySplice(1, 2); // arr becomes [1, 4, 5]
 */
function mySplice(start, deleteCount) {
  // Shift elements left to fill the deleted gap
  for (let i = start; i < this.length; i++) {
    this[i] = this[i + deleteCount];
  }

  // Shrink the array by the number of deleted items
  this.length = this.length - deleteCount;

  // TODO: Collect and return deleted items
  // TODO: Support inserting new elements at `start`
}

// ─────────────────────────────────────────────────────────────
// ITERATION / TRANSFORMATION METHODS  (return new values)
// ─────────────────────────────────────────────────────────────

/**
 * myForEach — Calls a function once for every element in the array.
 *
 * How it works: Simply loops and invokes the callback — no return value,
 * just like the native forEach. Side effects only.
 *
 * Native equivalent: Array.prototype.forEach
 *
 * @param {Function} callback - Called as callback(element, index, array).
 *
 * @example
 * [1, 2, 3].myForEach(x => console.log(x)); // logs 1, 2, 3
 */
function myForEach(callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
  // Note: forEach always returns undefined
}

/**
 * myMap — Creates a NEW array by transforming every element.
 *
 * How it works: Runs the callback on each element and collects the
 * return values into a fresh array. Original array is NOT changed.
 *
 * Native equivalent: Array.prototype.map
 *
 * @param {Function} callback - Called as callback(element, index, array).
 *                              Its return value becomes the new element.
 * @returns {Array} A new array of transformed values.
 *
 * @example
 * [1, 2, 3].myMap(x => x * 2); // [2, 4, 6]
 */
function myMap(callback) {
  const newArr = [];
  for (let i = 0; i < this.length; i++) {
    // Push the result of each callback call into the new array
    newArr.push(callback(this[i], i, this));
  }
  return newArr;
}

/**
 * myFilter — Creates a NEW array with only elements that pass a test.
 *
 * How it works: Runs the callback on each element; if it returns truthy,
 * that element is kept. Elements that fail the test are skipped.
 *
 * Native equivalent: Array.prototype.filter
 *
 * @param {Function} callback - Called as callback(element, index, array).
 *                              Elements where this returns truthy are kept.
 * @returns {Array} A new array of elements that passed the test.
 *
 * @example
 * [1, 2, 3, 4].myFilter(x => x % 2 === 0); // [2, 4]
 */
function myFilter(callback) {
  const newArr = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      newArr.push(this[i]);
    }
  }
  return newArr;
}

/**
 * myFind — Returns the FIRST element that passes a test.
 *
 * How it works: Stops and returns as soon as the callback returns truthy.
 * If nothing matches, returns undefined.
 *
 * Native equivalent: Array.prototype.find
 *
 * @param {Function} callback - Called as callback(element, index, array).
 * @returns {*} The first matching element, or undefined.
 *
 * @example
 * [1, 3, 4, 6].myFind(x => x % 2 === 0); // 4
 */
function myFind(callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return this[i]; // Early return — stop on first match
    }
  }
  return undefined;
}

/**
 * myFindIndex — Returns the INDEX of the first element that passes a test.
 *
 * How it works: Same as myFind, but returns the index instead of the value.
 * Returns -1 if nothing matches (consistent with indexOf / lastIndexOf).
 *
 * Native equivalent: Array.prototype.findIndex
 *
 * @param {Function} callback - Called as callback(element, index, array).
 * @returns {number} Index of the first match, or -1.
 *
 * @example
 * [1, 3, 4, 6].myFindIndex(x => x % 2 === 0); // 2
 */
function myFindIndex(callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return i;
    }
  }
  return -1;
}

/**
 * myEvery — Returns true if ALL elements pass a test.
 *
 * How it works: Fails fast — returns false the moment one element fails.
 * If every element passes, returns true.
 *
 * Native equivalent: Array.prototype.every
 *
 * @param {Function} callback - Called as callback(element, index, array).
 * @returns {boolean}
 *
 * @example
 * [2, 4, 6].myEvery(x => x % 2 === 0); // true
 * [2, 3, 6].myEvery(x => x % 2 === 0); // false
 */
function myEvery(callback) {
  for (let i = 0; i < this.length; i++) {
    // Short-circuit: one failure means not every element passes
    if (!callback(this[i], i, this)) return false;
  }
  return true;
}

/**
 * mySome — Returns true if AT LEAST ONE element passes a test.
 *
 * How it works: Succeeds fast — returns true the moment one element passes.
 *
 * Native equivalent: Array.prototype.some
 *
 * @param {Function} callback - Called as callback(element, index, array).
 * @returns {boolean}
 *
 * @example
 * [1, 3, 5, 7].mySome(x => x % 2 === 0); // false
 * [1, 3, 4, 7].mySome(x => x % 2 === 0); // true
 */
function mySome(callback) {
  for (let i = 0; i < this.length; i++) {
    // Short-circuit: one match is enough
    if (callback(this[i], i, this)) return true;
  }
  return false;
}

/**
 * mySlice — Returns a SHALLOW COPY of a portion of an array.
 *
 * How it works: Copies elements from `start` up to (but not including) `end`.
 * The original array is not modified.
 *
 * NOTE: Negative indices and the case where end > length are handled.
 *
 * Native equivalent: Array.prototype.slice
 *
 * @param {number} [start=0] - Start index (inclusive).
 * @param {number} [end]     - End index (exclusive). Defaults to array length.
 * @returns {Array} A new array with the copied portion.
 *
 * @example
 * [1, 2, 3, 4, 5].mySlice(1, 3); // [2, 3]
 */
function mySlice(start = 0, end = this.length) {
  // Clamp `end` so we never go out of bounds
  const stop = end > this.length ? this.length : end;

  const newArr = [];
  for (let i = start; i < stop; i++) {
    newArr.push(this[i]);
  }
  return newArr;
}

/**
 * myLastIndexOf — Returns the last index of a given value, searching backwards.
 *
 * How it works: Loops from the end toward the beginning and returns the first
 * match it finds (which is the LAST occurrence in the original order).
 *
 * Native equivalent: Array.prototype.lastIndexOf
 *
 * @param {*} x - The value to search for.
 * @returns {number} The last index where x was found, or -1.
 *
 * @example
 * [2, 4, 2, 6, 2].myLastIndexOf(2); // 4
 */
function myLastIndexOf(x) {
  for (let i = this.length - 1; i >= 0; i--) {
    if (this[i] === x) return i;
  }
  return -1;
}

/**
 * Applies all custom Array prototype methods.
 *
 * Call this once at the entry point of your app to make all `my*` methods
 * available on every array.
 *
 * @example
 * import { applyArrayPrototypes } from "js-lab/array";
 * applyArrayPrototypes();
 * [1,2,3].myMap(x => x * 2); // [2, 4, 6]
 */
function applyArrayPrototypes() {
  Array.prototype.myPush = myPush;
  Array.prototype.myPop = myPop;
  Array.prototype.myShift = myShift;
  Array.prototype.myUnshift = myUnshift;
  Array.prototype.myReverse = myReverse;
  Array.prototype.mySplice = mySplice;
  Array.prototype.myForEach = myForEach;
  Array.prototype.myMap = myMap;
  Array.prototype.myFilter = myFilter;
  Array.prototype.myFind = myFind;
  Array.prototype.myFindIndex = myFindIndex;
  Array.prototype.myEvery = myEvery;
  Array.prototype.mySome = mySome;
  Array.prototype.mySlice = mySlice;
  Array.prototype.myLastIndexOf = myLastIndexOf;
}

module.exports = {
  applyArrayPrototypes,
  // Also export individual functions so they can be tested without patching prototype
  myPush,
  myPop,
  myShift,
  myUnshift,
  myReverse,
  mySplice,
  myForEach,
  myMap,
  myFilter,
  myFind,
  myFindIndex,
  myEvery,
  mySome,
  mySlice,
  myLastIndexOf,
};
