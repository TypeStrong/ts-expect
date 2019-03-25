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
import { expectType, TypeOf, TypeEqual } from "ts-expect";

expectType<string>(123); // Compiler error!

expectType<TypeOf<number, 123>>(true);
expectType<TypeEqual<"test", "test">>(true);
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

## Prior Works

Some great prior works have been mentioned after publishing this package:

- [`dtslint`](https://github.com/Microsoft/dtslint) does type checks via comment directives and [inspired](https://github.com/Microsoft/dtslint/issues/126) this approach of using the compiler
- [`tsd-check`](https://github.com/SamVerschueren/tsd-check/issues/10) is a CLI that runs the TypeScript type checker over assertions
- [`type-plus`](https://github.com/unional/type-plus) comes with various type and runtime TypeScript assertions
- [`static-type-assert`](https://github.com/ksxnodemodules/static-type-assert) exposes a similar API surface with some type assertion functions

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
