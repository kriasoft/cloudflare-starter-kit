# Cloudflare Workers Starter Kit

<a href="http://www.typescriptlang.org/"><img src="https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg?style=flat-square" height="20"></a>
<a href="http://patreon.com/koistya"><img src="https://img.shields.io/badge/dynamic/json?color=%23ff424d&label=Patreon&style=flat-square&query=data.attributes.patron_count&suffix=%20patrons&url=https%3A%2F%2Fwww.patreon.com%2Fapi%2Fcampaigns%2F233228" height="20"></a>
<a href="https://discord.gg/QEd934tZvR"><img src="https://img.shields.io/discord/643523529131950086?label=Chat&style=flat-square" height="20"></a>
<a href="https://github.com/kriasoft/cloudflare-starter-kit/stargazers"><img src="https://img.shields.io/github/stars/kriasoft/cloudflare-starter-kit.svg?style=social&label=Star&maxAge=3600" height="20"></a>
<a href="https://twitter.com/koistya"><img src="https://img.shields.io/twitter/follow/koistya.svg?style=social&label=Follow&maxAge=3600" height="20"></a>

Project template for [scaffolding](https://github.com/kriasoft/cloudflare-starter-kit/generate)
[Cloudflare Workers](https://workers.cloudflare.com/) projects.

## Features

- Supports [multiple CF Workers](https://miniflare.dev/core/mount) within the same (mono)repo; using ES modules syntax
- Pre-configured with [TypeScript](https://typescriptlang.org/), [Babel](https://babeljs.io/),
  [Rollup](https://rollupjs.org/), [ESLint](https://eslint.org/), [Vitest](https://vitest.dev/),
  [Prettier](https://prettier.io/), [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/),
  [Miniflare](https://miniflare.dev/)
- Pre-configured with `local`, `test` (staging/QA), and `prod` (production) environments
- Pre-configured with local testing and debugging; loading environment variables from `*.env` files
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) usage example for integrating with 3rd party services (Google Cloud, etc.)
- Code snippets and other VSCode settings; CI/CD workflows with GitHub Actions

---

This project was bootstrapped with [Cloudflare Starter Kit](https://github.com/kriasoft/cloudflare-starter-kit).
Be sure to join our [Discord channel](https://discord.gg/QEd934tZvR) for assistance.

## Directory Structure

`├──`[`.github/workflows`](./.github/workflows/) — CI/CD workflows powered by [GitHub Actions](https://github.com/features/actions)<br>
`├──`[`.vscode`](.vscode) — [VSCode](https://code.visualstudio.com/) settings including code snippets, recommended extensions etc.<br>
`├──`[`api`](./api) — Cloudflare Worker script for handling API requests<br>
`├──`[`app`](./app) — Web application front-end powered by [Vite](https://vitejs.dev/) and [React.js](https://reactjs.org/)<br>
`├──`[`edge`](./edge) — [Cloudflare Workers](https://workers.cloudflare.com/) script for serving static websites (reverse proxy)<br>
`├──`[`scripts`](./scripts) — Automation scripts, such as `yarn deploy`<br>
`├──`[`package.json`](./project.json) — The list of [NPM](https://www.npmjs.com/) dependencies and [Yarn](https://yarnpkg.com/) workspaces<br>
`└──`[`tsconfig.base.json`](./tsconfig.base.json) — [TypeScript](https://www.typescriptlang.org/) configuration shared across packages/workspaces<br>

## Tech Stack

- [TypeScript](https://www.typescriptlang.org/), [Cloudflare Workers](https://workers.cloudflare.com/),
  [Hono](https://honojs.dev/)
- [Vite](https://vitejs.dev/), [Rollup](https://rollupjs.org/),
  [Miniflare](https://miniflare.dev/), [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/),
  [ESLint](https://eslint.org/), [Prettier](https://prettier.io/),
  [Vitest](https://vitest.dev/), [Yarn](https://yarnpkg.com/) with PnP

## Requirements

- [Node.js](https://nodejs.org/) v18+ with [Corepack](https://nodejs.org/api/corepack.html) (`$ corepack enable`)
- [VS Code](https://code.visualstudio.com/) editor with [recommended extensions](.vscode/extensions.json)

## Getting Started

[Generate a new repository](https://github.com/kriasoft/cloudflare-starter-kit/generate)
from this template, clone, install dependencies, open it in VSCode and start hacking:

```bash
$ git clone https://github.com/kriasoft/cloudflare-starter-kit.git
$ cd ./cloudflare-starter-kit
$ yarn install
$ yarn start
$ yarn test
```

Find the worker scripts inside of the [`./edge`](./edge/) and [`./api`](./api/) folders.

**IMPORTANT**: Ensure that VSCode is using the [workspace version of TypeScript](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-newer-typescript-versions).

## Scripts

- **`yarn start`** - Launches web application on [`http://localhost:5173/`](http://localhost:5173/)
- **`yarn lint`** — Validates the code using [ESLint](https://eslint.org/)
- **`yarn tsc`** — Validates the code using [TypeScript](https://www.typescriptlang.org/) compiler
- **`yarn test`** — Runs unit tests with [Vitest](https://vitest.dev/), [Miniflare](https://miniflare.dev/), and [Supertest](https://github.com/visionmedia/supertest)
- **`yarn build`** — Compiles and bundles worker scripts into the `./dist` folder(s)
- **`yarn deploy`** — Deploys the app to [Cloudflare Workers](https://developers.cloudflare.com/workers/) / [GCF](https://cloud.google.com/functions)

## How to Create a CF Worker

Find below the minimal boilerplate for creating a new CF Worker script using TypeScript with ESM syntax:

#### `example/index.ts` — CF Worker script

```ts
import { Hono } from "hono";

const app = new Hono<Env>();

app.get("/", ({ text }) => {
  return text("Hello world!", 200);
});

export default app;
```

#### `example/index.test.ts` — unit test powered by Miniflare

```ts
import { expect, test } from "vitest";
import app from "./index.js";

test("GET /", async () => {
  const req = new Request(`https://${env.APP_HOSTNAME}/`);
  const res = await app.fetch(req, bindings);
  const body = await res.text();

  expect({ status: res.status, body }).toEqual({
    status: 200,
    body: "Hello world!",
  });
});
```

#### `example/wrangler.toml` — deployment configuration

```toml
name = "example"
main = "index.js"
compatibility_date = "2022-04-18"
account_id = "$CLOUDFLARE_ACCOUNT_ID"
route = "$APP_HOSTNAME/*"

[vars]
APP_ENV = "$APP_ENV"
APP_HOSTNAME = "$APP_HOSTNAME"

[[rules]]
type = "ESModule"
globs = ["**/*.js"]
```

Plus [`package.json`](./edge/package.json), [`tsconfig.json`](./edge/tsconfig.json),
and [`global.d.ts`](./edge/global.d.ts) files configuring TypeScript for the workspace.

Note that `$APP_HOSTNAME` and `$CLOUDFLARE_ACCOUNT_ID` placeholders in the
example above will be automatically replaced with values from [`*.env`](./env/)
files for the target environment during local testing or deployment.

For more sophisticated examples visit [Cloudflare Workers Examples](https://developers.cloudflare.com/workers/examples/) directory.

## How to Deploy

The deployments are handled automatically by [GitHub Actions](https://github.com/features/actions)
(see [`.github/workflows`](.github/workflows/)) whenever a new commit lands onto
one of these branches:

- **`main`** — Deploys the app to [`https://test.example.com`](https://test.example.com/) (test/QA)
- **`release`** — Deploys the app to [`https://example.com`](https://example.com/) (production)

Alternatively, you can deploy the app manually by ensuring the all the
required environment variables found in the [`*.env`](./env/) files are
up-to-date (e.g. `CLOUDFLARE_API_TOKEN`), then running `yarn deploy [--env #0]`,
specifying the target deployment area via `--env` flag, e.g. `--env=test`
(default) or `--env=prod`.

You can also deploy packages (workspaces) individually, for example:

```bash
$ yarn api:deploy --env=prod
$ yarn edge:deploy --env=prod
```

<p align="center"><img src="https://files.tarkus.me/cloudflare-workers-deploy.svg" /></p>

## How to View Logs

```
$ yarn workspace api wrangler tail [--env #0]
$ yarn workspace api wrangler tail [--env #0]
```

## How to Update

- `yarn set version stable` — Bump Yarn to the latest version
- `yarn upgrade-interactive` — Update Node.js modules (dependencies)
- `yarn dlx @yarnpkg/sdks vscode` — Update TypeScript, ESLint, and Prettier settings in VSCode

## Backers 💰

<a href="https://reactstarter.com/b/1"><img src="https://reactstarter.com/b/1.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/2"><img src="https://reactstarter.com/b/2.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/3"><img src="https://reactstarter.com/b/3.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/4"><img src="https://reactstarter.com/b/4.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/5"><img src="https://reactstarter.com/b/5.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/6"><img src="https://reactstarter.com/b/6.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/7"><img src="https://reactstarter.com/b/7.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/8"><img src="https://reactstarter.com/b/8.png" height="60" /></a>

## Related Projects

- [React Starter Kit](https://github.com/kriasoft/react-starter-kit) — front-end template for React and Relay using Jamstack architecture
- [Node.js API Starter Kit](https://github.com/kriasoft/node-starter-kit) — project template, pre-configured with Node.js, GraphQL, and PostgreSQL
- [GraphQL API and Relay Starter Kit](https://github.com/kriasoft/graphql-starter) — monorepo template, pre-configured with GraphQL API, React, and Relay

## How to Contribute

Anyone and everyone is welcome to [contribute](.github/CONTRIBUTING.md). Start
by checking out the list of [open issues](https://github.com/kriasoft/cloudflare-starter-kit/issues)
marked [help wanted](https://github.com/kriasoft/cloudflare-starter-kit/issues?q=label:"help+wanted").
However, if you decide to get involved, please take a moment to review the
[guidelines](.github/CONTRIBUTING.md).

## License

Copyright © 2020-present Kriasoft. This source code is licensed under the MIT license found in the
[LICENSE](https://github.com/kriasoft/cloudflare-starter-kit/blob/main/LICENSE) file.

---

<sup>Made with ♥ by Konstantin Tarkus ([@koistya](https://twitter.com/koistya), [blog](https://medium.com/@koistya))
and [contributors](https://github.com/kriasoft/cloudflare-starter-kit/graphs/contributors).</sup>
