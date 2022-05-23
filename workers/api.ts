/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { serveSinglePageApp } from "@cloudflare/kv-asset-handler";

async function handleRequest(req: Request): Promise<Response> {
  console.log(serveSinglePageApp);
  const url = new URL(req.url);

  url.protocol = "https:";
  url.hostname = "us-central-example.cloudfunctions.net";

  return fetch(url.toString(), req);
}

function handleError(err: Error): Response {
  return new Response(JSON.stringify({ error: err.message }), { status: 500 });
}

addEventListener("fetch", function (event) {
  event.respondWith(handleRequest(event.request).catch(handleError));
});

export {};
