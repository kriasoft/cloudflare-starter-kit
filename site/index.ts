/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  getAssetFromKV,
  serveSinglePageApp,
} from "@cloudflare/kv-asset-handler";
import { handleError } from "core";
import manifest from "__STATIC_CONTENT_MANIFEST";

export default {
  fetch: handleError((req, env, ctx) => {
    const url = new URL(req.url);

    if (url.pathname === "/echo" && env.APP_ENV === "test") {
      return new Response(
        JSON.stringify({
          headers: Object.fromEntries(req.headers.entries()),
          cf: req.cf,
          __STATIC_CONTENT_MANIFEST: JSON.parse(manifest),
        }),
        { status: 200 }
      );
    }

    return getAssetFromKV(
      {
        request: req,
        waitUntil(promise) {
          return ctx.waitUntil(promise);
        },
      },
      {
        ASSET_NAMESPACE: env.__STATIC_CONTENT,
        ASSET_MANIFEST: JSON.parse(manifest),
        mapRequestToAsset: serveSinglePageApp,
      }
    );
  }),
} as ExportedHandler<Env>;
