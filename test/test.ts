/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import envars from "envars";
import { Miniflare } from "miniflare";

const target = "site";
let mf: Miniflare;

beforeAll(async () => {
  mf = new Miniflare({
    scriptPath: `${target}/dist/index.js`,
    buildCommand: `yarn workspaces foreach --include=app --include=site run build`,
    modules: true,
    sitePath: "app/dist",
    bindings: envars.config(),
  });
});

test("GET /", async () => {
  const res = await mf.dispatchFetch("http://localhost:8787/");
  const body = await res.text();

  expect(res.status).toEqual(200);
  expect(/<title>(.*)<\/title>/.test(body)).toEqual(true);
}, 15000);

afterAll(async () => {
  await mf.dispose();
});
