/**
 * Checks that `Value` is assignable to `Target`. For example:
 *
 * ```js
 * TypeOf<number, 123> //=> true
 * TypeOf<123, number> //=> false
 * ```
 */
export type TypeOf<Target, Value> = Exclude<Value, Target> extends never
  ? true
  : false;

/**
 * Checks that `Value` is equal to the same type as `Target`. For example:
 *
 * ```js
 * TypeEqual<number, number> //=> true
 * TypeEqual<number, 123> //=> false
 * TypeEqual<123, number> //=> false
 * TypeEqual<123, 123> //=> true
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
