/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

async function handleRequest(req: Request): Promise<Response> {
  const url = new URL(req.url);

  url.protocol = "https:";
  url.hostname = "welcome.developers.workers.dev";

  return fetch(url.toString(), req);
}

function handleError(err: Error): Response {
  return new Response(err.message, { status: 500 });
}

addEventListener("fetch", function (event) {
  event.respondWith(handleRequest(event.request).catch(handleError));
});

export {};
