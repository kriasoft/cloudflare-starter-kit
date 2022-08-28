/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import envars from "envars";
import { Miniflare } from "miniflare";
import * as rollup from "rollup";
import { createServer } from "vite";
import { $, argv, cd, chalk } from "zx";

process.env.TARGET = "api";
const { default: apiConfig } = await import("../rollup.config.mjs");

// Configure the Cloudflare Workers server
const mf = new Miniflare({
  scriptPath: "dist/api/index.js",
  modules: true,
  bindings: envars.config(),
  sourceMap: true,
});

// Launch the API compiler in "watch" mode
const api = await new Promise((resolve, reject) => {
  cd("./api");
  let initialized = false;
  rollup.watch(apiConfig).on("event", (event) => {
    if (event.code === "END") {
      if (initialized) {
        mf.reload();
      } else {
        initialized = true;
        mf.startServer()
          .then(async (server) => {
            await mf.startScheduler();
            cd("..");
            resolve(server);
          })
          .catch(reject);
      }
    } else if (event.code === "ERROR") {
      if (initialized) {
        initialized = true;
        reject(event.error);
      } else {
        console.log(event.error);
      }
    }
  });
});

console.clear();
console.log("");

console.log(
  [
    `${chalk.gray("Application")}: ${chalk.greenBright($.env.APP_NAME)}`,
    `${chalk.gray("environment")}: ${chalk.greenBright($.env.APP_ENV)}`,
  ].join(", ")
);

console.log("");

// Launch the web application (front-end) server
const app = await createServer({
  root: "app",
  base: argv.base,
  logLevel: argv.logLevel ?? argv.l,
  clearScreen: argv.clearScreen,
  optimizeDeps: {
    force: argv.force,
  },
  server: {
    host: argv.host,
    port: argv.port,
    https: argv.https,
    open: argv.open,
    cors: argv.cors,
    strictPort: argv.strictPort,
    proxy: {
      "/api": {
        target: `http://localhost:${api.address().port}`,
        changeOrigin: true,
      },
    },
  },
});

await app.listen();
app.printUrls();

console.log("");
