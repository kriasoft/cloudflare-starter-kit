/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { handleError } from "core";

export default {
  fetch: handleError((req) => {
    const url = new URL(req.url);

    url.protocol = "https:";
    url.hostname = "welcome.developers.workers.dev";

    return new Response("OK", { status: 200 });

    return fetch(url.toString(), req);
  }),
} as ExportedHandler;
