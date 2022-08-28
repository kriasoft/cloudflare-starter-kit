/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  getAssetFromKV,
  serveSinglePageApp,
} from "@cloudflare/kv-asset-handler";
import { Hono } from "hono";
import manifest from "__STATIC_CONTENT_MANIFEST";

const app = new Hono<Env>();

app.get("/echo", ({ req, json }) => {
  return json({
    headers: Object.fromEntries(req.headers.entries()),
    cf: req.cf,
  });
});

// Serve web application assets bundled into
// the worker script from the `dist/app` folder
app.get("*", async ({ req, env, executionCtx }) => {
  return await getAssetFromKV(
    {
      request: req,
      waitUntil(promise) {
        return executionCtx.waitUntil(promise);
      },
    },
    {
      ASSET_NAMESPACE: env.__STATIC_CONTENT,
      ASSET_MANIFEST: JSON.parse(manifest),
      mapRequestToAsset: serveSinglePageApp,
    }
  );
});

export default app;
