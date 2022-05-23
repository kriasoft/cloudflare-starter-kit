# Cloudflare Workers Starter Kit

<a href="http://www.typescriptlang.org/"><img src="https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg?style=flat-square" height="20"></a>
<a href="http://patreon.com/koistya"><img src="https://img.shields.io/badge/dynamic/json?color=%23ff424d&label=Patreon&style=flat-square&query=data.attributes.patron_count&suffix=%20patrons&url=https%3A%2F%2Fwww.patreon.com%2Fapi%2Fcampaigns%2F233228" height="20"></a>
<a href="https://discord.gg/QEd934tZvR"><img src="https://img.shields.io/discord/643523529131950086?label=Chat&style=flat-square" height="20"></a>
<a href="https://github.com/kriasoft/cloudflare-starter-kit/stargazers"><img src="https://img.shields.io/github/stars/kriasoft/cloudflare-starter-kit.svg?style=social&label=Star&maxAge=3600" height="20"></a>
<a href="https://twitter.com/koistya"><img src="https://img.shields.io/twitter/follow/koistya.svg?style=social&label=Follow&maxAge=3600" height="20"></a>

Project template for [scaffolding](https://github.com/kriasoft/cloudflare-starter-kit/generate)
[Cloudflare Workers](https://workers.cloudflare.com/) projects.

## Features

- Supports [multiple CF Workers](https://miniflare.dev/core/mount) within the same (mono)repo
- Source code bundling with [Babel](https://babeljs.io/) and [Rollup](https://rollupjs.org/)
- Pre-configured with [TypeScript](https://typescriptlang.org/), [ESLint](https://eslint.org/), [Jest](https://jestjs.io/), [Prettier](https://prettier.io/), and [Miniflare](https://miniflare.dev/)
- Pre-configured with `local`, `test` (staging/QA), and `prod` (production) environments
- Pre-commit Git hook(s) using Husky; CI/CD workflow (GitHub Actions)
- Code snippets and other VSCode settings

---

This project was bootstrapped with [Cloudflare Starter Kit](https://github.com/kriasoft/cloudflare-starter-kit).
Be sure to join our [Discord channel](https://discord.gg/QEd934tZvR) for assistance.

## Directory Structure

`├──`[`.github`](.github) — GitHub configuration including CI/CD workflows<br>
`├──`[`.vscode`](.vscode) — VSCode settings including code snippets, recommended extensions etc.<br>
`├──`[`api`](./api) — Cloudflare Worker script for handling API requests<br>
`├──`[`core`](./core) — core modules and utility functions<br>
`├──`[`dist`](./dist) — compiled output for deployment<br>
`├──`[`env`](./env) — environment variables for the local (dev), test (QA), and production<br>
`├──`[`scripts`](./scripts) — Automation scripts, such as `yarn deploy`<br>
`├──`[`site`](./site) — Cloudflare Worker script for serving a static website<br>
`├──`[`bindings.d.ts`](./bindings.d.ts) — KV bindings etc.<br>
`├──`[`package.json`](./project.json) — npm dependencies and Yarn scripts<br>
`├──`[`rollup.config.mjs`](./rollup.config.mjs) — code bundling configuration for Rollup<br>
`└──`[`tsconfig.json`](./tsconfig.json) — TypeScript configuration<br>

## Tech Stack

[Cloudflare Workers](https://workers.cloudflare.com/), [Miniflare](https://miniflare.dev/),
[TypeScript](https://www.typescriptlang.org/), [Babel](https://babeljs.io/),
[ESLint](https://eslint.org/), [Prettier](https://prettier.io/),
[Jest](https://jestjs.io/), [Yarn](https://yarnpkg.com/) with PnP,
[Rollup](https://rollupjs.org/).

## Requirements

- [Node.js](https://nodejs.org/) v16 or newer, [Yarn](https://yarnpkg.com/) package manager
- [VS Code](https://code.visualstudio.com/) editor with [recommended extensions](.vscode/extensions.json)

## Getting Started

Just [clone](https://github.com/kriasoft/cloudflare-starter-kit/generate) the
repository, install dependencies, open it in VSCode and start hacking:

```bash
$ git clone https://github.com/kriasoft/cloudflare-starter-kit.git
$ cd ./cloudflare-starter-kit
$ yarn install
```

Find the worker scripts inside of the [`./site`](./site/) and [`./api`](./api/) folders.

**IMPORTANT**: Ensure that VSCode is using the workspace versions of TypeScript and ESLint.

![](https://files.tarkus.me/typescript-workspace.png)

## Scripts

- `yarn lint` — Validate the code using ESLint
- `yarn tsc` — Validate the code using TypeScript compiler
- `yarn test` — Run unit tests with Jest and Supertest
- `yarn build` — Compiles and bundles worker scripts into the `dist` folder
- `yarn deploy` — Deploys the worker scripts to Cloudflare

## How to Deploy

Ensure that Cloudflare account credentials are up-to-date (see [`./env`](./env)
folder). Then compile and deploy the worker scripts by running:

```
$ yarn build
$ yarn deploy [--env #0]
```

Where `--env` can be one of the supported environment names:

- **`local`**: https://dev.example.com (local development and unit testing)
- **`test`**: https://test.example.com (staging/QA)
- **`prod`**: https://example.com (production)

<p align="center"><img src="https://files.tarkus.me/cloudflare-workers-deploy.svg" /></p>

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
