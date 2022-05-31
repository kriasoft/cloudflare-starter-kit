/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  getAssetFromKV,
  serveSinglePageApp,
} from "@cloudflare/kv-asset-handler";
import { Env } from "core";
import manifest from "__STATIC_CONTENT_MANIFEST";

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);

    if (url.pathname === "/echo" && env.APP_ENV === "test") {
      return new Response(
        JSON.stringify({
          APP_ENV: env.APP_ENV,
          APP_NAME: env.APP_NAME,
          APP_HOSTNAME: env.APP_HOSTNAME,
          __STATIC_CONTENT_MANIFEST: JSON.parse(manifest),
          headers: Object.fromEntries(req.headers.entries()),
          cf: req.cf,
        }),
        { status: 200 }
      );
    }

    // Retrieve and serve static assets from the `/public` folder
    return await getAssetFromKV(
      { request: req, waitUntil: ctx.waitUntil },
      {
        ASSET_NAMESPACE: env.__STATIC_CONTENT,
        ASSET_MANIFEST: JSON.parse(manifest),
        mapRequestToAsset: serveSinglePageApp,
      }
    );
  },
} as ExportedHandler<Env>;
