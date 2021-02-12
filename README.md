# TS Expect

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

> Checks values in TypeScript match expectations.

## Installation

```sh
npm install ts-expect --save
```

## Usage

**TS Expect** exports a function, named `expectType`, that does _nothing at all_. Instead, it depends on the TypeScript compiler and a generic to test the type of a "value" passed to `expectType` is assignable to its generic in the type system.

```ts
import { expectType } from "ts-expect";

expectType<string>("test");
expectType<number>(123);
expectType<number>("test"); // Compiler error!
```

### How does this work?

TypeScript generics allow you to pass any value that implements the generic type. In this case, we're defining the generic explicitly as we pass the value so any value that isn't implementing our type is rejected by the TypeScript compiler. It's really that simple! The technical implementation is just `<T>(value: T) => void`.

TypeScript has a ["top type"](https://en.wikipedia.org/wiki/Top_type) named `unknown` and a ["bottom type"](https://en.wikipedia.org/wiki/Bottom_type) named `never`. Using the top type to check assignability would mean every value is accepted, and the bottom type would mean nothing is accepted (except `never` itself). As a result, you probably wouldn't want to use `unknown` because everything would pass that check.

A quick note on `any`: it's an "off switch" for TypeScript. It acts as a magical every type, both a top and a bottom type. This means it's assignable to everything and passing an `any` value to `expectType` will always pass the check.

### Testing definitions

Use with built-in or custom TypeScript [utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html) to implement a simple testing framework for your type definitions. If it compiles, it's valid!

```ts
import { expectType, TypeEqual } from "ts-expect";
import { add } from "./adder";

expectType<number>(add(1, 2));
expectType<TypeEqual<boolean, ReturnType<typeof add>>>(true);
expectType<TypeEqual<[number, number], Parameters<typeof add>>>(true);
```

### Exhaustive checks

Use with TypeScript's [type narrowing](https://sandersn.github.io/manual/Widening-and-Narrowing-in-Typescript.html) to test that `value` is what you expect. If you expand `SupportedValue` with other values in the future, it'll fail an `expectType<never>` or `expectNever` check because you haven't used all the possible values.

```ts
import { expectNever } from "ts-expect";

type SupportedValue = "a" | "b";

function doSomething(value: SupportedValue) {
  switch (value) {
    case "a":
      return true;
    case "b":
      return true;
    default:
      return expectNever(value);
  }
}
```

**Tip**: Use `expectNever(value)` when you need to return `never` (i.e. throw an error if the code runs), use `expectType<never>(value)` when you want to do tests in your code and expect the actual expression to be executed (i.e. do type checks but ignore the runtime).

## Exported Types

**TS Expect** comes with some utility types built-in to make testing easier. File [an issue](https://github.com/TypeStrong/ts-expect/issues) if you think something is missing!

### TypeEqual<Target, Value>

Checks that `Value` is equal to the same type as `Target`. This is a stricter check that avoids issues with testing sub-types. If you want to verify that an object is identical shape, not just "implements" `Target`, this is the type you need.

### TypeOf<Target, Value>

Checks that `Value` is assignable to `Target`. This is effectively the same as `expectType<Type>(value)`, except it's implemented in the type system directly so you can use it to test types instead of values by checking the result is `true` or `false`.

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
