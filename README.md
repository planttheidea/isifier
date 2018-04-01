# isifier

A validation library creator

## Table of contents

* [Summary](#summary)
* [Usage](#usage)
  * [addTest](#addtest)
* [Other methods](#other-methods)
  * [createInstance](#createinstance)
* [Browser support](#browser-support)
* [Development](#development)

## Summary

We all have seen a thousand validation libraries out there, but there is something they all have in common: they have way, way more tests than your project could ever need. All you need to do is validate strings, and you pull in something that validates social security numbers, canadian zip codes, and IPV6 addresses, which adds excess bloat to your application without any additional benefit.

With `isifier`, the library is only as targeted as you need it to be, as all it does is create a namespace for your tests and a method to add to it. It is _440 bytes_ minified and gzipped.

## Usage

```javascript
import is from "isifier";

// add common type tests
is.addTest("string", value => typeof value === "string");

console.log(is.string("foo")); // true
console.log(is.string(123)); // false

// or complex validation
is.addTest("important", ({ isImportant, textContent }) => {
  return (
    isImportant ||
    (is.string(textContent) && textContent.toLowerCase().includes("important"))
  );
});

console.log(is.important({ isImportant: true, textContent: null })); // true
console.log(
  is.important({
    isImportant: false,
    textContent: "I have IMPORANT stuff!"
  })
); // true

// it also adds "all" and "any" convienence methods to test multiple values at once
console.log(is.all.string("foo", "bar", "baz")); // true
console.log(
  is.any.important(
    { isImportant: false, textContent: null },
    { isImportant: false, textContent: "I am important" }
  )
); // true
```

#### addTest

_is.addTest(name: string, validator: function): boolean_

Adds a new validator test to the `is` object, accessible on all uses of `is` from that point on.

## Other methods

#### createInstance

Create a unique instance of `isifier`. Useful if you want to avoid collisions with other library applications.

```javascript
import is, { createInstance } from "isifier";

is.addTest("number", value => typeof value === "number");

const instance = createInstance();

console.log(instance === is); // false

instance.addTest("number", value => typeof value === "number" && !isNaN(value));

console.log(is.number(NaN)); // true
console.log(instance.number(NaN)); // false
```

## Browser support

* Chrome (all versions)
* Firefox (all versions)
* Edge (all versions)
* Opera 15+
* IE 9+
* Safari 6+
* iOS 8+
* Android 4+

## Development

Standard stuff, clone the repo and `npm install` dependencies. The npm scripts available:

* `build` => run webpack to build development `dist` file with NODE_ENV=development
* `build:minified` => run webpack to build production `dist` file with NODE_ENV=production
* `dev` => run webpack dev server to run example app / playground
* `dist` => runs `build` and `build:minified`
* `lint` => run ESLint against all files in the `src` folder
* `prepublish` => runs `prepublish:compile` when publishing
* `prepublish:compile` => run `lint`, `test:coverage`, `transpile:es`, `transpile:lib`, `dist`
* `test` => run AVA test functions with `NODE_ENV=test`
* `test:coverage` => run `test` but with `nyc` for coverage checker
* `test:watch` => run `test`, but with persistent watcher
* `transpile:lib` => run babel against all files in `src` to create files in `lib`
* `transpile:es` => run babel against all files in `src` to create files in `es`, preserving ES2015 modules (for
  [`pkg.module`](https://github.com/rollup/rollup/wiki/pkg.module))
