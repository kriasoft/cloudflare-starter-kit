/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import react from "@vitejs/plugin-react";
import envars from "envars";
import { defineConfig } from "vite";

// Load environment variables for the target environment
envars.config();

// The list of environment variables required by the app
const defineVars = [
  "APP_HOSTNAME",
  "GOOGLE_CLOUD_PROJECT",
  "FIREBASE_APP_ID",
  "FIREBASE_API_KEY",
  "GA_MEASUREMENT_ID",
];

/**
 * Vite configuration
 * https://vitejs.dev/config/
 */
export default defineConfig({
  cacheDir: `../.cache/vite-${process.env.npm_package_name}`,

  build: {
    outDir: "../dist/app",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          firebase: ["firebase/app", "firebase/auth"],
          react: ["react", "react-dom", "react-router-dom", "recoil"],
        },
      },
    },
  },

  define: Object.fromEntries(
    defineVars.map((key) => [key, JSON.stringify(process.env[key])])
  ),

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
});
