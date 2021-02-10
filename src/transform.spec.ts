import * as ts from "typescript";
import { join } from "path";
import transform from "./transform";
import { readFileSync } from "fs";

describe("transform", () => {
  const paths = [
    join(__dirname, "__fixtures__/test-var-shadow.ts"),
    join(__dirname, "__fixtures__/test-import-spread.ts"),
    join(__dirname, "__fixtures__/test-import-star.ts"),
  ];

  it("should strip expects", () => {
    const host = ts.createCompilerHost({});
    const program = ts.createProgram(paths, {}, host);
    const result = program.emit(undefined, undefined, undefined, undefined, {
      before: [transform()],
    });

    expect(result.diagnostics).toEqual([]);

    for (const path of paths) {
      const outPath = path.replace(/\.ts$/, ".js");

      expect(readFileSync(outPath, "utf8")).toMatchSnapshot();
    }
  });
});
