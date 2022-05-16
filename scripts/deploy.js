/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { spawn } from "cross-spawn";
import envars from "envars";
import { globbySync } from "globby";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { argv } from "zx";

// Load environment variables from the `/env/.{envName}.env` file
envars.config({ env: argv.env ?? "test" });
process.env.CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const cwd = join(__dirname, "../dist");

for (const name of globbySync("*", { cwd, onlyDirectories: true })) {
  const pkgFile = join(__dirname, "../package.json");
  const pkg = await readFile(pkgFile, "utf-8");
  const configFile = join(cwd, name, "wrangler.toml");
  const config = await readFile(configFile, "utf-8");

  try {
    // Update the package.json->main field required by Wrangler CLI
    await writeFile(
      pkgFile,
      pkg.replace(/^(\s"main"): ".*",$/, `$1: "./dist/${name}/index.js`),
      "utf-8"
    );

    // Inject environment variables into `dist/{name}/wrangler.toml`
    await writeFile(
      configFile,
      config.replace(
        /(\$[[A-Z0-9_]+)/gm,
        (match, p1) => process.env[p1.substring(1)] ?? ""
      ),
      "utf-8"
    );

    // Deploy the script using Cloudflare Wrangler CLI
    await new Promise((resolve, reject) => {
      spawn(
        "yarn",
        [
          "wrangler",
          "publish",
          "--verbose",
          "--config",
          `./dist/${name}/wrangler.toml`,
        ],
        { stdio: "inherit" }
      ).on("close", (code) => (code === 0 ? resolve() : reject()));
    });
  } finally {
    // Restore the original files: package.json, wrangler.toml
    await writeFile(pkgFile, pkg, "utf-8");
    await writeFile(configFile, config, "utf-8");
  }
}
