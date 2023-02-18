/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import react from "@vitejs/plugin-react";
import * as dotenv from "dotenv";
import { defineConfig } from "vite";

// Load environment variables from .env file
dotenv.config({ path: "../.env" });

// Tells Vite which environment variables need to be injected into the app
// https://vitejs.dev/guide/env-and-mode.html#env-variables-and-modes
[
  "APP_HOSTNAME",
  "GOOGLE_CLOUD_PROJECT",
  "FIREBASE_APP_ID",
  "FIREBASE_API_KEY",
  "GA_MEASUREMENT_ID",
].forEach((key) => (process.env[`VITE_${key}`] = process.env[key]));

/**
 * Vite configuration
 * https://vitejs.dev/config/
 */
export default defineConfig({
  cacheDir: `../.cache/vite-app`,

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          firebase: ["firebase/app", "firebase/auth"],
          react: ["react", "react-dom", "react-router-dom", "recoil"],
        },
      },
    },
  },

  plugins: [
    // https://github.com/vitejs/vite/tree/main/packages/plugin-react
    react({
      jsxRuntime: "classic",
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],

  server: {
    proxy: {
      "/api": {
        target: "https://swapi.dev/",
        changeOrigin: true,
      },
    },
  },
});
