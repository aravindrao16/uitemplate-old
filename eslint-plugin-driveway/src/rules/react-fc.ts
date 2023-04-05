import {
  ASTUtils,
  ESLintUtils,
  TSESLint,
  TSESTree,
} from "@typescript-eslint/utils";
import { isImportSpecifier, isTSQualifiedName } from "./util/typeHelpers";

const isReactImport = (node: TSESTree.ImportDeclaration, imports: string[]) => {
  return (
    node.source.value === "react" &&
    node.specifiers.some(
      (specifier) =>
        isImportSpecifier(specifier) &&
        imports.includes(specifier.imported.name),
    )
  );
};

const hasReactParent = (node: TSESTree.Node) => {
  return (
    isTSQualifiedName(node.parent) &&
    ASTUtils.isIdentifier(node.parent.left) &&
    node.parent.left.name === "React"
  );
};

const ReactFC: TSESLint.RuleModule<"fcLint" | "ccLint"> =
  ESLintUtils.RuleCreator.withoutDocs({
    meta: {
      type: "suggestion",
      docs: {
        description: "Warns about deprecated React 18 types",
        recommended: "warn",
        suggestion: true,
      },
      hasSuggestions: true,
      fixable: "code",
      messages: {
        fcLint:
          "React.FC and React.FunctionComponent are deprecated. See https://github.com/DefinitelyTyped/DefinitelyTyped/pull/56210",
        ccLint:
          // eslint-disable-next-line max-len
          "React.Component, React.ComponentClass, and React.ComponentType are intended for class components. Prefer a more explicit functional component type.",
      },
      schema: [],
    },
    defaultOptions: [],
    create: (context) => {
      return {
        ImportDeclaration: (node) => {
          if (isReactImport(node, ["FC", "FunctionComponent"])) {
            context.report({ node, messageId: "fcLint" });
          } else if (
            isReactImport(node, [
              "Component",
              "ComponentClass",
              "ComponentType",
            ])
          ) {
            context.report({ node, messageId: "ccLint" });
          }
        },
        "VariableDeclaration Identifier[name='FC']": (node: TSESTree.Node) =>
          hasReactParent(node) && context.report({ node, messageId: "fcLint" }),
        "VariableDeclaration Identifier[name='FunctionComponent']": (
          node: TSESTree.Node,
        ) =>
          hasReactParent(node) && context.report({ node, messageId: "fcLint" }),
        "VariableDeclaration Identifier[name='Component']": (
          node: TSESTree.Node,
        ) =>
          hasReactParent(node) && context.report({ node, messageId: "ccLint" }),
        "VariableDeclaration Identifier[name='ComponentClass']": (
          node: TSESTree.Node,
        ) =>
          hasReactParent(node) && context.report({ node, messageId: "ccLint" }),
        "VariableDeclaration Identifier[name='ComponentType']": (
          node: TSESTree.Node,
        ) =>
          hasReactParent(node) && context.report({ node, messageId: "ccLint" }),
        "TSTypeAliasDeclaration Identifier[name='FC']": (node: TSESTree.Node) =>
          hasReactParent(node) && context.report({ node, messageId: "fcLint" }),
        "TSTypeAliasDeclaration Identifier[name='FunctionComponent']": (
          node: TSESTree.Node,
        ) =>
          hasReactParent(node) && context.report({ node, messageId: "fcLint" }),
        "TSTypeAliasDeclaration Identifier[name='Component']": (
          node: TSESTree.Node,
        ) =>
          hasReactParent(node) && context.report({ node, messageId: "ccLint" }),
        "TSTypeAliasDeclaration Identifier[name='ComponentClass']": (
          node: TSESTree.Node,
        ) =>
          hasReactParent(node) && context.report({ node, messageId: "ccLint" }),
        "TSTypeAliasDeclaration Identifier[name='ComponentType']": (
          node: TSESTree.Node,
        ) =>
          hasReactParent(node) && context.report({ node, messageId: "ccLint" }),
      };
    },
  });

export default ReactFC;
