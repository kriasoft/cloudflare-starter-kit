/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import envars from "envars";

/**
 * Jest configuration
 * https://jestjs.io/docs/configuration
 *
 * @type {import("@jest/types").Config.InitialOptions}
 */
export default {
  cacheDirectory: ".cache/jest",

  // Miniflare Settings
  // https://miniflare.dev/get-started/api
  testEnvironment: "miniflare",
  testEnvironmentOptions: {
    bindings: envars.config(),
    kvNamespaces: [],
    sitePath: "dist/app",
    modules: true,
  },

  testPathIgnorePatterns: [
    "<rootDir>/.cache/",
    "<rootDir>/.github/",
    "<rootDir>/.husky/",
    "<rootDir>/.vscode/",
    "<rootDir>/.yarn/",
    "<rootDir>/dist/",
    "<rootDir>/scripts/",
  ],

  moduleFileExtensions: [
    "ts",
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node",
  ],

  moduleNameMapper: {
    __STATIC_CONTENT_MANIFEST: "<rootDir>/edge/manifest.ts",
  },

  modulePathIgnorePatterns: ["<rootDir>/dist/"],

  transform: {
    "\\.ts$": "babel-jest",
  },

  extensionsToTreatAsEsm: [".ts"],
};
