/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Env, handleError } from "core";

export default {
  fetch: handleError(async (req) => {
    const url = new URL(req.url);

    url.protocol = "https:";
    url.hostname = "swapi.dev";

    return await fetch(url.toString(), req);
  }),
} as ExportedHandler<Env>;
