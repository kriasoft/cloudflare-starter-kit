/* SPDX-FileCopyrightText: 2020-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import del from "del";
import globby from "globby";

/**
 * Rollup configuration.
 *
 * @see https://rollupjs.org/
 * @type {import("rollup").RollupOptions}
 */
const config = {
  output: {
    dir: ".build",
    format: "module",
  },
  plugins: [
    resolve({
      extensions: [".ts", ".tsx", ".mjs", ".js", ".json", ".node"],
    }),
    babel({
      extensions: [".js", ".mjs", ".ts", ".tsx"],
      babelHelpers: "bundled",
    }),
  ],
};

del.sync(".build/**");

export default globby
  .sync(["workers/*.ts", "!**.d.ts"])
  .map((input) => ({ ...config, input }));
