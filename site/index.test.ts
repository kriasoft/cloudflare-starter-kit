import { jest } from "@jest/globals";
import worker from "./index.js";

test("GET /", async () => {
  const ctx = createContext();
  const env = getMiniflareBindings();
  const req = new Request(`https://${env.APP_HOSTNAME}/`);
  const res = await worker.fetch?.(req, env, ctx);

  expect({
    status: res?.status,
    body: await res?.text(),
  }).toMatchInlineSnapshot(`
    Object {
      "body": "<!DOCTYPE html>
    <html class=\\"no-js\\" lang=\\"\\">
      <head>
        <meta charset=\\"utf-8\\" />
        <title>Cloudflare Starter Kit</title>
        <meta name=\\"description\\" content=\\"\\" />
        <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1\\" />
        <link rel=\\"icon\\" href=\\"/favicon.ico\\" sizes=\\"any\\" />
        <link rel=\\"stylesheet\\" href=\\"css/normalize.css\\" />
        <link rel=\\"stylesheet\\" href=\\"css/style.css\\" />
        <meta name=\\"theme-color\\" content=\\"#fafafa\\" />
      </head>

      <body>
        <p>Hello world! This is Cloudflare Workers Starter Kit.</p>
      </body>
    </html>
    ",
      "status": 200,
    }
  `);
});

function createContext() {
  return {
    passThroughOnException: jest.fn(),
    waitUntil: jest.fn(),
  };
}
