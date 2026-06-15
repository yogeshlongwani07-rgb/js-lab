/**
 * @file string/index.js
 * @description Custom String prototype methods and standalone string utilities.
 *
 * Prototype methods patch String.prototype with `my*` equivalents.
 * Utility functions work on plain string arguments.
 *
 * Usage:
 *   const { applyStringPrototypes, compressString } = require("js-lab/string");
 *   applyStringPrototypes();
 *   "Hello".myToUpperCase(); // "HELLO"
 */

"use strict";

// ─────────────────────────────────────────────────────────────
// STRING PROTOTYPE METHODS
// ─────────────────────────────────────────────────────────────

/**
 * myToUpperCase — Converts all lowercase letters to uppercase.
 *
 * How it works: We maintain two aligned strings (lower + upper alphabet).
 * For each character, find its position in the lowercase string.
 * If found, replace it with the character at the same position in uppercase.
 * Non-alphabetic characters (digits, spaces, punctuation) are kept as-is.
 *
 * Native equivalent: String.prototype.toUpperCase
 *
 * @returns {string} A new uppercased string.
 *
 * @example
 * "hello world".myToUpperCase(); // "HELLO WORLD"
 */
function myToUpperCase() {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";

  for (let i = 0; i < this.length; i++) {
    const index = lower.indexOf(this[i]);
    // -1 means the character is not a lowercase letter — keep it unchanged
    result += index === -1 ? this[i] : upper[index];
  }

  return result;
}

/**
 * myToLowerCase — Converts all uppercase letters to lowercase.
 *
 * Mirror of myToUpperCase — same technique in reverse.
 *
 * Native equivalent: String.prototype.toLowerCase
 *
 * @returns {string} A new lowercased string.
 *
 * @example
 * "HELLO World".myToLowerCase(); // "hello world"
 */
function myToLowerCase() {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";

  for (let i = 0; i < this.length; i++) {
    const index = upper.indexOf(this[i]);
    // -1 means the character is not an uppercase letter — keep it unchanged
    result += index === -1 ? this[i] : lower[index];
  }

  return result;
}

/**
 * myIndexOf — Returns the index of the FIRST occurrence of a character.
 *
 * KNOWN LIMITATION: Only matches single characters, not substrings like "lo".
 * The native String.prototype.indexOf supports full substring search.
 *
 * @param {string} char - A single character to search for.
 * @returns {number} Index of first match, or -1 if not found.
 *
 * @example
 * "hello".myIndexOf("l"); // 2
 * "hello".myIndexOf("z"); // -1
 */
function myIndexOf(char) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === char) return i;
  }
  return -1;
}

/**
 * Applies all custom String prototype methods.
 *
 * Call once at app startup to make all `my*` string methods available.
 *
 * @example
 * applyStringPrototypes();
 * "hello".myToUpperCase(); // "HELLO"
 */
function applyStringPrototypes() {
  String.prototype.myToUpperCase = myToUpperCase;
  String.prototype.myToLowerCase = myToLowerCase;
  String.prototype.myIndexOf = myIndexOf;
}

// ─────────────────────────────────────────────────────────────
// STANDALONE STRING UTILITIES
// ─────────────────────────────────────────────────────────────

/**
 * compressString — Run-length encodes a string.
 *
 * How it works: Walk the string; when consecutive characters are the same,
 * increase a counter. When the character changes, write the character
 * followed by its count. Reset the counter for the new character.
 *
 * @param {string} str - The input string.
 * @returns {string} The compressed string, e.g. "aabbc" → "a2b2c1".
 *
 * @example
 * compressString("aaaaabbbcccc"); // "a5b3c4"
 */
function compressString(str) {
  if (str.length === 0) return "";

  let result = "";
  let count = 1;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      // Same character as next — keep counting
      count++;
    } else {
      // Character changed (or end of string) — write char + count, reset
      result += str[i] + count;
      count = 1;
    }
  }

  return result;
}

/**
 * firstNonRepeatingChar — Returns the first character that appears only once.
 *
 * How it works:
 *  1. Build a frequency map: { character → how many times it appears }.
 *  2. Walk the original string again; the first character with count === 1 wins.
 *
 * Two passes, both O(n) — overall O(n).
 *
 * @param {string} str - The input string.
 * @returns {string|null} The first non-repeating character, or null if all repeat.
 *
 * @example
 * firstNonRepeatingChar("aabbccdeff"); // "d" — wait, actually it's first unique
 * firstNonRepeatingChar("aabb");       // null
 */
function firstNonRepeatingChar(str) {
  // Pass 1: count frequency of each character
  const freq = {};
  for (let i = 0; i < str.length; i++) {
    freq[str[i]] = (freq[str[i]] || 0) + 1;
  }

  // Pass 2: find the first character with a count of exactly 1
  for (let i = 0; i < str.length; i++) {
    if (freq[str[i]] === 1) return str[i];
  }

  return null; // Every character appeared more than once
}

/**
 * stringToInteger — Converts a numeric string to an integer.
 *
 * This is a thin wrapper around parseInt that always uses base 10.
 * Using base 10 explicitly avoids bugs with strings like "08" being
 * treated as octal in older environments.
 *
 * @param {string} str - A string representing a number (e.g. "42").
 * @returns {number} The parsed integer, or NaN if not a valid number.
 *
 * @example
 * stringToInteger("42");  // 42
 * stringToInteger("-7");  // -7
 * stringToInteger("abc"); // NaN
 */
function stringToInteger(str) {
  return parseInt(str, 10);
}

module.exports = {
  // Prototype patching
  applyStringPrototypes,
  myToUpperCase,
  myToLowerCase,
  myIndexOf,

  // Standalone utilities
  compressString,
  firstNonRepeatingChar,
  stringToInteger,
};
