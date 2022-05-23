/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import chalk from "chalk";
import del from "del";
import { globbySync } from "globby";
import { copyFile } from "node:fs";
import { basename } from "node:path";
import prettyBytes from "pretty-bytes";

export default globbySync(["*.toml"], { cwd: "./workers" })
  .map((file) => file.replace(/\.toml$/, ""))
  .map(
    /**
     * Rollup configuration
     * https://rollupjs.org/guide/
     *
     * @return {import("rollup").RollupOptions}
     */
    (name) => ({
      input: `./workers/${name}.ts`,
      output: {
        file: `./dist/${name}/index.js`,
        format: "es",
        minifyInternalExports: true,
      },
      plugins: [
        nodeResolve({
          extensions: [".ts", ".tsx", ".mjs", ".js", ".json", ".node"],
          browser: true,
        }),
        commonjs(),
        babel({
          extensions: [".js", ".mjs", ".ts", ".tsx"],
          babelHelpers: "bundled",
        }),
        {
          name: "custom",
          async buildStart() {
            await del(`dist/${name}/**`);
          },
          async writeBundle() {
            await Promise.all([
              copyFile(
                `./workers/${name}.toml`,
                `./dist/${name}/wrangler.toml`
              ),
            ]);
          },
          generateBundle(options, bundle) {
            const file = basename(options.file);
            const size = bundle[file].code.length;
            const prettySize = chalk.green(prettyBytes(size));
            console.log(`${chalk.cyan("file size:")} ${prettySize}`);
          },
        },
      ],
    })
  );
