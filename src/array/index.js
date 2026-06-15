/**
 * @file array/index.js
 * @description Barrel file — re-exports everything from the array module.
 *
 * Import the whole module:
 *   const arrayUtils = require("js-lab/array");
 *
 * Or pick what you need:
 *   const { removeDuplicates, findMaxMin } = require("js-lab/array");
 *
 * To patch Array.prototype with the custom `my*` methods:
 *   const { applyArrayPrototypes } = require("js-lab/array");
 *   applyArrayPrototypes();
 */

"use strict";

const prototypes = require("./prototypes");
const utils = require("./utils");

module.exports = {
  // ── Prototype patching ────────────────────────────────────
  ...prototypes,

  // ── Standalone utilities ──────────────────────────────────
  ...utils,
};
