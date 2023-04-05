import { TSESTree } from "@typescript-eslint/utils";

export const isImportSpecifier = (
  specifier: TSESTree.ImportClause,
): specifier is TSESTree.ImportSpecifier => {
  return (specifier as TSESTree.ImportSpecifier).imported !== undefined;
};

export const isTSQualifiedName = (
  node?: TSESTree.Node,
): node is TSESTree.TSQualifiedName => {
  return (node as TSESTree.TSQualifiedName).left !== undefined;
};
