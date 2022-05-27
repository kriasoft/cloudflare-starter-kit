/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Miniflare } from "miniflare";

const target = "site";
let mf: Miniflare;

beforeAll(async () => {
  mf = new Miniflare({
    scriptPath: `${target}/dist/index.js`,
    buildCommand: `yarn rollup -c --silent --environment TARGET:${target},BABEL_ENV:development`,
    modules: true,
    sitePath: "public",
  });
});

test("GET /", async () => {
  const res = await mf.dispatchFetch("http://localhost:8787/");
  const body = await res.text();
  expect({ status: res.status, body }).toMatchInlineSnapshot(`
    Object {
      "body": "<!DOCTYPE html>
    <html class=\\"no-js\\" lang=\\"\\">
      <head>
        <meta charset=\\"utf-8\\" />
        <title>Cloudflare Starter Kit</title>
        <meta name=\\"description\\" content=\\"\\" />
        <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1\\" />
        <link rel=\\"icon\\" href=\\"/favicon.ico\\" sizes=\\"any\\" />
        <link rel=\\"stylesheet\\" href=\\"css/normalize.css\\" />
        <link rel=\\"stylesheet\\" href=\\"css/style.css\\" />
        <meta name=\\"theme-color\\" content=\\"#fafafa\\" />
      </head>

      <body>
        <p>Hello world! This is Cloudflare Workers Starter Kit.</p>
      </body>
    </html>
    ",
      "status": 200,
    }
  `);
});

afterAll(async () => {
  await mf.dispose();
});
