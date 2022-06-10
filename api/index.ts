/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Env, handleError } from "core";
import { getAuthToken } from "web-auth-library/google";

export default {
  fetch: handleError(async (req, env) => {
    const url = new URL(req.url);

    // An example of communicating with Google Cloud (GCP)
    if (url.pathname === "/api/projects") {
      const token = await getAuthToken({
        credentials: env.GOOGLE_CLOUD_CREDENTIALS,
        scope: "https://www.googleapis.com/auth/cloud-platform",
      });

      return fetch("https://cloudresourcemanager.googleapis.com/v1/projects", {
        headers: { authorization: `Bearer ${token.accessToken}` },
      });
    }

    // An example of forwarding HTTP requests to a 3rd party API
    url.protocol = "https:";
    url.hostname = "swapi.dev";
    return await fetch(url.toString(), req);
  }),
} as ExportedHandler<Env>;
