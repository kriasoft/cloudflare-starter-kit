# Cloudflare Workers Starter Kit

<a href="http://www.typescriptlang.org/"><img src="https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg?style=flat-square" height="20"></a>
<a href="http://patreon.com/koistya"><img src="https://img.shields.io/badge/dynamic/json?color=%23ff424d&label=Patreon&style=flat-square&query=data.attributes.patron_count&suffix=%20patrons&url=https%3A%2F%2Fwww.patreon.com%2Fapi%2Fcampaigns%2F233228" height="20"></a>
<a href="https://discord.gg/QEd934tZvR"><img src="https://img.shields.io/discord/643523529131950086?label=Chat&style=flat-square" height="20"></a>
<a href="https://github.com/kriasoft/cloudflare-starter-kit/stargazers"><img src="https://img.shields.io/github/stars/kriasoft/cloudflare-starter-kit.svg?style=social&label=Star&maxAge=3600" height="20"></a>
<a href="https://twitter.com/koistya"><img src="https://img.shields.io/twitter/follow/koistya.svg?style=social&label=Follow&maxAge=3600" height="20"></a>

Project template for scaffolding [Cloudflare Workers](https://workers.cloudflare.com/) projects.

## Features

- Supports multiple worker scripts within the same project
- Source code bundling with Babel and Rollup
- Pre-configured with TypeScript, ESLint, Jest, and Prettier
- Pre-commit Git hook(s) using Husky; CI/CD workflow (GitHub Actions)
- Code snippets and other VSCode settings

---

This project was bootstrapped with [Cloudflare Starter Kit](https://github.com/kriasoft/cloudflare-starter-kit).
Be sure to join our [Discord channel](https://discord.gg/QEd934tZvR) for assistance.

## Directory Structure

`├──`[`.github`](.github) — GitHub configuration including CI/CD workflows<br>
`├──`[`.vscode`](.vscode) — VSCode settings including code snippets, recommended extensions etc.<br>
`├──`[`core`](./core) — core modules and utility functions<br>
`├──`[`workers`](./workers) — Cloudflare Worker scripts<br>
`├──`[`package.json`](./project.json) — npm dependencies and Yarn scripts<br>
`├──`[`rollup.config.js`](./rollup.config.js) — code bundling configuration for Rollup<br>
`└──`[`tsconfig.json`](./tsconfig.json) — TypeScript configuration<br>

## Tech Stack

[TypeScript](https://www.typescriptlang.org/), [Babel](https://babeljs.io/),
[ESLint](https://eslint.org/), [Prettier](https://prettier.io/),
[Jest](https://jestjs.io/), [Yarn](https://yarnpkg.com/) v2 with PnP,
[Rollup](https://rollupjs.org/).

## Requirements

- [Node.js](https://nodejs.org/) v14 or newer, [Yarn](https://yarnpkg.com/) package manager
- [VS Code](https://code.visualstudio.com/) editor with [recommended extensions](.vscode/extensions.json)

## Getting Started

- Clone the repo<br />
  `git clone -o seed https://github.com/kriasoft/cloudflare-starter-kit.git`
- Install project dependencies — `yarn install`
- Optionally, configure Husky — `yarn setup`
- Edit Cloudflare Workers script inside of the `workers` folder and run `yarn build`

**IMPORTANT**: Ensure that VSCode is using the workspace versions of TypeScript and ESLint.

![](https://files.tarkus.me/typescript-workspace.png)

## Scripts

- `yarn build` — Compiles and bundles Cloudflare Workers into the `.build` folder
- `yarn lint` — Validate code using ESLint
- `yarn tsc` — Validate code using TypeScript compiler
- `yarn test` — Run unit tests with Jest, Supertest
- `yarn deploy` — Deploys the app to Cloudflare

## How to Deploy

Ensure that Cloudflare account credentials are present in the `.env` file:

```bash
# Cloudflare
# https://dash.cloudflare.com/
# https://developers.cloudflare.com/api/tokens/create
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_ZONE_ID=
CLOUDFLARE_API_TOKEN=
```

Compile and deploy the app by running:

```
$ yarn build
$ yarn deploy [--env #0]
```

Where `--env` argument is the target environment, e.g. `yarn deploy --env=prod`.

## How to Update

- `yarn set version latest` — Bump Yarn to the latest version
- `yarn upgrade-interactive` — Update Node.js modules (dependencies)
- `yarn pnpify --sdk vscode` — Update TypeScript, ESLint, and Prettier settings in VSCode

## Backers 💰

<a href="https://reactstarter.com/b/1"><img src="https://reactstarter.com/b/1.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/2"><img src="https://reactstarter.com/b/2.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/3"><img src="https://reactstarter.com/b/3.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/4"><img src="https://reactstarter.com/b/4.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/5"><img src="https://reactstarter.com/b/5.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/6"><img src="https://reactstarter.com/b/6.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/7"><img src="https://reactstarter.com/b/7.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/8"><img src="https://reactstarter.com/b/8.png" height="60" /></a>

## Related Projects

- [React Starter Kit](https://github.com/kriasoft/react-starter-kit) — front-end template for React, Relay stack
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
