/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import chalk from "chalk";
import { sync as del } from "del";
import { globbySync } from "globby";
import { copyFile } from "node:fs";
import { basename } from "node:path";
import prettyBytes from "pretty-bytes";

del("dist/**");

export default globbySync(["*.toml"], { cwd: "./src" })
  .map((file) => file.replace(/\.toml$/, ""))
  .map(
    /**
     * Rollup configuration
     * https://rollupjs.org/guide/
     *
     * @return {import("rollup").RollupOptions}
     */
    (name) => ({
      input: `./src/${name}.ts`,
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
        babel({
          extensions: [".js", ".mjs", ".ts", ".tsx"],
          babelHelpers: "bundled",
        }),
        {
          name: "package.json",
          async writeBundle() {
            await Promise.all([
              copyFile(`./src/${name}.toml`, `./dist/${name}/wrangler.toml`),
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
