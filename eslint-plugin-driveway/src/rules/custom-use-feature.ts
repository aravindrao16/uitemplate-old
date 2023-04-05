import { ESLintUtils, TSESLint, TSESTree } from "@typescript-eslint/utils";
import { isImportSpecifier } from "./util/typeHelpers";

const isUseFeatureImport = (node: TSESTree.ImportDeclaration) => {
  return (
    node.source.value === "@optimizely/react-sdk" &&
    node.specifiers.some(
      (specifier) =>
        isImportSpecifier(specifier) &&
        specifier.imported.name === "useFeature",
    )
  );
};

const replaceSuggestion = 'import { useFeature } from "hooks/useFeature";';

const CustomUseFeature: TSESLint.RuleModule<"lint" | "suggestion"> =
  ESLintUtils.RuleCreator.withoutDocs({
    meta: {
      type: "suggestion",
      docs: {
        description:
          "Warns about using the incorrect useFeature import from @optimizely",
        recommended: "error",
        suggestion: true,
      },
      hasSuggestions: true,
      fixable: "code",
      messages: {
        suggestion: 'Change to import from "hooks/useFeature"',
        lint: "Prefer importing 'hooks/useFeature' instead to support `TesterEnabled_` cookie overrides.",
      },
      schema: [],
    },
    defaultOptions: [],
    create: (context) => {
      return {
        ImportDeclaration: (node) => {
          if (isUseFeatureImport(node)) {
            context.report({
              node,
              messageId: "lint",
              suggest: [
                {
                  messageId: "suggestion",
                  fix: (fixer) => fixer.replaceText(node, replaceSuggestion),
                },
              ],
            });
          }
        },
      };
    },
  });

export default CustomUseFeature;
export { replaceSuggestion };
