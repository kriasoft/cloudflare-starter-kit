/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

declare const APP_HOSTNAME: string;
declare const GOOGLE_CLOUD_PROJECT: string;
declare const FIREBASE_APP_ID: string;
declare const FIREBASE_API_KEY: string;
declare const GA_MEASUREMENT_ID: string;

interface Window {
  dataLayer: unknown[];
}
