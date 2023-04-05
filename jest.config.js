// @ts-check

/**
 * @typedef {import("@jest/types").Config.InitialOptions} JestConfig
 */

/**
 * @callback nextJest
 * @param {{ dir?: string }} [options]
 * @returns {(customJestConfig?: JestConfig) => () => Promise<JestConfig>}
 */

/**
 *  @type {nextJest}
 */
// For some reason - typescript can't resolve the correct type for this import
// @ts-ignore
const nextJest = require("next/jest");
const createJestConfig = nextJest({ dir: "./" });

/**
 * @type {JestConfig}
 */
const customJestConfig = {
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "src"],
  modulePathIgnorePatterns: ["<rootDir>/.next"],
  // This ensures svgs can be imported with the `ReactComponent as Icon` format
  transform: {
    "^.+\\.svg$": "<rootDir>/scripts/svgTransform.js",
  },
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(test).[tj]s?(x)"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  clearMocks: true,
  resetMocks: false,
  coverageDirectory: "jest-coverage",
  coverageReporters: ["text", "html"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.index.{ts,tsx}",
    "!src/**/*.style*.{ts,tsx}",
    "!src/**/*.stories.{ts,tsx}",
  ],
};

async function jestConfig() {
  const nextJestConfig = await createJestConfig(customJestConfig)();
  // We have a custom transform above that needs to override the NextJS mocked
  // module mapper. This is due to our use of `import { ReactComponent as Svg }`.
  delete nextJestConfig.moduleNameMapper?.["^.+\\.(svg)$"];
  return nextJestConfig;
}

module.exports = jestConfig;
