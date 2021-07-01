/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

/**
 * Deploys bundle worker script(s) to Cloudflare. Usage:
 *
 *   $ yarn deploy <worker> [--env #0]
 *
 * @see https://developers.cloudflare.com/workers/
 * @see https://api.cloudflare.com/#worker-script-upload-worker
 */

const fs = require("fs");
const got = require("got");
const path = require("path");
const globby = require("globby");
const minimist = require("minimist");
const FormData = require("form-data");
const dotenv = require("dotenv");

const args = minimist(process.argv.slice(2));
const buildDir = path.resolve(__dirname, "../.build");

// The name of the worker script (e.g. "proxy", "proxy-test", etc.)
const envName = args.env || "test";

// Load environment variables from the .env file
dotenv.config({ path: `.env.${envName}` });
dotenv.config({ path: `.env` });

const env = process.env;

// Configure an HTTP client for accessing Cloudflare REST API
const cf = got.extend({
  prefixUrl: `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/`,
  headers: { authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}` },
  responseType: "json",
  resolveBodyOnly: true,
  hooks: {
    afterResponse: [
      function (res) {
        if (!res.body?.success) throw new Error(res.body.errors[0].message);
        res.body?.messages.forEach((x) => console.log(x));
        res.body = res.body.result || res.body;
        return res;
      },
    ],
  },
});

async function deploy() {
  if (args._.length === 0) {
    throw new Error("Need to specify script(s) to deploy.");
  }

  const pattern = args._.map((x) => `${x}.js`);
  const files = await globby(pattern, { cwd: buildDir });

  for (const file of files) {
    const worker =
      file.substring(0, file.length - 3) +
      (envName === "prod" ? "" : `-${envName}`);
    console.log(`Uploading Cloudflare Worker script: ${worker}`);

    const form = new FormData();
    const script = fs.readFileSync(path.resolve(buildDir, file), {
      encoding: "utf-8",
    });
    const bindings = [];
    const metadata = { body_part: "script", bindings };
    form.append("script", script, { contentType: "application/javascript" });
    form.append("metadata", JSON.stringify(metadata), {
      contentType: "application/json",
    });

    await cf.put({
      url: `workers/scripts/${worker}`,
      headers: form.getHeaders(),
      body: form,
    });
  }

  console.log("Done!");
}

deploy().catch((err) => {
  console.error(err);
  process.exit(1);
});
