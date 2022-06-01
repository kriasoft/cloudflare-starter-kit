/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import envars from "envars";
import { execa as $ } from "execa";
import { argv, fs, path } from "zx";

// Load environment variables from the `/env/.{envName}.env` file
const env = process.env;
const envName = argv.env ?? "test";
envars.config({ env: envName });
env.CF_API_TOKEN = env.CF_API_TOKEN ?? env.CLOUDFLARE_API_TOKEN;

// Change the current working directory to the target workspace
const [, , , target, ...args] = process.argv;

// Inject environment variables into the `wrangler.toml` file
const configFile = path.resolve(__dirname, `../${target}/dist/wrangler.toml`);
const configTemplate = path.resolve(__dirname, `../${target}/wrangler.toml`);
const config = await fs.readFile(configTemplate, "utf-8");
await fs.writeFile(configFile, replaceEnvVars(config), "utf-8");

// Append the target environment if missing
if (!args.some((x) => x.startsWith("--env=") || x === "--env" || x === "-e")) {
  args.push(`--env=${envName}`);
}

// Pass the secret values loaded from the environment or *.env file(s)
if (args[0] === "secret" && args[1] === "put" && env[args[2]]) {
  const p = $("yarn", ["wrangler", "-c", configFile, ...args], {
    stdio: ["pipe", "inherit", "inherit"],
  });

  p.stdin.write(env[args[2]]);
  p.stdin.end();

  await p;
  process.exit();
}

// Launch Wrangler CLI
await $("yarn", ["wrangler", "-c", configFile, ...args], { stdio: "inherit" });

function replaceEnvVars(/** @type {string} */ config) {
  return (
    config
      // E.g. "$APP_HOSTNAME" => "example.com"
      .replace(/(\$[[A-Z0-9_]+)/gm, (match, p1) => env[p1.substring(1)] ?? "")
      // E.g. "[vars]" => "[env.test.vars]"
      .replace(/^\[vars\]/gm, `[env.${envName}.vars]`)
  );
}
