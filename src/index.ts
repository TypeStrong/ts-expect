/**
 * Checks that `T` is of type `U`.
 */
export type TypeOf<T, U> = Exclude<U, T> extends never ? true : false;

/**
 * Assert the parameter is of a specific type.
 */
export const expectType = <T>(_: T): void => undefined;
