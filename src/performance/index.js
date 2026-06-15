/**
 * @file performance/index.js
 * @description Debounce and Throttle — two essential performance patterns
 * for controlling how often a function can fire.
 *
 * These are among the most important tools for writing performant UIs.
 * They are commonly used on: scroll events, window resize, search inputs,
 * button clicks, and any event that fires at high frequency.
 *
 * Usage:
 *   const { debounce, throttle } = require("js-lab/performance");
 */

"use strict";

/**
 * debounce — Delays a function call until AFTER a quiet period.
 *
 * MENTAL MODEL: Imagine an elevator door. Every time someone presses the
 * button, the timer resets. The door only closes once nobody has pressed
 * the button for `delay` milliseconds.
 *
 * USE WHEN: You want to react only to the FINAL event in a rapid burst.
 * Classic example: don't fire a search API call on every keystroke —
 * wait until the user stops typing.
 *
 * How it works:
 *  - On each call, cancel any pending timer with clearTimeout.
 *  - Start a fresh timer. If `delay` ms pass without another call,
 *    the timer fires and the actual function runs.
 *
 * @param {Function} fn    - The function to debounce.
 * @param {number}   delay - Quiet period in milliseconds.
 * @returns {Function} A debounced wrapper function.
 *
 * @example
 * const onSearch = debounce((query) => fetchResults(query), 300);
 * inputEl.addEventListener("input", (e) => onSearch(e.target.value));
 * // fetchResults fires 300ms after the user stops typing
 */
function debounce(fn, delay) {
  // `timer` lives in the closure — shared across all calls to the wrapper
  let timer;

  return function (...args) {
    // Cancel the previously scheduled call (if any)
    clearTimeout(timer);

    // Schedule a new call after `delay` ms
    // Using arrow function to preserve `this` from the call site
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * throttle — Ensures a function fires at MOST once per time window.
 *
 * MENTAL MODEL: A machine gun with a rate limiter. No matter how fast
 * you pull the trigger, it only fires once per interval.
 *
 * USE WHEN: You want the function to fire regularly during a burst, but
 * not on every single event. Classic example: updating a position on
 * scroll — you want updates, just not 60 per second.
 *
 * How it works:
 *  - Track when the function last ran (`lastCall`).
 *  - On each call, check if enough time (`delay`) has passed.
 *  - If yes, run the function and update `lastCall`.
 *  - If no, ignore the call entirely.
 *
 * KEY DIFFERENCE FROM DEBOUNCE:
 *  - Debounce: waits for silence, then fires ONCE at the end.
 *  - Throttle: fires periodically THROUGHOUT the burst (every `delay` ms).
 *
 * @param {Function} fn    - The function to throttle.
 * @param {number}   delay - Minimum milliseconds between calls.
 * @returns {Function} A throttled wrapper function.
 *
 * @example
 * const onScroll = throttle(() => updateScrollIndicator(), 100);
 * window.addEventListener("scroll", onScroll);
 * // updateScrollIndicator runs at most once every 100ms
 */
function throttle(fn, delay) {
  // Timestamp of the last time fn was actually invoked
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();

    // Only execute if enough time has passed since the last call
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
    // Otherwise: silently ignore this call
  };
}

module.exports = { debounce, throttle };
