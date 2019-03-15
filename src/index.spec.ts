import { expectType, TypeOf } from "./index";

describe("ts expect", () => {
  it("should expect types", () => {
    expectType<string>("");
    expectType<number>(123);
  });

  it("should return void", () => {
    const result = expectType("");

    expect(result).toEqual(undefined);

    expectType<TypeOf<typeof result, void>>(true);
  });
});
