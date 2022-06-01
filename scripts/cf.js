/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import envars from "envars";
import { execa as $ } from "execa";
import { argv, fs } from "zx";

// Load environment variables from the `/env/.{envName}.env` file
const env = process.env;
const envName = argv.env ?? "test";
envars.config({ env: envName });

// Change the current working directory to the target workspace
const [, , , target, ...args] = process.argv;

// Inject environment variables into the `wrangler.toml` file
const configFile = `${target}/dist/wrangler.toml`;
const configTemplate = `${target}/wrangler.toml`;
const config = await fs.readFile(configTemplate, "utf-8");
await fs.writeFile(configFile, replaceEnvVars(config), "utf-8");

// Append the target environment name if missing
if (
  ["publish", "secret", "dev", "tail"].includes(args[0] /* command */) &&
  !args.some((x) => x.startsWith("--env=") || x === "--env" || x === "-e")
) {
  args.push(`--env=${envName}`);
}

// Launch Wrangler CLI
const p = $("yarn", ["wrangler", "-c", configFile, ...args], {
  stdio: args[0] === "secret" ? ["pipe", "inherit", "inherit"] : "inherit",
});

// Write secret values to stdin (in order to avoid typing them)
if (args[0] === "secret" && args[1] === "put" && env[args[2]]) {
  p.stdin.write(env[args[2]]);
  p.stdin.end();
}

// Suppress the error message from the spawned process
await p.catch(() => {
  process.exitCode = process.exitCode ?? 1;
  return Promise.resolve();
});

function replaceEnvVars(/** @type {string} */ config) {
  return (
    config
      // E.g. "$APP_HOSTNAME" => "example.com"
      .replace(/(\$[[A-Z0-9_]+)/gm, (match, p1) => env[p1.substring(1)] ?? "")
      // E.g. "[vars]" => "[env.test.vars]"
      .replace(/^\[vars\]/gm, `[env.${envName}.vars]`)
  );
}
