/* SPDX-FileCopyrightText: 2020-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import del from "del";
import globby from "globby";
import stripExports from "rollup-plugin-strip-exports";

/**
 * Rollup configuration.
 *
 * @see https://rollupjs.org/
 * @type {import("rollup").RollupOptions}
 */
const config = {
  output: {
    dir: ".build",
    format: "es",
    minifyInternalExports: true,
    sourcemap: "inline",
  },
  plugins: [
    resolve({
      extensions: [".ts", ".tsx", ".mjs", ".js", ".json", ".node"],
      browser: true,
    }),
    babel({
      extensions: [".js", ".mjs", ".ts", ".tsx"],
      babelHelpers: "bundled",
    }),
    stripExports(),
  ],
};

del.sync(".build/**");

export default globby
  .sync(["workers/*.ts", "!**.d.ts"])
  .map((input) => ({ ...config, input }));
