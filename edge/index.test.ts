/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import worker from "./index.js";

test("GET /", async () => {
  const env = getMiniflareBindings();
  const req = new Request(`https://${env.APP_HOSTNAME}/`);
  const res = await worker.fetch(req, env, {} as ExecutionContext);
  const body = await res.text();

  expect(res.status).toEqual(200);
  expect(/<title>(.*)<\/title>/.test(body)).toEqual(true);
});
