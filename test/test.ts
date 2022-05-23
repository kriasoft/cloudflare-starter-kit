import { pick } from "lodash";
import { Miniflare } from "miniflare";

let mf: Miniflare;

beforeAll(async () => {
  const target = "site";
  mf = new Miniflare({
    scriptPath: `dist/${target}/index.js`,
    buildCommand: `yarn rollup -c --silent --environment TARGET:${target},BABEL_ENV:development`,
  });
});

test("GET /", async () => {
  const res = await mf.dispatchFetch("http://localhost:8787/");
  expect(pick(res, ["status"])).toMatchInlineSnapshot();
});

afterAll(async () => {
  await mf.dispose();
});
