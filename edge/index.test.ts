/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { expect, test } from "vitest";
import app from "./index.js";

test.skip("GET /", async () => {
  const req = new Request(`https://${env.APP_HOSTNAME}/`);
  const res = await app.fetch(req, bindings);
  const body = await res.text();

  expect(res.status).toEqual(200);
  expect(/<title>(.*)<\/title>/.test(body)).toEqual(true);
});
