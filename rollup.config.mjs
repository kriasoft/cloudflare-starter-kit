/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import chalk from "chalk";
import del from "del";
import { globbySync } from "globby";
import { copyFile } from "node:fs";
import { basename, dirname } from "node:path";
import prettyBytes from "pretty-bytes";

export default globbySync(["*/wrangler.toml"])
  .map((file) => dirname(file))
  .filter((name) => name === process.env.TARGET || !process.env.TARGET)
  .map(
    /**
     * Rollup configuration
     * https://rollupjs.org/guide/
     *
     * @return {import("rollup").RollupOptions}
     */
    (name) => ({
      input: `./${name}/index.ts`,
      output: {
        name,
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
                `./${name}/wrangler.toml`,
                `./dist/${name}/wrangler.toml`
              ),
            ]);
          },
          generateBundle(options, bundle) {
            if (!process.argv.includes("--silent")) {
              const file = basename(options.file);
              const size = bundle[file].code.length;
              const prettySize = chalk.green(prettyBytes(size));
              console.log(`${chalk.cyan("file size:")} ${prettySize}`);
            }
          },
        },
      ],
    })
  );
