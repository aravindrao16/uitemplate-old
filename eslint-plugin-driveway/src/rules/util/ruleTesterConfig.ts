import { TSESLint } from "@typescript-eslint/utils";

// This is passed into eslints `RuleTester` to ensure it properly compiles
// eslint rules as typescript modules.

const parser = "@typescript-eslint/parser";

// See <https://eslint.org/docs/developer-guide/nodejs-api#ruletester>.
const ruleTesterConfig: Omit<TSESLint.RuleTesterConfig, "parser"> & {
  parser: typeof parser;
} = {
  parser,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
};

export default ruleTesterConfig;
