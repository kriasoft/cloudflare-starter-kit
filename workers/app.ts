/* SPDX-FileCopyrightText: 2020-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);

  url.protocol = "https:";
  url.hostname = "welcome.developers.workers.dev";

  return fetch(url.toString(), request);
}

function handleError(err: Error): Response {
  return new Response(err.message, { status: 500 });
}

addEventListener("fetch", function (event) {
  event.respondWith(handleRequest(event.request).catch(handleError));
});

export {};
