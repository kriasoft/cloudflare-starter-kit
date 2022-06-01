/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

export type Env = {
  APP_ENV: "dev" | "test" | "production";
  APP_NAME: string;
  APP_HOSTNAME: string;
  GOOGLE_CLOUD_CREDENTIALS: string;
  __STATIC_CONTENT: Record<string, string>;
};
