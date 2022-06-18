import { jest } from "@jest/globals";
import worker from "./index.js";

test("GET /", async () => {
  const ctx = createContext();
  const env = getMiniflareBindings();
  const req = new Request(`https://${env.APP_HOSTNAME}/`);
  const res = await worker.fetch?.(req, env, ctx);
  const body = await res?.text();

  expect(res.status).toEqual(200);
  expect(/<title>(.*)<\/title>/.test(body)).toEqual(true);
});

function createContext() {
  return {
    passThroughOnException: jest.fn(),
    waitUntil: jest.fn(),
  };
}
