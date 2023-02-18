/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Hono } from "hono";
import { serveStatic } from "hono/serve-static";
import assetManifest from "__STATIC_CONTENT_MANIFEST";

const app = new Hono<Env>();

app.get("/echo", ({ req, json }) => {
  return json({
    headers: Object.fromEntries(req.headers.entries()),
    cf: req.cf,
  });
});

// Rewrite HTTP requests starting with "/api/"
// to the Star Wars API as an example
app.use("/api/*", ({ req }) => {
  const { pathname, search } = new URL(req.url);
  return fetch(`https://swapi.dev${pathname}${search}`, req);
});

app.use("*", serveStatic({ manifest: assetManifest }));

export default app;
