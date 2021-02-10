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
export type TypeEqual<Target, Value> = Exclude<Target, Value> extends never
  ? Exclude<Value, Target> extends never
    ? true
    : false
  : false;

/**
 * Asserts the `value` type is assignable to the generic `Type`.
 *
 * ```ts
 * expectType<number>(123);
 * expectType<boolean>(true);
 * ```
 */
export const expectType = <Type>(value: Type): void => void 0;
