/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";
import { cors } from "hono/cors";
import assetManifest from "__STATIC_CONTENT_MANIFEST";
import {
  createCustomToken,
  createSessionCookie,
  importKey,
  verifyIdToken,
} from "./auth.js";

const app = new Hono<Env>();

app.get("/echo", ({ json, req }) => {
  return json({
    headers: Object.fromEntries(req.headers.entries()),
    cf: req.raw.cf,
  });
});

// Configure CORS for the `/auth/login` endpoint
app.use(
  "/auth/login",
  cors({
    origin(origin) {
      // TODO: Whitelist your own domains
      return origin.endsWith(".chainfuse.com")
        ? origin
        : "https://chainfuse.com";
    },
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Cookie"],
    maxAge: 600,
    credentials: true,
  })
);

// Authentication endpoint that allows user to sign in and out
// across multiple domains and subdomains.
app.post("/auth/login", async (ctx) => {
  try {
    const cookieName = "cf_session";
    const input = await ctx.req.json<{ idToken?: string | false }>();
    const credentials = ctx.env.GOOGLE_CLOUD_CREDENTIALS;
    const apiKey = ctx.env.FIREBASE_API_KEY;

    if (input.idToken) {
      const key = await importKey(credentials);
      const user = await verifyIdToken(input.idToken, apiKey);
      const token = await createSessionCookie(user, key);

      // Create authentication cookie
      return ctx.json({ user }, 200, {
        "Set-Cookie": `${cookieName}=${token}; Secure; HttpOnly; SameSite=Strict; Path=/;`,
      });
    } else if (input.idToken === false) {
      // Delete authentication cookie
      return ctx.json({}, 200, {
        "Set-Cookie": `${cookieName}=; Secure; HttpOnly; SameSite=Strict; Path=/;`,
      });
    } else {
      const cookie = ctx.req.cookie(cookieName);

      if (cookie) {
        // Create a custom Firebase ID token
        const token = await createCustomToken(cookie, credentials);
        return ctx.json({ token }, 200);
      }

      return ctx.json({}, 200);
    }
  } catch (err) {
    const { message, stack } = err as Error;
    return ctx.json({ message, stack }, 500);
  }
});

// Rewrite HTTP requests starting with "/api/"
// to the Star Wars API as an example
app.use("/api/*", ({ req }) => {
  const { pathname, search } = new URL(req.url);
  return fetch(`https://swapi.dev${pathname}${search}`, req);
});

app.use("*", serveStatic({ manifest: assetManifest }));

export default app;
