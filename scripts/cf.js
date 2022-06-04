/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import envars from "envars";
import { execa as $ } from "execa";
import { argv, fs, globby, path } from "zx";

const envName = argv.env ?? "test";
const version = typeof argv.version === "string" && argv.version;
const env = process.env;

// Load environment variables from the `/env/.{envName}.env` file
envars.config({ env: envName });

// Change the current working directory to the target workspace
const configFiles = await globby("*/wrangler.toml");
const workers = configFiles.map(path.dirname);
let [, , , worker, ...args] = process.argv;

if (!worker) {
  console.error("Usage example:\n\n  $ yarn cf <worker> [...args]\n");
  process.exit(1);
}

if (!workers.includes(worker)) {
  console.error(`Not found ${worker}/wrangler.toml`);
  process.exit(1);
}

// Inject environment variables into the `wrangler.toml` file
const configFile = `${worker}/dist/wrangler.toml`;
const configTemplate = `${worker}/wrangler.toml`;
const config = await fs.readFile(configTemplate, "utf-8");
await fs.writeFile(configFile, replaceEnvVars(config), "utf-8");

// Remove --env/-e and --version arguments
args = args
  .map((v, i, a) => {
    if (v?.startsWith("--env=") || v?.startsWith("-e=")) return undefined;
    if (v?.startsWith("--version=")) return undefined;
    if (v === "--env" || v === "-e") return (a[i + 1] = undefined);
    return v;
  })
  .filter(Boolean);

// Check if there is a secret name, e.g. `yarn cf site secret put AUTH_KEY`
const secret = args.find((_, i) => args[i - 2] === "secret" && args[i - 1] === "put"); // prettier-ignore

// Launch Wrangler CLI
const p = $("yarn", ["wrangler", "-c", configFile, ...args], {
  stdio: secret && env[secret] ? ["pipe", "inherit", "inherit"] : "inherit",
});

// Write secret values to stdin (in order to avoid typing them)
if (secret && env[secret] && p.stdin) {
  p.stdin.write(env[args[2]]);
  p.stdin.end();
}

// Suppress the error message from the spawned process
await p.catch(() => {
  process.exitCode = process.exitCode ?? 1;
  return Promise.resolve();
});

function replaceEnvVars(/** @type {string} */ config) {
  // Replace placeholders with the actual values for the target environment
  config = config.replace(
    /(\$[[A-Z0-9_]+)/gm,
    (match, p1) => env[p1.substring(1)] ?? ""
  );

  // Optionally, append the target environment name to the worker's name
  if (envName !== "prod") {
    config = config.replace(/name = "(.+)"/m, `name = "$1-${envName}"`);
  }

  // Optionally, append the version number to the worker's name
  if (version) {
    config = config.replace(/name = "(.+)"/m, `name = "$1-${version}"`);
  }

  return config;
}
