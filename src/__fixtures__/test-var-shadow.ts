import { expectType } from "ts-expect";

function test(expectType: any) {
  return expectType();
}

const test2 = (expectType: any) => expectType();

function test3(noShadow: any) {
  expectType<number>(123);
  return noShadow;
}

test(expectType);
test2(() => undefined);
test3(123);

expectType<string>("");

const expectedType = expectType;

expectedType<string>("");
