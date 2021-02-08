/**
 * Checks that `Value` is assignable to `Target`. For example:
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
 * Checks that `Value` is equal to the same type as `Target`. For example:
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
 * Assert the parameter is of a specific type.
 */
export const expectType = <T>(condition: T): void => void 0;
