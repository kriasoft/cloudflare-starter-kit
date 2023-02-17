/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

interface ImportMetaEnv {
  readonly VITE_APP_HOSTNAME: string;
  readonly VITE_GOOGLE_CLOUD_PROJECT: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_GA_MEASUREMENT_ID: string;
}

interface Window {
  dataLayer: unknown[];
}
