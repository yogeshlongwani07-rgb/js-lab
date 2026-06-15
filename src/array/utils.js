/**
 * @file array/utils.js
 * @description Standalone array utility functions — algorithms commonly
 * asked in interviews and useful in real applications.
 *
 * These are pure functions: they do NOT modify Array.prototype.
 * Import only what you need:
 *
 *   const { removeDuplicates, findMaxMin } = require("js-lab/array");
 */

"use strict";

/**
 * removeDuplicates — Returns a new array with all duplicate values removed.
 *
 * How it works: Walk the array and only add each element to the result
 * if we haven't seen it before (using `includes` to check).
 *
 * Time complexity: O(n²) because `includes` is itself O(n).
 * A faster version would use a Set: O(n).
 *
 * @param {Array} arr - The input array (not mutated).
 * @returns {Array} A new array with unique values only.
 *
 * @example
 * removeDuplicates([1, 2, 2, 3, 4, 4]); // [1, 2, 3, 4]
 */
function removeDuplicates(arr) {
  const seen = [];
  for (let i = 0; i < arr.length; i++) {
    if (!seen.includes(arr[i])) {
      seen.push(arr[i]);
    }
  }
  return seen;
}

/**
 * findFirstDuplicate — Returns the first element that appears more than once.
 *
 * How it works: As we iterate, we track which values we've already encountered.
 * The first value we encounter for the second time is our answer.
 *
 * @param {Array} arr - The input array.
 * @returns {*} The first duplicate value, or -1 if none found.
 *
 * @example
 * findFirstDuplicate([1, 2, 3, 3, 4, 5]); // 3
 * findFirstDuplicate([1, 2, 3]);           // -1
 */
function findFirstDuplicate(arr) {
  const seen = [];
  for (let i = 0; i < arr.length; i++) {
    if (seen.includes(arr[i])) {
      return arr[i]; // Found a duplicate — return immediately
    }
    seen.push(arr[i]);
  }
  return -1; // No duplicates found
}

/**
 * findFirstMissingNumber — Finds the first "gap" in a sequential sorted array.
 *
 * How it works: In a consecutive array, each pair of neighbours should differ
 * by exactly 1. The first pair that doesn't tells us the missing number.
 *
 * ASSUMPTION: The array is sorted in ascending order.
 *
 * @param {number[]} arr - A sorted array of numbers.
 * @returns {number} The first missing number, or -1 if no gap.
 *
 * @example
 * findFirstMissingNumber([2, 3, 4, 6, 7]); // 5
 * findFirstMissingNumber([1, 2, 3, 4]);    // -1
 */
function findFirstMissingNumber(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    // If the difference between neighbours isn't 1, there's a gap
    if (arr[i + 1] - arr[i] !== 1) {
      return arr[i] + 1;
    }
  }
  return -1; // No gaps found
}

/**
 * findMaxMin — Finds both the maximum and minimum values in a single pass.
 *
 * How it works: Start with the first element as both max and min,
 * then update each as we encounter larger/smaller values.
 *
 * Time complexity: O(n) — one loop, two comparisons per step.
 *
 * @param {number[]} arr - Array of numbers.
 * @returns {{ min: number, max: number }} An object with both values.
 *
 * @example
 * findMaxMin([2, 5, 1, 8, 3]); // { min: 1, max: 8 }
 */
function findMaxMin(arr) {
  if (arr.length === 0) return { min: undefined, max: undefined };

  let min = arr[0];
  let max = arr[0];

  // Start at index 1 since we already set both to arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i];
    if (arr[i] > max) max = arr[i];
  }

  return { min, max };
}

/**
 * findSecondLargest — Returns the second largest unique value in an array.
 *
 * How it works:
 *  1. Find the largest value.
 *  2. Remove it from a copy of the array.
 *  3. Find the largest of what remains — that's the second largest.
 *
 * @param {number[]} arr - Array of numbers.
 * @returns {number|null} The second largest value, or null if < 2 elements.
 *
 * @example
 * findSecondLargest([3, 1, 4, 1, 5, 9, 2, 6]); // 6
 */
function findSecondLargest(arr) {
  if (arr.length < 2) return null;

  // Step 1: Find the largest value
  let largest = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > largest) largest = arr[i];
  }

  // Step 2: Remove the first occurrence of the largest from a copy
  const copy = [...arr];
  const indexOfLargest = copy.indexOf(largest);
  copy.splice(indexOfLargest, 1);

  // Step 3: Find the largest among what's left
  let secondLargest = copy[0];
  for (let i = 1; i < copy.length; i++) {
    if (copy[i] > secondLargest) secondLargest = copy[i];
  }

  return secondLargest;
}

/**
 * intersection — Returns elements that exist in BOTH arrays.
 *
 * How it works: For each element in arr1, check if it also exists in arr2.
 * If yes, include it in the result.
 *
 * Time complexity: O(n * m) — nested loops.
 * Faster alternative: use a Set for O(n + m).
 *
 * @param {Array} arr1 - First array.
 * @param {Array} arr2 - Second array.
 * @returns {Array} Elements present in both arrays.
 *
 * @example
 * intersection([1, 2, 3, 4], [3, 4, 5, 6]); // [3, 4]
 */
function intersection(arr1, arr2) {
  const result = [];
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        result.push(arr1[i]);
      }
    }
  }
  return result;
}

/**
 * isSubarray — Checks if arr1 appears as a contiguous sequence inside arr2.
 *
 * How it works: For every position in arr2, try to match arr1 starting
 * from that position. If all elements match in order, it's a subarray.
 *
 * @param {Array} arr1 - The smaller array to look for.
 * @param {Array} arr2 - The larger array to search within.
 * @returns {boolean} True if arr1 is a contiguous subarray of arr2.
 *
 * @example
 * isSubarray([1, 2, 3], [4, 1, 2, 3, 5]); // true
 * isSubarray([1, 3],    [4, 1, 2, 3, 5]); // false (not contiguous)
 */
function isSubarray(arr1, arr2) {
  // We only need to check starting positions where arr1 could fit
  for (let i = 0; i <= arr2.length - arr1.length; i++) {
    let matched = true;

    // Try to match every element of arr1 starting at position i in arr2
    for (let j = 0; j < arr1.length; j++) {
      if (arr2[i + j] !== arr1[j]) {
        matched = false;
        break; // No point checking further from this start position
      }
    }

    if (matched) return true;
  }
  return false;
}

/**
 * majorityElement — Finds the element that appears MORE than any other.
 *
 * How it works: Count how many times each element appears using nested loops.
 * Track the highest count seen and which element achieved it.
 *
 * Time complexity: O(n²) — use Boyer-Moore Voting for O(n).
 *
 * @param {Array} arr - The input array.
 * @returns {*} The element with the highest frequency.
 *
 * @example
 * majorityElement([3, 3, 4, 2, 4, 4, 4]); // 4
 */
function majorityElement(arr) {
  let highestCount = 0;
  let result;

  for (let i = 0; i < arr.length; i++) {
    let count = 0;

    // Count how many times arr[i] appears in the entire array
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] === arr[j]) count++;
    }

    // If this element appears more than any previous winner, it's the new leader
    if (count > highestCount) {
      highestCount = count;
      result = arr[i];
    }
  }

  return result;
}

/**
 * moveZerosToEnd — Moves all zeros to the end while preserving order of others.
 *
 * How it works: Walk through the array; when we find a zero, remove it from
 * its current position and push it to the end.
 *
 * NOTE: Mutates the original array.
 *
 * @param {Array} arr - Array to process (mutated in place).
 * @returns {Array} The same array with zeros moved to the end.
 *
 * @example
 * moveZerosToEnd([0, 1, 3, 0, 8]); // [1, 3, 8, 0, 0]
 */
function moveZerosToEnd(arr) {
  let i = 0;
  while (i < arr.length) {
    if (arr[i] === 0) {
      // Remove the zero from current position and place it at the end
      arr.splice(i, 1);
      arr.push(0);
      // Don't increment i — the element that slid into this position needs checking
    } else {
      i++;
    }
  }
  return arr;
}

/**
 * reverseArray — Returns a NEW reversed array (does NOT mutate the original).
 *
 * How it works: Two-pointer swap on a copy of the array.
 * Two approaches are included to show different solutions.
 *
 * @param {Array} arr - The input array.
 * @returns {Array} A new reversed array.
 *
 * @example
 * reverseArray([1, 2, 3, 4, 5]); // [5, 4, 3, 2, 1]
 */
function reverseArray(arr) {
  // Create a copy so we don't mutate the original
  const copy = [...arr];
  let start = 0;
  let end = copy.length - 1;

  while (start < end) {
    const temp = copy[start];
    copy[start] = copy[end];
    copy[end] = temp;
    start++;
    end--;
  }

  return copy;
}

/**
 * rotateArray — Rotates array elements to the RIGHT by k positions.
 *
 * How it works: The last k elements wrap around to the front.
 * We splice them off the end and unshift them to the beginning.
 *
 * NOTE: Mutates the original array.
 *
 * @param {Array}  arr - The array to rotate.
 * @param {number} k   - Number of positions to rotate right.
 * @returns {Array} The rotated array.
 *
 * @example
 * rotateArray([1, 2, 3, 4, 5], 2); // [4, 5, 1, 2, 3]
 */
function rotateArray(arr, k) {
  // Normalise k in case it's larger than the array length
  k = k % arr.length;

  // Extract the last k elements
  const tail = arr.splice(arr.length - k, k);

  // Prepend them to the front
  arr.unshift(...tail);

  return arr;
}

/**
 * myConcat — Concatenates two arrays into a new array.
 *
 * How it works: Walk both arrays and copy each element into a new one.
 * Original arrays are not modified.
 *
 * Native equivalent: Array.prototype.concat
 *
 * @param {Array} arr1 - First array.
 * @param {Array} arr2 - Second array.
 * @returns {Array} A new array combining both.
 *
 * @example
 * myConcat([1, 2], [3, 4]); // [1, 2, 3, 4]
 */
function myConcat(arr1, arr2) {
  const result = [];
  for (let i = 0; i < arr1.length; i++) result.push(arr1[i]);
  for (let j = 0; j < arr2.length; j++) result.push(arr2[j]);
  return result;
}

/**
 * myJoin — Joins array elements into a string with a separator.
 *
 * Native equivalent: Array.prototype.join
 *
 * @param {Array}  arr       - The array to join.
 * @param {string} separator - String placed between elements (default: ",").
 * @returns {string} The joined string.
 *
 * @example
 * myJoin([1, 2, 3], "-"); // "1-2-3"
 * myJoin(["a", "b"]);     // "a,b"
 */
function myJoin(arr, separator = ",") {
  let result = "";
  for (let i = 0; i < arr.length; i++) {
    result += arr[i];
    // Don't add separator after the last element
    if (i < arr.length - 1) result += separator;
  }
  return result;
}

/**
 * isPalindrome — Checks whether an array reads the same forwards and backwards.
 *
 * How it works: Reverse a copy and compare element-by-element.
 *
 * @param {Array} arr - The array to test.
 * @returns {boolean} True if palindrome.
 *
 * @example
 * isPalindrome([1, 2, 3, 2, 1]); // true
 * isPalindrome([1, 2, 3]);       // false
 */
function isPalindrome(arr) {
  const reversed = [...arr].reverse();
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== reversed[i]) return false;
  }
  return true;
}

module.exports = {
  removeDuplicates,
  findFirstDuplicate,
  findFirstMissingNumber,
  findMaxMin,
  findSecondLargest,
  intersection,
  isSubarray,
  majorityElement,
  moveZerosToEnd,
  reverseArray,
  rotateArray,
  myConcat,
  myJoin,
  isPalindrome,
};
