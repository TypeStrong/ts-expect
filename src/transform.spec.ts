import { describe, it, expect } from "@jest/globals";
import ts from "typescript";
import transform from "./transform";
import { readFileSync } from "fs";

describe("transform", () => {
  const paths = [
    new URL("__fixtures__/test-var-shadow.ts", import.meta.url),
    new URL("__fixtures__/test-import-spread.ts", import.meta.url),
    new URL("__fixtures__/test-import-star.ts", import.meta.url),
  ];

  it("should strip expects", () => {
    const host = ts.createCompilerHost({});
    const program = ts.createProgram(
      paths.map((x) => x.pathname),
      {},
      host
    );
    const result = program.emit(undefined, undefined, undefined, undefined, {
      before: [transform()],
    });

    expect(result.diagnostics).toEqual([]);

    for (const path of paths) {
      const outPath = path.pathname.replace(/\.ts$/, ".js");

      expect(readFileSync(outPath, "utf8")).toMatchSnapshot();
    }
  });
});
