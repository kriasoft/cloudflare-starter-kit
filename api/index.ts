/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { getAuthToken } from "web-auth-library/google";

export default {
  async fetch(req, env) {
    try {
      const url = new URL(req.url);

      // An example of communicating with Google Cloud (GCP)
      if (url.pathname === "/api/projects") {
        const token = await getAuthToken({
          credentials: env.GOOGLE_CLOUD_CREDENTIALS,
          scope: "https://www.googleapis.com/auth/cloud-platform",
        });

        return fetch(
          "https://cloudresourcemanager.googleapis.com/v1/projects",
          {
            headers: { authorization: `Bearer ${token.accessToken}` },
          }
        );
      }

      // An example of forwarding HTTP requests to a 3rd party API
      const targetUrl = `https://swapi.dev${url.pathname}${url.search}`;
      const targetReq = new Request(targetUrl, req);
      targetReq.headers.set("Accept", "application/json");
      return await fetch(targetReq);
    } catch (err) {
      return Response.json(
        {
          message: (err as Error).message ?? "Application Error",
          stack: env.APP_ENV === "prod" ? undefined : (err as Error).stack,
        },
        { status: 500 }
      );
    }
  },
} as ExportedHandler<Env>;
