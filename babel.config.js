/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

/**
 * Babel configuration
 * https://babeljs.io/docs/en/options
 *
 * @type {import("@babel/core").TransformOptions}
 */
export default {
  parserOpts: {},
  presets: [
    [
      "@babel/preset-env",
      {
        targets: "last 2 Chrome versions",
        modules: false,
      },
    ],
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
  ],
  overrides: [
    {
      test: "**/*.ts",
      presets: ["@babel/preset-typescript"],
    },
  ],
};
