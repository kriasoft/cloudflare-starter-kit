/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Hono } from "hono";
import { getAuthToken } from "web-auth-library/google";

const app = new Hono<Env>();

// An example of communicating with Google Cloud (GCP)
app.get("/api/projects", async ({ env }) => {
  const token = await getAuthToken({
    credentials: env.GOOGLE_CLOUD_CREDENTIALS,
    scope: "https://www.googleapis.com/auth/cloud-platform",
  });

  return fetch("https://cloudresourcemanager.googleapis.com/v1/projects", {
    headers: { authorization: `Bearer ${token.accessToken}` },
  });
});

// An example of forwarding HTTP requests to a 3rd party API
app.get("*", async ({ req }) => {
  const url = new URL(req.url);
  const targetUrl = `https://swapi.dev${url.pathname}${url.search}`;
  const targetReq = new Request(targetUrl, req);
  targetReq.headers.set("Accept", "application/json");
  return await fetch(targetReq);
});

app.onError((err, ctx) => {
  return ctx.json(
    {
      message: (err as Error).message ?? "Application Error",
      stack: ctx.env.APP_ENV === "prod" ? undefined : (err as Error).stack,
    },
    500
  );
});

export default app;
