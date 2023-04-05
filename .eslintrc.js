// @ts-check

/*
 * @type { import('eslint').Linter.Config }
 */
module.exports = {
  env: {
    browser: true,
    node: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module"
  },
  ignorePatterns: ["./eslintrc.js"],
  extends: ["plugin:@next/next/recommended"],
  plugins: [
    "@typescript-eslint",
    "eslint-plugin-simple-import-sort",
    "react",
    "react-hooks",
    "driveway",
    "jsx-a11y",
    "deprecation"
  ],
  rules: {
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: ["class", "interface", "enumMember"],
        format: ["PascalCase"],
      },
    ],
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        multiline: {
          delimiter: "semi",
          requireLast: true
        },
        singleline: {
          delimiter: "semi",
          requireLast: false
        }
      }
    ],
    "no-unused-vars": "off", // Disable to enable ts version
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/quotes": "off",
    "@typescript-eslint/semi": ["error"],
    "@typescript-eslint/type-annotation-spacing": "off",
    "arrow-parens": ["off", "as-needed"],
    "array-callback-return": "error",
    "brace-style": ["error", "1tbs"],
    camelcase: "off",
    "comma-dangle": "off",
    "comma-spacing": [
      "error",
      {
        before: false,
        after: true
      }
    ],
    curly: "error",
    "default-case": "error",
    "dot-notation": "off",
    "eol-last": "error",
    eqeqeq: ["error", "smart"],
    "getter-return": "error",
    "guard-for-in": "off",
    "id-blacklist": "off",
    "id-match": "off",
    "jsx-a11y/alt-text": "error",
    "keyword-spacing": [
      "error",
      {
        before: true,
        after: true
      }
    ],
    "linebreak-style": "off",
    "max-len": [
      "error",
      {
        code: 140
      }
    ],
    "new-parens": "off",
    "newline-per-chained-call": "off",
    "no-bitwise": "error",
    "no-caller": "error",
    "no-console": "off",
    "no-debugger": "error",
    "no-empty": "off",
    "no-eval": "error",
    "no-extra-semi": "off",
    "no-fallthrough": "error",
    "no-invalid-this": "error",
    "no-irregular-whitespace": "off",
    "no-multiple-empty-lines": "error",
    "no-new-wrappers": "error",
    "no-redeclare": "error",
    "no-throw-literal": "error",
    "no-trailing-spaces": "error",
    "no-underscore-dangle": "off",
    "no-unused-labels": "error",
    "no-useless-computed-key": "error",
    "no-useless-escape": "error",
    "no-var": "error",
    "quote-props": "off",
    radix: "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/jsx-no-target-blank": "error",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [["^\\u0000", "^@?\\w", "^\\.", "^[^.]"]]
      }
    ],
    "space-before-function-paren": "off",
    "space-in-parens": ["off", "never"],
    "space-infix-ops": ["error", { int32Hint: false }]
  }
};
