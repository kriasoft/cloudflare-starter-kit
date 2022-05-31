/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import envars from "envars";
import { execa as $ } from "execa";
import { argv, fs, path } from "zx";

// Load environment variables from the `/env/.{envName}.env` file
const env = process.env;
envars.config({ env: argv.env ?? "test" });
env.CF_API_TOKEN = env.CF_API_TOKEN ?? env.CLOUDFLARE_API_TOKEN;

// Change the current working directory to the target workspace
const [, , , target, ...args] = process.argv;
process.chdir(path.resolve(__dirname, "..", target));

// Inject environment variables into the `wrangler.toml` file
const configFile = "dist/wrangler.toml";
const config = await fs.readFile("wrangler.toml", "utf-8");
await fs.writeFile(configFile, replaceEnvVars(config), "utf-8");

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

function replaceEnvVars(/** @type {string} */ text) {
  return text.replace(
    /(\$[[A-Z0-9_]+)/gm,
    (match, p1) => process.env[p1.substring(1)] ?? ""
  );
}
