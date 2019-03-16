# TS Expect

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

> Checks TypeScript types match expected values.

**Why?** This is useful for designing type assertions against the TypeScript compiler. It allows you to catch a subset of issues in the compiler before runtime.

## Installation

```sh
npm install ts-expect --save
```

## Usage

```ts
import { expectType, TypeOf } from "ts-expect";

expectType<string>(123); // Compiler error!
```

### Examples

```ts
export Type = "foo" | "bar";

function validateType(type: string): type is Type {
  if (type === "foo") {
    expectType<TypeOf<typeof type, Type>>(true); // Compiler error! Forgot `type === "bar"`.
    return true;
  }

  return false;
}

function doSomething(type: Type) {
  if (type === "foo") return; // Do something with `foo`.

  expectType<never>(type); // Compiler error! Forgot `type === "bar"`.

  throw new TypeError(`Unknown type: ${type}`)
}

// Test function signatures.
expectType<TypeOf<[number], Parameters<typeof validateType>>>(false);
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/ts-expect.svg?style=flat
[npm-url]: https://npmjs.org/package/ts-expect
[downloads-image]: https://img.shields.io/npm/dm/ts-expect.svg?style=flat
[downloads-url]: https://npmjs.org/package/ts-expect
[travis-image]: https://img.shields.io/travis/TypeStrong/ts-expect.svg?style=flat
[travis-url]: https://travis-ci.org/TypeStrong/ts-expect
[coveralls-image]: https://img.shields.io/coveralls/TypeStrong/ts-expect.svg?style=flat
[coveralls-url]: https://coveralls.io/r/TypeStrong/ts-expect?branch=master
