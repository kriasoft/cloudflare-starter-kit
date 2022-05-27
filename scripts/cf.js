/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { spawn } from "cross-spawn";
import envars from "envars";
import { argv, fs, path } from "zx";

// Load environment variables from the `/env/.{envName}.env` file
envars.config({ env: argv.env ?? "test" });
process.env.CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

// Change the current working directory to the target workspace
const [, , , target, ...args] = process.argv;
const cwd = path.resolve(__dirname, "..", target);
process.chdir(path.relative(process.cwd(), cwd));

// Inject environment variables into the `wrangler.toml` file
const config = await fs.readFile("wrangler.toml", "utf-8");
await fs.writeFile("dist/wrangler.toml", replaceEnvVars(config), "utf-8");

// Call Wrangler CLI
const cmd = spawn("yarn", ["wrangler", "-c", "dist/wrangler.toml", ...args], {
  stdio: "inherit",
});

await new Promise((resolve, reject) => {
  cmd.on("close", resolve);
  cmd.on("error", reject);
});

function replaceEnvVars(/** @type {string} */ text) {
  return text.replace(
    /(\$[[A-Z0-9_]+)/gm,
    (match, p1) => process.env[p1.substring(1)] ?? ""
  );
}
