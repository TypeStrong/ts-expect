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
    });
  });
});
