import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESLint,
} from "@typescript-eslint/utils";
import customUseFeatureRule, { replaceSuggestion } from "./custom-use-feature";
import ruleTesterConfig from "./util/ruleTesterConfig";

const ruleTester = new ESLintUtils.RuleTester(ruleTesterConfig);

const expectedErrors: TSESLint.TestCaseError<"lint" | "suggestion">[] = [
  {
    messageId: "lint",
    type: AST_NODE_TYPES.ImportDeclaration,
    suggestions: [{ messageId: "suggestion", output: replaceSuggestion }],
  },
];

ruleTester.run("custom-use-feature", customUseFeatureRule, {
  valid: [
    'import useFeature from "hooks/useFeature";',
    'import useFeature, { HookOptions, HookOverrides } from "hooks/useFeature";',
    'import { HookOptions, HookOverrides } from "hooks/useFeature";',
    'import { HookOptions } from "hooks/useFeature";',
    'import { ReactSDKClient } from "@optimizely/react-sdk";',
  ],
  invalid: [
    {
      code: 'import { useFeature } from "@optimizely/react-sdk";',
      errors: expectedErrors,
    },
    {
      code: 'import { useFeature as optimizelyUseFeature } from "@optimizely/react-sdk";',
      errors: expectedErrors,
    },
    {
      code: 'import { useFeature as useFeatureRename } from "@optimizely/react-sdk";',
      errors: expectedErrors,
    },
    {
      code: 'import { useFeature, ReactSDKClient } from "@optimizely/react-sdk";',
      errors: expectedErrors,
    },
  ],
});
