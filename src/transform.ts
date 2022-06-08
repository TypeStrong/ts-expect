import ts from "typescript";

/**
 * Strip TypeScript expectations from runtime code.
 */
export default function (): ts.TransformerFactory<ts.SourceFile> {
  function visitor(context: ts.TransformationContext): ts.Visitor {
    let keywords = new Set();

    return function visit(node: ts.Node): ts.VisitResult<ts.Node> {
      if (ts.isImportDeclaration(node)) {
        const importName = node.moduleSpecifier.getText().slice(1, -1);

        if (importName === "ts-expect" && node.importClause) {
          const { namedBindings } = node.importClause;

          if (namedBindings) {
            ts.forEachChild(namedBindings, (x) => keywords.add(x.getText()));
          }

          return node; // Let minifier handle this.
        }
      }

      if (ts.isFunctionLike(node)) {
        const oldKeywords = new Set(keywords);

        // Remove shadowed keywords.
        node.parameters
          .map((x) => x.name.getText())
          .filter((x) => keywords.has(x))
          .forEach((x) => keywords.delete(x));

        const result = ts.visitEachChild(node, visit, context);
        keywords = oldKeywords; // Restore keywords.
        return result;
      }

      if (ts.isCallExpression(node)) {
        if (keywords.has(node.expression.getText())) {
          return ts.factory.createVoidZero();
        }

        const token = node.expression.getFirstToken();
        if (token && keywords.has(token.getText())) {
          return ts.factory.createVoidZero();
        }

        return node;
      }

      return ts.visitEachChild(node, visit, context);
    };
  }

  return function transformer(context: ts.TransformationContext) {
    return (sourceFile: ts.SourceFile) =>
      ts.visitNode(sourceFile, visitor(context));
  };
}
