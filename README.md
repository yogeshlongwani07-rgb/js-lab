# js-lab

A small JavaScript utility library built from scratch to learn how core language features work under the hood.

It includes:

- custom `Array.prototype` methods
- custom `String.prototype` methods
- standalone array and string helpers
- debounce/throttle performance helpers
- a simple custom iterator

This project is written in **CommonJS** and is designed both for learning and for experimenting with JavaScript internals.

---

## Table of contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Modules](#modules)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Notes](#notes)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Learn how built-in array methods work by re-implementing them yourself
- Explore string helpers and prototype methods
- Use reusable utilities for interview-style array problems
- Control event frequency with `debounce` and `throttle`
- Create custom iterators that follow the Iterator Protocol

---

## Installation

```bash
npm install js-lab
```

Or clone the repository and work directly with the source files.

> Note: this package currently exposes module subpaths like `js-lab/array`, `js-lab/string`, `js-lab/performance`, and `js-lab/iterators`.

---

## Usage

### Array utilities

```js
const {
  applyArrayPrototypes,
  removeDuplicates,
  findMaxMin,
} = require("js-lab/array");

applyArrayPrototypes();

console.log([1, 2, 3].myMap((x) => x * 2));
// [2, 4, 6]

console.log(removeDuplicates([1, 2, 2, 3, 3, 4]));
// [1, 2, 3, 4]

console.log(findMaxMin([5, 9, 1, 7]));
// { min: 1, max: 9 }
```

### String utilities

```js
const {
  applyStringPrototypes,
  compressString,
  firstNonRepeatingChar,
} = require("js-lab/string");

applyStringPrototypes();

console.log("hello".myToUpperCase());
// HELLO

console.log(compressString("aaabbcccc"));
// a3b2c4

console.log(firstNonRepeatingChar("aabbcdd"));
// c
```

### Performance helpers

```js
const { debounce, throttle } = require("js-lab/performance");

const onSearch = debounce((query) => {
  console.log("Searching for:", query);
}, 300);

const onScroll = throttle(() => {
  console.log("Scroll event handled");
}, 100);
```

### Iterator helper

```js
const { makeIterator } = require("js-lab/iterators");

const iterator = makeIterator(0, 5, 2);

console.log(iterator.next());
// { value: 0, done: false }
console.log(iterator.next());
// { value: 2, done: false }
console.log(iterator.next());
// { value: 4, done: false }
```

---

## Modules

### `js-lab/array`

Contains both prototype methods and standalone array utilities.

#### Prototype methods

Call `applyArrayPrototypes()` once to attach the custom methods to `Array.prototype`.

#### Standalone utilities

Use these without modifying native prototypes.

### `js-lab/string`

Contains custom string prototype methods plus standalone string helpers.

### `js-lab/performance`

Contains `debounce` and `throttle` for controlling function execution rate.

### `js-lab/iterators`

Contains a custom iterator factory built around the Iterator Protocol.

---

## API Reference

### Array prototype methods

#### Mutation methods

- `myPush(...items)` — add items to the end of an array
- `myPop()` — remove the last element
- `myShift()` — remove the first element
- `myUnshift(x)` — add one element to the beginning
- `myReverse()` — reverse an array in place
- `mySplice(start, deleteCount)` — custom splice implementation

#### Iteration methods

- `myForEach(callback)`
- `myMap(callback)`
- `myFilter(callback)`
- `myFind(callback)`
- `myFindIndex(callback)`
- `myEvery(callback)`
- `mySome(callback)`
- `mySlice(start, end)`
- `myLastIndexOf(searchElement)`

### Standalone array utilities

- `removeDuplicates(arr)`
- `findFirstDuplicate(arr)`
- `findFirstMissingNumber(arr)`
- `findMaxMin(arr)`
- `findSecondLargest(arr)`
- `intersection(arr1, arr2)`
- `isSubarray(mainArr, subArr)`
- `majorityElement(arr)`
- `moveZerosToEnd(arr)`
- `reverseArray(arr)`
- `rotateArray(arr, k)`
- `myConcat(...arrays)`
- `myJoin(arr, separator)`
- `isPalindrome(arr)`

### String prototype methods

- `myToUpperCase()`
- `myToLowerCase()`
- `myIndexOf(char)`

### Standalone string utilities

- `compressString(str)`
- `firstNonRepeatingChar(str)`
- `stringToInteger(str)`

### Performance helpers

- `debounce(fn, delay)`
- `throttle(fn, delay)`

### Iterator helper

- `makeIterator(start, end, step)`

---

## Project Structure

```text
js-lab/
├── package.json
├── README.md
├── index.js
└── src/
    ├── array/
    │   ├── index.js
    │   ├── prototypes.js
    │   └── utils.js
    ├── string/
    │   └── index.js
    ├── performance/
    │   └── index.js
    └── iterators/
        └── index.js
```

---

## Notes

- This library is great for learning and experimenting with JavaScript behavior.
- Prototype patching is optional, but it should be used carefully in real projects.
- Some methods are educational re-implementations and may not fully match every edge case of the native JavaScript methods.

---

## Contributing

Pull requests, fixes, and improvements are welcome.

A good contribution usually includes:

- clear function names
- comments where the logic is not obvious
- examples in the README
- tests for new helpers

---

## License

Choose a valid SPDX license identifier in `package.json`, such as `MIT` or `UNLICENSED`.
