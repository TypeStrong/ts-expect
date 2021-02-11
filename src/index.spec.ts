import { expectType, TypeOf, TypeEqual } from "./index";

describe("ts expect", () => {
  it("should expect types", () => {
    expectType<string>("");
    expectType<number>(123);
  });

  it("should return void", () => {
    const result = expectType("");

    expect(result).toEqual(undefined);
  });

  describe("TypeOf", () => {
    it("should support type of checks", () => {
      expectType<TypeOf<number, 123>>(true);
      expectType<TypeOf<123, number>>(false);
      expectType<TypeOf<string, "test">>(true);
      expectType<TypeOf<"test", string>>(false);
    });
  });

  describe("TypeEqual", () => {
    it("should check types are equal", () => {
      expectType<TypeEqual<123, 123>>(true);
      expectType<TypeEqual<123, number>>(false);
      expectType<TypeEqual<number, 123>>(false);
      expectType<TypeEqual<number, number>>(true);

      expectType<TypeEqual<false, true>>(false);
      expectType<TypeEqual<false, boolean>>(false);

      expectType<TypeEqual<1 | 2, 1>>(false);
      expectType<TypeEqual<1 | 2, 1 | 2>>(true);

      expectType<TypeEqual<never, never>>(true);
    });

    it("should check for `any` type", () => {
      expectType<TypeEqual<any, unknown>>(false);
      expectType<TypeEqual<any, string>>(false);
      expectType<TypeEqual<any, number>>(false);
      expectType<TypeEqual<any, boolean>>(false);
      expectType<TypeEqual<any, object>>(false);
      expectType<TypeEqual<any, never>>(false);
      expectType<TypeEqual<any, any>>(true);

      expectType<TypeEqual<TypeEqual<string, any>, false>>(true);
    });
  });
});
