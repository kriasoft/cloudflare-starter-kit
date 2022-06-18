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
  [Rollup](https://rollupjs.org/), [ESLint](https://eslint.org/), [Jest](https://jestjs.io/),
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

`├──`[`.github`](.github) — GitHub configuration including CI/CD workflows<br>
`├──`[`.vscode`](.vscode) — VSCode settings including code snippets, recommended extensions etc.<br>
`├──`[`api`](./api) — Cloudflare Worker script for handling API requests<br>
`├──`[`app`](./app) — Web application front-end powered by [Vite](https://vitejs.dev/) and [React.js](https://reactjs.org/)<br>
`├──`[`env`](./env) — environment variables for the local (dev), test (QA), and production<br>
`├──`[`scripts`](./scripts) — Automation scripts, such as `yarn deploy`<br>
`├──`[`site`](./site) — Cloudflare Worker script for serving a static website<br>
`├──`[`babel.config.cjs`](./babel.config.cjs) — Babel configuration<br>
`├──`[`package.json`](./project.json) — npm dependencies and Yarn scripts<br>
`├──`[`rollup.config.mjs`](./rollup.config.mjs) — code bundling configuration for Rollup<br>
`└──`[`tsconfig.base.json`](./tsconfig.base.json) — TypeScript configuration<br>

## Tech Stack

[Cloudflare Workers](https://workers.cloudflare.com/), [Miniflare](https://miniflare.dev/),
[Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/), [Vite](https://vitejs.dev/),
[TypeScript](https://www.typescriptlang.org/), [Babel](https://babeljs.io/),
[ESLint](https://eslint.org/), [Prettier](https://prettier.io/),
[Jest](https://jestjs.io/), [Yarn](https://yarnpkg.com/),
[Rollup](https://rollupjs.org/).

## Requirements

- [Node.js](https://nodejs.org/) v16 or newer, [Yarn](https://yarnpkg.com/) package manager
- [VS Code](https://code.visualstudio.com/) editor with [recommended extensions](.vscode/extensions.json)

## Getting Started

[Generate a new repository](https://github.com/kriasoft/cloudflare-starter-kit/generate)
from this template, clone, install dependencies, open it in VSCode and start hacking:

```bash
$ git clone https://github.com/kriasoft/cloudflare-starter-kit.git
$ cd ./cloudflare-starter-kit
$ yarn install
$ yarn start
```

Find the worker scripts inside of the [`./site`](./site/) and [`./api`](./api/) folders.

**IMPORTANT**: Ensure that VSCode is using the [workspace version of TypeScript](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-newer-typescript-versions).

## Scripts

- `yarn start` - Launches web application
- `yarn lint` — Validate the code using ESLint
- `yarn tsc` — Validate the code using TypeScript compiler
- `yarn test` — Run unit tests with Jest and Supertest
- `yarn build` — Compiles and bundles worker scripts into the `dist` folder
- `yarn deploy` — Deploys the worker scripts to Cloudflare
- `yarn cf <workspace>` — Wrangler CLI wrapper

## How to Deploy

Ensure that Cloudflare account credentials and all the environment variables
found in the [`./env`](./env) folder are up-to-date. Then push the required
secrets to Cloudflare Workers, for example:

```
$ yarn api:cf secret put GOOGLE_CLOUD_CREDENTIALS [--env #0]
```

Finally, build and deploy the app:

```
$ yarn deploy [--env #0]
```

Where `--env` can be one of the supported environment names:

- **`local`**: http://localhost:3000 (local development and unit testing)
- **`test`**: https://test.example.com (staging/QA)
- **`prod`**: https://example.com (production)

<p align="center"><img src="https://files.tarkus.me/cloudflare-workers-deploy.svg" /></p>

Alternatively, build and deploy CF workers individually:

```
$ yarn api:deploy [--env #0]
$ yarn site:deploy [--env #0]
```

Where `--env #0` is the target deployment environment, e.g. `--env=prod` or `--env=test`.

## How to View Logs

```
$ yarn api:cf tail [--env #0]
$ yarn site:cf tail [--env #0]
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
