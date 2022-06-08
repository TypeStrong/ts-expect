/**
 * Checks that `Value` is assignable to `Target`.
 *
 * ```ts
 * expectType<TypeOf<number, 123>>(true);
 * expectType<TypeOf<123, number>>(false);
 * ```
 */
export type TypeOf<Target, Value> = Exclude<Value, Target> extends never
  ? true
  : false;

/**
 * Checks that `Value` is equal to the same type as `Target`.
 *
 * ```ts
 * expectType<TypeEqual<123, 123>>(true);
 * expectType<TypeEqual<123, number>>(false);
 * expectType<TypeEqual<number, 123>>(false);
 * expectType<TypeEqual<number, number>>(true);
 * ```
 */
export type TypeEqual<Target, Value> = (<T>() => T extends Target
  ? 1
  : 2) extends <T>() => T extends Value ? 1 : 2
  ? true
  : false;

/**
 * Asserts the `value` type is assignable to the generic `Type`.
 *
 * ```ts
 * expectType<number>(123);
 * expectType<boolean>(true);
 * ```
 */
export const expectType = <Type>(_: Type): void => void 0;

/**
 * Asserts the `value` type is `never`, i.e. this function should never be called.
 * If it is called at runtime, it will throw a `TypeError`. The return type is
 * `never` to support returning in exhaustive type checks.
 *
 * ```ts
 * return expectNever(value);
 * ```
 */
export const expectNever = (value: never): never => {
  throw new TypeError("Unexpected value: " + value);
};
