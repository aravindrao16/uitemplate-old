import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";
import ReactFC from "./react-fc";
import ruleTesterConfig from "./util/ruleTesterConfig";

const ruleTester = new ESLintUtils.RuleTester(ruleTesterConfig);

ruleTester.run("react-fc", ReactFC, {
  valid: [
    "const MyComponent: MyComponentType = ({ children }) => null;",
    "const MyComponent = ({ children }: MyComponentProps) => null;",
    "class MyComponent extends React.Component {}",
  ],
  invalid: [
    {
      code: 'import { FC } from "react";',
      errors: [{ messageId: "fcLint", type: AST_NODE_TYPES.ImportDeclaration }],
    },
    {
      code: 'import { FunctionComponent } from "react";',
      errors: [{ messageId: "fcLint", type: AST_NODE_TYPES.ImportDeclaration }],
    },
    {
      code: 'import { FC, FunctionComponent } from "react";',
      errors: [{ messageId: "fcLint", type: AST_NODE_TYPES.ImportDeclaration }],
    },
    {
      code: 'import { Component } from "react";',
      errors: [{ messageId: "ccLint", type: AST_NODE_TYPES.ImportDeclaration }],
    },
    {
      code: "const MyComponent: React.FC = () => null;",
      errors: [{ messageId: "fcLint", type: AST_NODE_TYPES.Identifier }],
    },
    {
      code: "const MyComponent: React.FC = ({ children }) => null;",
      errors: [{ messageId: "fcLint", type: AST_NODE_TYPES.Identifier }],
    },
    {
      code: "const MyComponent: React.FC<MyComponentProps> = () => null;",
      errors: [{ messageId: "fcLint", type: AST_NODE_TYPES.Identifier }],
    },
    {
      code: "const MyComponent: React.FunctionComponent = () => null;",
      errors: [{ messageId: "fcLint", type: AST_NODE_TYPES.Identifier }],
    },
    {
      code: "const MyComponent: React.FunctionComponent = ({ children }) => null;",
      errors: [{ messageId: "fcLint", type: AST_NODE_TYPES.Identifier }],
    },
    {
      code: "const MyComponent: React.FunctionComponent<MyComponentProps> = () => null;",
      errors: [{ messageId: "fcLint", type: AST_NODE_TYPES.Identifier }],
    },
    {
      code: "const MyComponent: React.Component = () => null;",
      errors: [{ messageId: "ccLint", type: AST_NODE_TYPES.Identifier }],
    },
    {
      code: "const MyComponent: React.Component = ({ children }) => null;",
      errors: [{ messageId: "ccLint", type: AST_NODE_TYPES.Identifier }],
    },
    {
      code: "const MyComponent: React.Component<MyComponentProps> = () => null;",
      errors: [{ messageId: "ccLint", type: AST_NODE_TYPES.Identifier }],
    },
    {
      code: "const MyComponent: React.ComponentClass = () => null;",
      errors: [{ messageId: "ccLint", type: AST_NODE_TYPES.Identifier }],
    },
    {
      code: "const MyComponent: React.ComponentClass = ({ children }) => null;",
      errors: [{ messageId: "ccLint", type: AST_NODE_TYPES.Identifier }],
    },
    {
      code: "const MyComponent: React.ComponentClass<MyComponentProps> = () => null;",
      errors: [{ messageId: "ccLint", type: AST_NODE_TYPES.Identifier }],
    },
    {
      code: "const MyComponent: React.ComponentType = () => null;",
      errors: [{ messageId: "ccLint", type: AST_NODE_TYPES.Identifier }],
    },
    {
      code: "const MyComponent: React.ComponentType = ({ children }) => null;",
      errors: [{ messageId: "ccLint", type: AST_NODE_TYPES.Identifier }],
    },
    {
      code: "const MyComponent: React.ComponentType<MyComponentProps> = () => null;",
      errors: [{ messageId: "ccLint", type: AST_NODE_TYPES.Identifier }],
    },
  ],
});
